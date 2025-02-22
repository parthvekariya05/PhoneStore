import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { FaTrash } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import "./css/User.css";

const apiUrl = "https://localhost:44390/api/User/GetAllUser";
const deleteApiUrl = "https://localhost:44390/api/User/DeleteUser/";
const updateAdminApiUrl = "https://localhost:44390/api/User/AdminUpdate/AdminUpdate";

const GetallUser = () => {
    const [logedInUser] = useState(JSON.parse(localStorage.getItem('userData')));
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(apiUrl, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then((res) => res.json())
        .then((res) => setData(res))
        .catch((error) => console.error("Error fetching users:", error));
    }, []);

    const handleDelete = (userId) => {
        if (logedInUser?.userID === userId) {
            toast.error("You cannot delete your own profile!");
            return;
        }

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
        });
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
            <Link className="btn btn-dark" to="/admin">Back</Link>
            <h1>User List</h1>
            <table>
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
                        <tr key={item.userID}>
                            <td>{item.userName}</td>
                            <td>{item.password}</td>
                            <td>{item.emailAddress}</td> 
                            <td>
                                <select 
                                    value={item.isAdmin} 
                                    onChange={(e) => handleAdminChange(item.userID, e.target.value === 'true')}
                                >
                                    <option value="false">User</option>
                                    <option value="true">Admin</option>
                                </select>
                            </td>
                            <td>
                                <button className="btn btn-danger" onClick={() => handleDelete(item.userID)}>
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GetallUser;
