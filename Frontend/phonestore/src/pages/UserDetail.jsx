import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";  // Changed from 'Navigate' to 'useNavigate' for redirection
import "./css/UserDetail.css"; // Optional: Add custom styles if necessary

const UserDetail = () => {
    const [logedInUser, setLogedInUser] = useState(JSON.parse(localStorage.getItem('userData')));
    const [data, setData] = useState(null);  // Set initial value as null
    const [error, setError] = useState("");  // State to handle errors
    const [isUpdating, setIsUpdating] = useState(false); // To handle the update state
    const navigate = useNavigate();  // For navigation

    useEffect(() => {
        if (!logedInUser) return;

        // Fetching user details from the API
        fetch(`https://localhost:44390/api/User/GetByUserID/${logedInUser.userID}`, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then((res) => res.json())
        .then((res) => {
            setData(res);
        })
        .catch((error) => {
            console.error("Error fetching user details:", error);
            setError("Failed to load user details.");
        });
    }, [logedInUser]);

    if (!logedInUser) {
        navigate("/login");  // Redirect to login if not logged in
        return null;  // Don't render anything if redirected
    }

    const handleUpdateClick = () => {
        setIsUpdating(true);
    };

    const handleUpdateSubmit = (e) => {
        e.preventDefault();

        // Create updated user data
        const updatedUserData = {
            userID: logedInUser.userID,
            userName: logedInUser.userName, // Updated userName
            password: logedInUser.password, // Updated password
            emailAddress: logedInUser.emailAddress, // Updated email
        };

        fetch(`https://localhost:44390/api/User/UserUpdate/${logedInUser.userID}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedUserData),
        })
        .then((res) => res.json())
        .then((res) => {
            // Handle success response
            setIsUpdating(false);
            setLogedInUser(updatedUserData); // Update the local state with the new data
            alert("User updated successfully!");
        })
        .catch((error) => {
            console.error("Error updating user details:", error);
            setError("Failed to update user details.");
            setIsUpdating(false);
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLogedInUser((prevState) => ({
            ...prevState,
            [name]: value, // Update the corresponding field in the user object
        }));
    };

    return (
        <div className="user-details-container my-5 user-details-brgin">
            <Link className="btn btn-dark" to="/getmobile">Back</Link>
            <h1 className="user-details-h1 text-center mb-4">User Details</h1>

            {error && <p className="user-details-p text-danger text-center">{error}</p>}

            {logedInUser ? (
                <div className="user-details-card">
                    <h3>{logedInUser.userName}</h3>
                    <p className="user-details-p"><strong>Password:</strong> {logedInUser.password}</p>
                    <p className="user-details-p"><strong>Email:</strong> {logedInUser.emailAddress}</p>

                    {/* Update Button */}
                    <button className="btn btn-primary" onClick={handleUpdateClick}>Update</button>

                    {/* Show Update Form if updating */}
                    {isUpdating && (
                        <form onSubmit={handleUpdateSubmit}>
                            <div>
                                <label htmlFor="userName">User Name:</label>
                                <input
                                    type="text"
                                    id="userName"
                                    name="userName"  // Bind to 'userName'
                                    value={logedInUser.userName}  // Bind to state
                                    onChange={handleInputChange}  // Handle changes
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="password">Password:</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"  // Bind to 'password'
                                    value={logedInUser.password}  // Bind to state
                                    onChange={handleInputChange}  // Handle changes
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="emailAddress"  // Bind to 'emailAddress'
                                    value={logedInUser.emailAddress}  // Bind to state
                                    onChange={handleInputChange}  // Handle changes
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-success">Submit</button>
                        </form>
                    )}
                </div>
            ) : (
                <p className="user-details-p text-center">Loading user details...</p>
            )}
        </div>
    );
};

export default UserDetail;
