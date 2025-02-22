import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../store/auth';
import "./css/Address.css";

const Address = () => {
    const { isLoggedIn, authorizationToken } = useAuth();
    const navigate = useNavigate();

    const [logedInUser] = useState(JSON.parse(localStorage.getItem('userData')));

    const [formData, setFormData] = useState({
        UserId: logedInUser.userID,
        Address: "",
        Country: "",
        State: "",
        City: "",
        Pincode: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();    

        const response = await fetch("https://localhost:44390/api/Address/Insertaddress", {
            body: JSON.stringify(formData),
            headers: { "Content-Type": "application/json", Authorization: authorizationToken },
            method: "POST",
        });

        const responseData = await response.json();

        if (response.ok) {
            toast.success(responseData.message || "Address submitted successfully");            
            localStorage.setItem("phoneAddress", JSON.stringify(formData));
            navigate("/bill"); // Navigate to Bill Page
        } else {
            toast.error(
                responseData.extraDetails ? responseData.extraDetails[0] : responseData.message
            );
        }
    };

    if (!isLoggedIn) {
        return <Navigate to="/" />;
    }

    return (
        <div className="address-container">
            <h1 className="address-title">Delivery Address</h1>
            <form onSubmit={handleSubmit} className="address-form">
                <div className="address-row">
                    <label><strong>Address</strong></label>
                    <input type="text" id="address" name="Address" onChange={handleChange} value={formData.Address} className="address-input" placeholder="Enter address" required />
                </div>

                <div className="address-row-double">
                    <div className="address-row">
                        <label><strong>Country</strong></label>
                        <input type="text" id="country" name="Country" onChange={handleChange} value={formData.Country} className="address-input" placeholder="Enter Country" required />
                    </div>

                    <div className="address-row">
                        <label><strong>State</strong></label>
                        <input type="text" id="state" name="State" onChange={handleChange} value={formData.State} className="address-input" placeholder="Enter State" required />
                    </div>
                </div>

                <div className="address-row-double">
                    <div className="address-row">
                        <label><strong>City</strong></label>
                        <input type="text" id="city" name="City" onChange={handleChange} value={formData.City} className="address-input" placeholder="Enter City" required />
                    </div>

                    <div className="address-row">
                        <label><strong>Pincode</strong></label>
                        <input type="text" id="pincode" name="Pincode" onChange={handleChange} value={formData.Pincode} className="address-input" placeholder="Enter Pincode" required />
                    </div>
                </div>

                <button type="submit" className="address-button">Submit</button>
            </form>
        </div>
    );
};

export default Address;
