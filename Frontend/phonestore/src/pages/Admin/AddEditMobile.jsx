import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams,Link } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { toast } from "react-toastify";

const apiUrl = "https://localhost:44390/api/";

const AddEditMobile = () => {
    const [logedInUser] = useState(JSON.parse(localStorage.getItem('userData')));

    const { pid } = useParams();
    const { isLoggedIn, authorizationToken } = useAuth();
    const navigate = useNavigate();

    const [brand, setBrand] = useState([]);
    const [storage, setStorage] = useState([]);

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
            <div className="container mt-5">
                <Link className="btn btn-dark" to="/admin">back</Link>
                <div className="card shadow-lg">
                    <div className="card-header bg-primary text-white text-center">
                        <h4>{pid > 0 ? "Edit" : "Add"} Phone</h4>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            {/* File Input */}
                            {/* <div className="mb-3">
                            <label htmlFor="PhoneImage" className="form-label">
                                Mobile Photo
                            </label>
                            <input
                                type="file"
                                className="form-control"
                                id="PhoneImage"
                                name="PhoneImage"
                                onChange={handleFileChange}
                                required={!PhoneId}
                            />
                        </div> */}

                            <div className="mb-3">
                                <label htmlFor="PhoneImage" className="form-label">
                                    Phone PhoneImage
                                </label>
                                <input
                                    type="text"
                                    id="PhoneImage"
                                    name="PhoneImage"
                                    value={formData.PhoneImage}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`form-control ${errors.PhoneImage ? "is-invalid" : ""}`}
                                    placeholder="Enter Phone Image"
                                    required
                                />
                                {errors.PhoneImage && (
                                    <div className="invalid-feedback">{errors.PhoneImage}</div>
                                )}
                            </div>

                            {/* Phone Name */}
                            <div className="mb-3">
                                <label htmlFor="PhoneName" className="form-label">
                                    Phone Name
                                </label>
                                <input
                                    type="text"
                                    id="PhoneName"
                                    name="PhoneName"
                                    value={formData.PhoneName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`form-control ${errors.PhoneName ? "is-invalid" : ""}`}
                                    placeholder="Enter Phone Name"
                                    required
                                />
                                {errors.PhoneName && (
                                    <div className="invalid-feedback">{errors.PhoneName}</div>
                                )}
                            </div>

                            {/* Price */}
                            <div className="mb-3">
                                <label htmlFor="Price" className="form-label">
                                    Phone Price
                                </label>
                                <input
                                    type="text"
                                    id="Price"
                                    name="Price"
                                    value={formData.Price}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`form-control ${errors.Price ? "is-invalid" : ""}`}
                                    placeholder="Enter Phone Price"
                                    required
                                />
                                {errors.Price && <div className="invalid-feedback">{errors.Price}</div>}
                            </div>

                            {/* Brand Dropdown */}
                            <div className="mb-3">
                                <label htmlFor="Phone_BrandID" className="form-label">
                                    <strong>Brand Type:</strong>
                                </label>
                                <select
                                    id="Phone_BrandID"
                                    name="Phone_BrandID"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={formData.Phone_BrandID}
                                    className={`form-select ${errors.Phone_BrandID ? "is-invalid" : ""}`}
                                >
                                    <option value="" disabled>Select Brand</option>
                                    {brand.map((b) => (
                                        <option key={b.phone_BrandID} value={b.phone_BrandID}>
                                            {b.phone_BrandName}
                                        </option>
                                    ))}
                                </select>
                                {errors.Phone_BrandID && <div className="invalid-feedback">{errors.Phone_BrandID}</div>}
                            </div>

                            {/* Storage Dropdown */}
                            <div className="mb-3">
                                <label htmlFor="Phone_StorageID" className="form-label">
                                    Phone Storage
                                </label>
                                <select
                                    id="Phone_StorageID"
                                    name="Phone_StorageID"
                                    value={formData.Phone_StorageID}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`form-select ${errors.Phone_StorageID ? "is-invalid" : ""}`}
                                    required
                                >
                                    <option value="" disabled>
                                        Select Storage
                                    </option>
                                    {storage.map((s) => (
                                        <option key={s.phone_StorageID} value={s.phone_StorageID}>
                                            {s.phone_Storage}
                                        </option>
                                    ))}
                                </select>
                                {errors.Phone_StorageID && (
                                    <div className="invalid-feedback">{errors.Phone_StorageID}</div>
                                )}
                            </div>

                            {/* Buttons */}
                            <div className="d-flex justify-content-between">
                                <button type="submit" className="btn btn-primary">
                                    {pid ? "Update Mobile" : "Add Mobile"}
                                </button>
                                <button type="reset" className="btn btn-secondary" onClick={handleReset}>
                                    Reset
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    };
}

export default AddEditMobile;
