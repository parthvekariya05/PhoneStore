import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import "../pages/Admin/css/User.css";

const Billhistory = () => {
    const [logedInUser] = useState(JSON.parse(localStorage.getItem('userData')));
    const [data, setData] = useState([]);    
    useEffect(() => {
        if (!logedInUser) return;
        
        fetch(`https://localhost:44390/api/Bill/SelectByUserID/${logedInUser.userID}`, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then((res) => res.json())
        .then((res) => setData(res))
        .catch((error) => console.error("Error fetching order history:", error));
    }, [logedInUser]);
    
    if (!logedInUser) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="user-page">
            <Link className="btn btn-dark" to="/getmobile">Back</Link>
            <h1>Order History</h1>
            <table>
                <thead>
                    <tr>
                        <th>Phone Name</th>
                        <th>Phone Storage</th>
                        <th>Address</th>
                        <th>Payment</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((item, index) => (
                            <tr key={index}>
                                <td>{item.phoneName}</td>
                                <td>{item.phone_Storage}</td>
                                <td>{item.address}</td>
                                <td>{item.payment}</td>
                                <td className={item.status === "success" ? "text-success" : "text-warning"}>{item.status}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No orders found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Billhistory;
