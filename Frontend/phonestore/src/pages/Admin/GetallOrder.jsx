import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import "./css/User.css";

const apiUrl = "https://localhost:44390/api/Bill/GetAllBill";
const updateStatusUrl = "https://localhost:44390/api/Bill/BillStatus/BillStatus";

const GetallOrder = () => {
    const [logedInUser] = useState(JSON.parse(localStorage.getItem('userData')));
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(apiUrl, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then((res) => res.json())
        .then((res) => setData(res));
    }, []);

    const handleStatusChange = (billId, newStatus) => {
        if (window.confirm("Are you sure you want to update the status?")) {
            fetch(`${updateStatusUrl}?BillID=${billId}&Status=${newStatus}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then((res) => {
                if (res.ok) {
                    setData(prevData => prevData.map(item => 
                        item.billID === billId ? { ...item, orderStatus: newStatus } : item
                    ));
                }
            });
        }
    };

    if (!logedInUser.isAdmin) {
        return <Navigate to="/" />;
    }

    return (
        <div className="user-page">
            <Link className="btn btn-dark" to="/admin">Back</Link>
            <h1>Order List</h1>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Phone Name</th>
                        <th>Phone Storage</th>
                        <th>Address</th>
                        <th>Payment</th>
                        <th>Order Status</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.billID}>
                            <td>{item.userName}</td>
                            <td>{item.phoneName}</td>
                            <td>{item.phone_Storage}</td>
                            <td>{item.address}</td>
                            <td>{item.payment}</td>
                            <td>
                                <select 
                                    value={item.orderStatus} 
                                    onChange={(e) => handleStatusChange(item.billID, e.target.value)}
                                    style={{
                                        backgroundColor: item.orderStatus === "pending" ? "yellow" : "green",
                                        color: "Black"                                        
                                    }}
                                >
                                    <option value="pending">Pending</option>
                                    <option value="success">Success</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GetallOrder;
