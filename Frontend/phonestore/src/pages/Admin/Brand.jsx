import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FaTrash, FaPen, FaPlus, FaMobileAlt } from 'react-icons/fa';
import "react-toastify/dist/ReactToastify.css";
import "./css/User.css";

const apiUrl = "https://localhost:44390/api/PhoneDetail/Phone_BrandDropDownModel";
const deleteApiUrl = "https://localhost:44390/api/PhoneDetail/DeleteBrand/";

const Brand = () => {
    const [logedInUser] = useState(JSON.parse(localStorage.getItem("userData")));
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState(null);

    useEffect(() => {
        fetch(apiUrl, {
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((res) => {
                setData(res);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching brands:", error);
                setLoading(false);
            });
    }, []);

    const handleDelete = (phone_BrandID, phone_BrandName) => {
        if (!window.confirm(`Delete "${phone_BrandName}"? This cannot be undone.`)) return;

        setDeletingId(phone_BrandID);
        fetch(deleteApiUrl + phone_BrandID, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                if (res.ok) {
                    setData(data.filter((brand) => brand.phone_BrandID !== phone_BrandID));
                    toast.success("Brand deleted successfully!");
                } else {
                    toast.error("Failed to delete brand");
                }
            })
            .catch((error) => {
                console.error("Error deleting brand:", error);
                toast.error("An error occurred while deleting the brand");
            })
            .finally(() => setDeletingId(null));
    };

    if (!logedInUser?.isAdmin) {
        return <Navigate to="/" />;
    }

    return (
        <div className="user-page brand-page">
            <ToastContainer />
            <div className="brand-header d-flex justify-content-between align-items-center mb-3">
                <Link className="btn btn-dark brand-back-btn" to="/admin">Back</Link>
                <h1 className="brand-title">
                    <FaMobileAlt className="brand-title-icon" /> Brand List
                </h1>
                <Link className="btn brand-add-btn" to="/admin/add-brand">
                    <FaPlus /> Add Brand
                </Link>
            </div>

            <div className="brand-card">
                {loading ? (
                    <div className="brand-empty">Loading brands...</div>
                ) : data.length === 0 ? (
                    <div className="brand-empty">No brands found. Add your first brand to get started.</div>
                ) : (
                    <table className="brand-table">
                        <thead>
                            <tr>
                                <th>Brand Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <tr key={item.phone_BrandID} className="brand-row">
                                    <td className="brand-name-cell">{item.phone_BrandName}</td>
                                    <td className="brand-action-cell">
                                        <Link
                                            to={"/admin/edit-brand/" + item.phone_BrandID}
                                            className="btn brand-edit-btn"
                                        >
                                            <FaPen /> Edit Brand
                                        </Link>
                                        <button
                                            className="btn brand-delete-btn"
                                            onClick={() => handleDelete(item.phone_BrandID, item.phone_BrandName)}
                                            disabled={deletingId === item.phone_BrandID}
                                        >
                                            <FaTrash /> {deletingId === item.phone_BrandID ? "Deleting..." : "Delete Brand"}
                                        </button>
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

export default Brand;