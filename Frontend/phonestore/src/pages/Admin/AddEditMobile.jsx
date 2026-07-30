import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams, Link } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";
import { FaArrowLeft, FaMobileAlt, FaImage, FaTag, FaRupeeSign, FaHdd, FaSave, FaUndo } from "react-icons/fa";
import "./css/AddEditMobile.css";

const apiUrl = "https://localhost:44390/api/";

const AddEditMobile = () => {
    const [logedInUser] = useState(JSON.parse(localStorage.getItem('userData')));

    const { pid } = useParams();
    const { isLoggedIn, authorizationToken } = useAuth();
    const navigate = useNavigate();

    const [brand, setBrand] = useState([]);
    const [storage, setStorage] = useState([]);
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        PhoneId: 0,
        PhoneName: "",
        Price: 0,
        PhoneImage: "",
        Phone_BrandID: 0,
        Phone_StorageID: 0,
    });

    const [touched, setTouched] = useState({
        PhoneName: false,
        Price: false,
        PhoneImage: false,
        Phone_BrandID: false,
        Phone_StorageID: false,
    });

    const [errors, setErrors] = useState({
        PhoneName: "",
        Price: "",
        PhoneImage: "",
        Phone_BrandID: "",
        Phone_StorageID: "",
    });

    const validateField = (name, value) => {
        switch (name) {
            case "PhoneName":
                return value ? "" : "Phone name is required.";
            case "Price":
                return value ? "" : "Valid price is required.";
            case "PhoneImage":
                return value ? "" : "Phone image is required.";
            case "Phone_BrandID":
                return value ? "" : "Phone brand is required.";
            case "Phone_StorageID":
                return value ? "" : "Phone storage is required.";
            default:
                return "";
        }
    };

    useEffect(() => {
        console.log("PhoneId from useParams:", pid); // Debugging

        if (pid) {
            fetch(apiUrl + "PhoneDetail/GetByPhoneId/" + pid, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            })
                .then((res) => res.json())
                .then((res) => {
                    setFormData({
                        PhoneId: res[0].phoneID,
                        PhoneName: res[0].phoneName,
                        Price: res[0].price,
                        PhoneImage: res[0].phoneImage,
                        Phone_BrandID: res[0].phone_BrandID,
                        Phone_StorageID: res[0].phone_StorageID,
                    });
                });
        }

        // Fetch brand dropdown data
        fetch(apiUrl + "PhoneDetail/Phone_BrandDropDownModel", {
            method: "GET",
            headers: {
                Authorization: authorizationToken,
            },
        })
            .then((response) => response.json())
            .then((data) => setBrand(data));

        // Fetch storage dropdown data
        fetch(apiUrl + "PhoneDetail/Phone_StorageDropDownModel", {
            method: "GET",
            headers: {
                Authorization: authorizationToken,
            },
        })
            .then((response) => response.json())
            .then((data) => setStorage(data))
    }, [pid]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        if (touched[name]) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: validateField(name, value),
            }));
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched((prevTouched) => ({
            ...prevTouched,
            [name]: true,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: validateField(name, value),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const allTouched = Object.fromEntries(
            Object.keys(touched).map((key) => [key, true])
        );
        setTouched(allTouched);

        const newErrors = Object.fromEntries(
            Object.entries(formData).map(([key, value]) => [
                key,
                validateField(key, value),
            ])
        );
        setErrors(newErrors);

        if (Object.values(newErrors).every((error) => error === "")) {
            setSubmitting(true);
            if (pid) {
                console.log("Updating Mobile with ID:", pid);
                console.log("Payload:", formData); // Debugging

                const response = await fetch(apiUrl + "PhoneDetail/UpdatePhone/" + pid, {
                    body: JSON.stringify(formData),
                    headers: { "Content-Type": "application/json", Authorization: authorizationToken, },
                    method: "PUT",
                });

                const responseData = await response.json();

                if (response.ok) {
                    toast.warning(responseData.message)
                    navigate("/admin/getallmobile")
                }
                setSubmitting(false);
            } else {
                const { PhoneId, ...rest } = formData;
                console.log(rest)
                const response = await fetch(apiUrl + "PhoneDetail/InsertPhone", {
                    body: JSON.stringify(rest),
                    headers: { "Content-Type": "application/json", Authorization: authorizationToken, },
                    method: "POST",
                });

                const responseData = await response.json();

                if (response.ok) {
                    toast.success(responseData.message)
                    navigate("/admin/getallmobile")
                }
                setSubmitting(false);
            }
        }
    };


    const handleReset = () => {
        setFormData({
            PhoneId: "",
            PhoneName: "",
            Price: "",
            PhoneImage: "",
            Phone_BrandID: "",
            Phone_StorageID: "",
        });
        setTouched({
            PhoneName: false,
            Price: false,
            PhoneImage: false,
            Phone_BrandID: false,
            Phone_StorageID: false,
        });
        setErrors({
            PhoneName: "",
            Price: "",
            PhoneImage: "",
            Phone_BrandID: "",
            Phone_StorageID: "",
        });
    };

    if (!logedInUser.isAdmin) {
        return <Navigate to="/" />
    }
    else {

        return (
            <div className="phone-form-page">
                <div className="phone-form-wrapper">
                    <Link className="btn phone-back-btn" to="/admin">
                        <FaArrowLeft /> Back
                    </Link>

                    <div className="phone-form-card">
                        <div className="phone-form-header">
                            <FaMobileAlt className="phone-form-header-icon" />
                            <h4>{pid > 0 ? "Edit" : "Add"} Phone</h4>
                        </div>

                        <div className="phone-form-body">
                            <form onSubmit={handleSubmit}>

                                {/* Image + preview */}
                                <div className="phone-form-group">
                                    <label htmlFor="PhoneImage" className="phone-form-label">
                                        <FaImage className="phone-form-label-icon" /> Phone Image URL
                                    </label>
                                    <div className="phone-image-row">
                                        <input
                                            type="text"
                                            id="PhoneImage"
                                            name="PhoneImage"
                                            value={formData.PhoneImage}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={`phone-form-control ${errors.PhoneImage ? "is-invalid" : ""}`}
                                            placeholder="Enter Phone Image URL"
                                            required
                                        />
                                        {formData.PhoneImage && (
                                            <img
                                                src={formData.PhoneImage}
                                                alt="Preview"
                                                className="phone-image-preview"
                                                onError={(e) => { e.target.style.display = "none"; }}
                                                onLoad={(e) => { e.target.style.display = "block"; }}
                                            />
                                        )}
                                    </div>
                                    {errors.PhoneImage && (
                                        <div className="phone-invalid-feedback">{errors.PhoneImage}</div>
                                    )}
                                </div>

                                {/* Phone Name */}
                                <div className="phone-form-group">
                                    <label htmlFor="PhoneName" className="phone-form-label">
                                        <FaTag className="phone-form-label-icon" /> Phone Name
                                    </label>
                                    <input
                                        type="text"
                                        id="PhoneName"
                                        name="PhoneName"
                                        value={formData.PhoneName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={`phone-form-control ${errors.PhoneName ? "is-invalid" : ""}`}
                                        placeholder="Enter Phone Name"
                                        required
                                    />
                                    {errors.PhoneName && (
                                        <div className="phone-invalid-feedback">{errors.PhoneName}</div>
                                    )}
                                </div>

                                {/* Price + row layout for shorter fields */}
                                <div className="phone-form-row">
                                    <div className="phone-form-group">
                                        <label htmlFor="Price" className="phone-form-label">
                                            <FaRupeeSign className="phone-form-label-icon" /> Phone Price
                                        </label>
                                        <input
                                            type="text"
                                            id="Price"
                                            name="Price"
                                            value={formData.Price}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={`phone-form-control ${errors.Price ? "is-invalid" : ""}`}
                                            placeholder="Enter Phone Price"
                                            required
                                        />
                                        {errors.Price && <div className="phone-invalid-feedback">{errors.Price}</div>}
                                    </div>

                                    <div className="phone-form-group">
                                        <label htmlFor="Phone_StorageID" className="phone-form-label">
                                            <FaHdd className="phone-form-label-icon" /> Phone Storage
                                        </label>
                                        <select
                                            id="Phone_StorageID"
                                            name="Phone_StorageID"
                                            value={formData.Phone_StorageID}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={`phone-form-select ${errors.Phone_StorageID ? "is-invalid" : ""}`}
                                            required
                                        >
                                            <option value="" disabled>Select Storage</option>
                                            {storage.map((s) => (
                                                <option key={s.phone_StorageID} value={s.phone_StorageID}>
                                                    {s.phone_Storage}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.Phone_StorageID && (
                                            <div className="phone-invalid-feedback">{errors.Phone_StorageID}</div>
                                        )}
                                    </div>
                                </div>

                                {/* Brand Dropdown */}
                                <div className="phone-form-group">
                                    <label htmlFor="Phone_BrandID" className="phone-form-label">
                                        <FaMobileAlt className="phone-form-label-icon" /> Brand Type
                                    </label>
                                    <select
                                        id="Phone_BrandID"
                                        name="Phone_BrandID"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={formData.Phone_BrandID}
                                        className={`phone-form-select ${errors.Phone_BrandID ? "is-invalid" : ""}`}
                                    >
                                        <option value="" disabled>Select Brand</option>
                                        {brand.map((b) => (
                                            <option key={b.phone_BrandID} value={b.phone_BrandID}>
                                                {b.phone_BrandName}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.Phone_BrandID && <div className="phone-invalid-feedback">{errors.Phone_BrandID}</div>}
                                </div>

                                {/* Buttons */}
                                <div className="phone-form-actions">
                                    <button type="submit" className="phone-submit-btn" disabled={submitting}>
                                        <FaSave /> {submitting ? "Saving..." : (pid ? "Update Mobile" : "Add Mobile")}
                                    </button>
                                    <button type="reset" className="phone-reset-btn" onClick={handleReset}>
                                        <FaUndo /> Reset
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

export default AddEditMobile;