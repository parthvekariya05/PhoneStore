import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import loginimg from "./css/images/Login.jpg";
import { useAuth } from "../store/auth";

const SignUp = () => {
    const { isLoggedIn } = useAuth();
    const [user, setUser] = useState({
        username: "",
        password: "",
        emailAddress: "",
    });
    const navigate = useNavigate();

    const handleInput = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if username and password are the same
        if (user.username === user.password) {
            toast.error("Username and password cannot be the same.");
            return; // Prevent form submission
        }

        try {
            fetch("https://localhost:44390/api/User/UserRegister", {
                body: JSON.stringify(user),
                headers: { "Content-Type": "application/json" },
                method: "POST",
            }).then((response) => {
                console.log(response);

                const responseData = response.json();

                if (response.ok) {
                    toast.success(responseData.message || "Registered successfully");
                    setUser({ username: "", password: "", emailAddress: "" });
                    navigate("/login");
                } else {
                    toast.error(responseData.extraDetails ? responseData.extraDetails[0] : responseData.message);
                }
            })

        } catch (error) {
            console.error("Error:", error);
            toast.error("Something went wrong. Please try again.");
        }
    };

    if (isLoggedIn) {
        return <Navigate to="/" />
    } else {
        return (
            <div className="container-fluid d-flex vh-100">
                <div className="row w-100 justify-content-center align-items-center">
                    <div className="col-md-6 col-lg-4 mx-auto">
                        <div className="card shadow p-3">
                            <div className="card-body">
                                <h2 className="card-title text-center mb-4">User Registration</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="username" className="form-label"><strong>User Name</strong></label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={user.username}
                                            id="username"
                                            name="username"
                                            placeholder="Enter username"
                                            required
                                            onChange={handleInput}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label"><strong>Password</strong></label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            value={user.password}
                                            id="password"
                                            name="password"
                                            placeholder="Enter password"
                                            required
                                            onChange={handleInput}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="emailAddress" className="form-label"><strong>Email Address</strong></label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            value={user.emailAddress}
                                            id="emailAddress"
                                            name="emailAddress"
                                            placeholder="Enter email address"
                                            required
                                            onChange={handleInput}
                                        />
                                    </div>

                                    <button type="submit" className="btn btn-primary w-100">Register</button>
                                </form>
                                <div className="mt-3 text-center">
                                    <p>Already have an account? <Link to="/login" className="text-decoration-none">Login here</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 d-none d-md-block">
                        <img src={loginimg} className="img-fluid" alt="Mobile Shop" />
                    </div>
                </div>
            </div>
        );
    }
};

export default SignUp;
