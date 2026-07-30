import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { FaArrowLeft, FaClipboardList } from "react-icons/fa";
import "./css/User.css";

const apiUrl = "https://localhost:44390/api/Bill/GetAllBill";
const updateStatusUrl = "https://localhost:44390/api/Bill/BillStatus/BillStatus";

const GetallOrder = () => {
    const [logedInUser] = useState(JSON.parse(localStorage.getItem('userData')));
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState(null);

    useEffect(() => {
        fetch(apiUrl, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then((res) => res.json())
        .then((res) => {
            setData(res);
            setLoading(false);
        })
        .catch(() => setLoading(false));
    }, []);

    const handleStatusChange = (billId, newStatus) => {
        if (window.confirm("Are you sure you want to update the status?")) {
            setUpdatingId(billId);
            fetch(`${updateStatusUrl}?BillID=${billId}&Status=${newStatus}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then((res) => {
                if (res.ok) {
                    setData(prevData => prevData.map(item =>
                        item.billID === billId ? { ...item, status: newStatus } : item
                    ));
                }
            })
            .finally(() => setUpdatingId(null));
        }
    };

    if (!logedInUser.isAdmin) {
        return <Navigate to="/" />;
    }

    return (
        <div className="user-page order-page">
            <div className="order-header d-flex justify-content-between align-items-center mb-3">
                <Link className="btn btn-dark order-back-btn" to="/admin">
                    <FaArrowLeft /> Back
                </Link>
                <h1 className="order-title">
                    <FaClipboardList className="order-title-icon" /> Order List
                </h1>
                <div style={{ width: "90px" }}></div>
            </div>

            <div className="order-card">
                {loading ? (
                    <div className="order-empty">Loading orders...</div>
                ) : data.length === 0 ? (
                    <div className="order-empty">No orders found yet.</div>
                ) : (
                    <div className="order-table-scroll">
                        <table className="order-table">
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
                                    <tr key={item.billID} className="order-row">
                                        <td className="order-username-cell">{item.userName}</td>
                                        <td>{item.phoneName}</td>
                                        <td>{item.phone_Storage}</td>
                                        <td className="order-address-cell" title={item.address}>{item.address}</td>
                                        <td>
                                            <span className={`order-payment-badge ${item.payment?.toLowerCase() === "cash" ? "cash" : "upi"}`}>
                                                {item.payment}
                                            </span>
                                        </td>
                                        <td>
                                            <select
                                                value={item.status?.toLowerCase()}
                                                onChange={(e) => handleStatusChange(item.billID, e.target.value)}
                                                disabled={updatingId === item.billID}
                                                className={`order-status-select ${item.status?.toLowerCase() === "success" ? "success" : "pending"}`}
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
                )}
            </div>
        </div>
    );
};

export default GetallOrder;