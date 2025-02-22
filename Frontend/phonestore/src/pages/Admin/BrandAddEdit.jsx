import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const addBrandApiUrl = "https://localhost:44390/api/PhoneDetail/Phone_BrandInsert";
const updateBrandApiUrl = "https://localhost:44390/api/PhoneDetail/UpdateBrand/";

const BrandAddEdit = () => {
    const { Phone_BrandID } = useParams(); // Get Phone_BrandID from URL (if editing)
    const navigate = useNavigate();
    
    const [brandName, setBrandName] = useState("");

    useEffect(() => {
        if (Phone_BrandID) {
            // Fetch brand details if editing
            console.log("Fetching brand details for ID:", Phone_BrandID);  // Debugging line
            fetch(`https://localhost:44390/api/PhoneDetail/GetByBrandID/${Phone_BrandID}`)
                .then((res) => res.json())
                .then((data) => {
                    console.log("Fetched brand data:", data);  // Debugging line
                    if (data && data.length > 0) {
                        // Access the first element of the array to get the phone_BrandName
                        setBrandName(data[0].phone_BrandName);  // Correct field name (phone_BrandName)
                    } else {
                        toast.error("Brand not found!");
                        console.log("Response data:", data); // Log full response if no brand found
                    }
                })
                .catch((error) => {
                    console.error("Error fetching brand details:", error);
                    toast.error("An error occurred while fetching the brand details.");
                });
        }
    }, [Phone_BrandID]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requestBody = Phone_BrandID
            ? { Phone_BrandID, phone_BrandName: brandName }  // Use correct field name here
            : { phone_BrandName: brandName }; // Ensure consistency with API

        const requestOptions = {
            method: Phone_BrandID ? "PUT" : "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        };

        const apiUrl = Phone_BrandID ? `${updateBrandApiUrl}${Phone_BrandID}` : addBrandApiUrl;

        try {
            const response = await fetch(apiUrl, requestOptions);
            if (response.ok) {
                toast.success(Phone_BrandID ? "Brand updated successfully!" : "Brand added successfully!");
                setTimeout(() => navigate("/admin/brand"), 500);
            } else {
                toast.error("Failed to save brand");
            }
        } catch (error) {
            console.error("Error saving brand:", error);
            toast.error("An error occurred while saving the brand");
        }
    };

    return (
        <div className="user-page">
            <ToastContainer />
            <Link className="btn btn-dark" to="/admin/brand">back</Link>
            <h2 className="text-center text-primary">{Phone_BrandID ? "Edit Brand" : "Add Brand"}</h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Brand Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={brandName}
                        onChange={(e) => setBrandName(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    {Phone_BrandID ? "Update" : "Add"} Brand
                </button>
            </form>
        </div>
    );
};

export default BrandAddEdit;
