import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FaTrash, FaUsers, FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import "./css/User.css";

const apiUrl = "https://localhost:44390/api/User/GetAllUser";
const deleteApiUrl = "https://localhost:44390/api/User/DeleteUser/";
const updateAdminApiUrl = "https://localhost:44390/api/User/AdminUpdate/AdminUpdate";

const GetallUser = () => {
    const [logedInUser] = useState(JSON.parse(localStorage.getItem('userData')));
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visiblePasswords, setVisiblePasswords] = useState({});
    const [deletingId, setDeletingId] = useState(null);

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
        .catch((error) => {
            console.error("Error fetching users:", error);
            setLoading(false);
        });
    }, []);

    const togglePassword = (userId) => {
        setVisiblePasswords((prev) => ({ ...prev, [userId]: !prev[userId] }));
    };

    const handleDelete = (userId, userName) => {
        if (logedInUser?.userID === userId) {
            toast.error("You cannot delete your own profile!");
            return;
        }

        if (!window.confirm(`Delete user "${userName}"? This cannot be undone.`)) return;

        setDeletingId(userId);
        fetch(deleteApiUrl + userId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then((res) => {
            if (res.ok) {
                setData(data.filter(user => user.userID !== userId));
                toast.success("User deleted successfully!");
            } else {
                toast.error("Failed to delete user");
            }
        })
        .catch((error) => {
            console.error("Error deleting user:", error);
            toast.error("An error occurred while deleting user");
        })
        .finally(() => setDeletingId(null));
    };

    const handleAdminChange = (userId, isAdmin) => {
        fetch(`${updateAdminApiUrl}?UserID=${userId}&IsAdmin=${isAdmin}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then((res) => {
            if (res.ok) {
                toast.success("Admin status updated successfully!");
                setData(data.map(user =>
                    user.userID === userId ? { ...user, isAdmin } : user
                ));
            } else {
                toast.error("Failed to update admin status");
            }
        })
        .catch((error) => {
            console.error("Error updating admin status:", error);
            toast.error("An error occurred while updating admin status");
        });
    };

    if (!logedInUser?.isAdmin) {
        return <Navigate to="/" />;
    }

    return (
        <div className="user-page">
            <ToastContainer />
            <div className="user-list-header d-flex justify-content-between align-items-center mb-3">
                <Link className="btn user-back-btn" to="/admin">
                    <FaArrowLeft /> Back
                </Link>
                <h1 className="user-list-title">
                    <FaUsers className="user-list-title-icon" /> User List
                </h1>
                <div style={{ width: "90px" }}></div>
            </div>

            <div className="user-list-card">
                {loading ? (
                    <div className="user-list-empty">Loading users...</div>
                ) : data.length === 0 ? (
                    <div className="user-list-empty">No users found.</div>
                ) : (
                    <div className="user-list-scroll">
                        <table className="user-list-table">
                            <thead>
                                <tr>
                                    <th>Username</th>
                                    <th>Password</th>
                                    <th>Email Address</th>
                                    <th>Admin Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item) => (
                                    <tr key={item.userID} className="user-list-row">
                                        <td className="user-name-cell">{item.userName}</td>
                                        <td>
                                            <div className="user-password-cell">
                                                <span>{visiblePasswords[item.userID] ? item.password : "••••••••"}</span>
                                                <button
                                                    type="button"
                                                    className="user-password-toggle"
                                                    onClick={() => togglePassword(item.userID)}
                                                    aria-label="Toggle password visibility"
                                                >
                                                    {visiblePasswords[item.userID] ? <FaEyeSlash /> : <FaEye />}
                                                </button>
                                            </div>
                                        </td>
                                        <td>{item.emailAddress}</td>
                                        <td>
                                            <select
                                                value={item.isAdmin}
                                                onChange={(e) => handleAdminChange(item.userID, e.target.value === 'true')}
                                                className={`user-role-select ${item.isAdmin === true || item.isAdmin === "true" ? "admin" : "user"}`}
                                            >
                                                <option value="false">User</option>
                                                <option value="true">Admin</option>
                                            </select>
                                        </td>
                                        <td>
                                            <button
                                                className="user-delete-btn"
                                                onClick={() => handleDelete(item.userID, item.userName)}
                                                disabled={deletingId === item.userID || logedInUser?.userID === item.userID}
                                                title={logedInUser?.userID === item.userID ? "You cannot delete your own profile" : "Delete user"}
                                            >
                                                <FaTrash /> {deletingId === item.userID ? "Deleting..." : ""}
                                            </button>
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

export default GetallUser;