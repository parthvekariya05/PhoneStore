import { useState } from "react"; 
import { Link, Navigate, useNavigate } from "react-router-dom"; 
import { toast } from "react-toastify"; 

import loginImg from "./css/images/login.jpg"
import { useAuth } from "../store/auth"; 

const Login = () => { 
    const [user, setUser] = useState({ username: "", password: "" }); 
    const [touched, setTouched] = useState({ username: false, password: false }); 
    const [errors, setErrors] = useState({ username: "", password: "" }); 

    const navigate = useNavigate(); 
    const { storeTokenInLS, storeUserInLS, isLoggedIn } = useAuth(); 

    const handleInput = (e) => { 
        const { name, value } = e.target; 
        setUser((prev) => ({ ...prev, [name]: value })); 
    }; 

    const validateField = (name, value) => { 
        if (!value) { 
            return `${name} is required`; 
        } 
        return ""; 
    }; 

    
   
    const handleSubmit = async (e) => { 
        e.preventDefault(); 
    
        const touchedAll = { username: true, password: true }; 
        setTouched(touchedAll); 
    
        const newErrors = { 
            username: validateField("Username", user.username), 
            password: validateField("Password", user.password), 
        }; 
        setErrors(newErrors); 
    
        if (Object.values(newErrors).every((error) => error === "")) { 
            try { 
                const response = await fetch("https://localhost:44390/api/User/Login", { 
                    method: "POST", 
                    headers: { "Content-Type": "application/json" }, 
                    body: JSON.stringify(user), 
                }); 
    
                const responseData = await response.json(); 
                                            
                if (response.ok) { 
                    toast.success("Login successfully!"); 
                    storeUserInLS(responseData.user); 
                    storeTokenInLS(responseData.token);     
                    setUser({ username: "", password: "" }); 
                    setTouched({ username: false, password: false }); 
                    setErrors({ username: "", password: "" }); 
    
                    if (responseData.user?.isAdmin) {  
                       
                        setTimeout(() => navigate("/admin"), 100);  // 100ms delay
                    } else {  
                        
                        setTimeout(() => navigate("/"), 100);
                    } 
                    
                } else { 
                    toast.error(responseData.message || "Login failed!"); 
                } 
            } catch (error) { 
               
                toast.error("An error occurred while logging in."); 
                console.error("Login Error:", error); 
            } 
        } 
    };
    
    

    if (isLoggedIn) { 
        return <Navigate to="/" />; 
    } 

    return ( 
        <div className="container-fluid vh-100"> 
            <div className="row h-100 justify-content-center align-items-center"> 
                <div className="col-md-6 col-lg-4 mx-auto"> 
                    <div className="card shadow p-4"> 
                        <div className="card-body"> 
                            <h2 className="card-title text-center mb-4">User Login</h2> 
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
                                    {touched.username && errors.username && ( 
                                        <div className="text-danger">{errors.username}</div> 
                                    )} 
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
                                    {touched.password && errors.password && ( 
                                        <div className="text-danger">{errors.password}</div> 
                                    )} 
                                </div> 

                                <button type="submit" className="btn btn-success w-100">Login</button> 
                            </form> 
                            <p className="text-center mt-3">Don't have an account? <Link to="/signup">Sign Up</Link></p> 
                        </div> 
                    </div> 
                </div> 

                <div className="col-md-6 d-none d-md-block"> 
                    <img src={loginImg} className="img-fluid" alt="Mobile Shop Image" /> 
                </div> 
            </div> 
        </div> 
    ); 
}; 

export default Login;


