import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FaTrash, FaPen, FaPlus } from 'react-icons/fa';
import "react-toastify/dist/ReactToastify.css";
import "./css/User.css";

const apiUrl = "https://localhost:44390/api/PhoneDetail/Phone_BrandDropDownModel";
const deleteApiUrl = "https://localhost:44390/api/PhoneDetail/DeleteBrand/";

const Brand = () => {
    const [logedInUser] = useState(JSON.parse(localStorage.getItem("userData")));
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(apiUrl, {
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((res) => setData(res))
            .catch((error) => console.error("Error fetching brands:", error));
    }, []);

    const handleDelete = (phone_BrandID) => {
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
            });
    };

    if (!logedInUser?.isAdmin) {
        return <Navigate to="/" />;
    }

    return (
        <div className="user-page">
            <ToastContainer />
            <div className="d-flex justify-content-between align-items-center mb-3">
                <Link className="btn btn-dark" to="/admin">Back</Link>
                <h1>Brand List</h1>
                <Link className="btn btn-success" to="/admin/add-brand">
                    <FaPlus /> Add Brand
                </Link>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Brand Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        
                        <tr key={item.phone_BrandID}>
                            <td className="col-6 ps-3 fw-bold">{item.phone_BrandName}</td>
                            <td className="col-6 ">
                                <div className="row ps-3">
                                    <Link to={"/admin/edit-brand/" + item.phone_BrandID} className="btn btn-warning w-25">
                                        <FaPen /> Edit Brand
                                    </Link>
                                    
                                    <button
                                        className="btn btn-danger w-25 ms-3"
                                        onClick={() => handleDelete(item.phone_BrandID)}
                                    >
                                        <FaTrash /> Delete Brand
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Brand;
