import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import "./css/BillHistory.css";

const BillHistory = () => {
    const [logedInUser] = useState(JSON.parse(localStorage.getItem("userData")));
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!logedInUser) return;
        fetch(`https://localhost:44390/api/Bill/SelectByUserID/${logedInUser.userID}`, {
            headers: { "Content-Type": "application/json" },
        })
            .then((res) => res.json())
            .then((res) => { setData(res); setLoading(false); })
            .catch((err) => { setError(err.message); setLoading(false); });
    }, [logedInUser]);

    if (!logedInUser) return <Navigate to="/login" />;

    return (
        <div className="bh-wrapper">
            <div className="bh-topbar">
                <Link to="/getmobile" className="bh-back-btn">← Back</Link>
            </div>

            <div className="bh-header">
                <h1 className="bh-title">Order History</h1>
                <p className="bh-subtitle">{data.length} order{data.length !== 1 ? "s" : ""} placed</p>
            </div>

            {error && <div className="bh-error">⚠️ {error}</div>}

            <div className="bh-card">
                {loading ? (
                    <div className="bh-loading">
                        {[1, 2, 3].map((i) => (
                            <div className="bh-sk-row" key={i}>
                                <div className="bh-sk-cell" style={{ width: "20%" }}></div>
                                <div className="bh-sk-cell" style={{ width: "15%" }}></div>
                                <div className="bh-sk-cell" style={{ width: "30%" }}></div>
                                <div className="bh-sk-cell" style={{ width: "15%" }}></div>
                                <div className="bh-sk-cell" style={{ width: "10%" }}></div>
                            </div>
                        ))}
                    </div>
                ) : data.length === 0 ? (
                    <div className="bh-empty">
                        <div className="bh-empty-icon">📦</div>
                        <p>No orders found</p>
                    </div>
                ) : (
                    <table className="bh-table">
                        <thead>
                            <tr >
                                <th>Phone name</th>
                                <th>Storage</th>
                                <th>Address</th>
                                <th>Payment</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.phoneName}</td>
                                    <td>{item.phone_Storage}</td>
                                    <td className="bh-address">{item.address}</td>
                                    <td>{item.payment}</td>
                                    <td>
                                        <span className={`bh-badge ${item.status === "success" ? "bh-badge-success" : "bh-badge-pending"}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default BillHistory;