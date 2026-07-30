import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./css/UserDetail.css";

const UserDetail = () => {
    const navigate = useNavigate();
    const [logedInUser, setLogedInUser] = useState(
        JSON.parse(localStorage.getItem("userData"))
    );
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        if (!logedInUser) navigate("/login");
    }, [logedInUser, navigate]);

    if (!logedInUser) return null;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLogedInUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        const updatedUserData = {
            userID: logedInUser.userID,
            userName: logedInUser.userName,
            password: logedInUser.password,
            emailAddress: logedInUser.emailAddress,
        };

        fetch(`https://localhost:44390/api/User/UserUpdate/${logedInUser.userID}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedUserData),
        })
            .then((res) => res.json())
            .then(() => {
                localStorage.setItem("userData", JSON.stringify(updatedUserData));
                setLogedInUser(updatedUserData);
                setIsUpdating(false);
                setSuccess("Profile updated successfully.");
            })
            .catch(() => {
                setError("Failed to update user details.");
            });
    };

    return (
        <div className="ud-wrapper">
            <Link to="/getmobile" className="ud-back-btn">← Back</Link>

            <div className="ud-card">
                <div className="ud-card-header">
                    <div className="ud-avatar">
                        {logedInUser.userName?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h2 className="ud-name">{logedInUser.userName}</h2>
                        <p className="ud-email-sub">{logedInUser.emailAddress}</p>
                    </div>
                </div>

                <div className="ud-divider"></div>

                {error && <div className="ud-error">{error}</div>}
                {success && <div className="ud-success">{success}</div>}

                {!isUpdating ? (
                    <div className="ud-fields">
                        <div className="ud-field">
                            <span className="ud-field-label">Username</span>
                            <span className="ud-field-value">{logedInUser.userName}</span>
                        </div>
                        <div className="ud-field">
                            <span className="ud-field-label">Email</span>
                            <span className="ud-field-value">{logedInUser.emailAddress}</span>
                        </div>
                        <div className="ud-field">
                            <span className="ud-field-label">Password</span>
                            <span className="ud-field-value">{"•".repeat(8)}</span>
                        </div>
                        <button className="ud-edit-btn" onClick={() => setIsUpdating(true)}>
                            Edit Profile
                        </button>
                    </div>
                ) : (
                    <form className="ud-form" onSubmit={handleUpdateSubmit}>
                        <div className="ud-form-group">
                            <label className="ud-form-label" htmlFor="userName">Username</label>
                            <input
                                className="ud-form-input"
                                type="text"
                                id="userName"
                                name="userName"
                                value={logedInUser.userName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="ud-form-group">
                            <label className="ud-form-label" htmlFor="emailAddress">Email</label>
                            <input
                                className="ud-form-input"
                                type="email"
                                id="emailAddress"
                                name="emailAddress"
                                value={logedInUser.emailAddress}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="ud-form-group">
                            <label className="ud-form-label" htmlFor="password">Password</label>
                            <input
                                className="ud-form-input"
                                type="password"
                                id="password"
                                name="password"
                                value={logedInUser.password}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="ud-form-actions">
                            <button type="button" className="ud-cancel-btn" onClick={() => setIsUpdating(false)}>
                                Cancel
                            </button>
                            <button type="submit" className="ud-save-btn">
                                Save Changes
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default UserDetail;