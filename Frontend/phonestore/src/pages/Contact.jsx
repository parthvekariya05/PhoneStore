import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import "./css/Contact.css";
import { useAuth } from "../store/auth";

const Contact=()=>{
    const { isLoggedIn } = useAuth();
    const [user, setUser] = useState({        
        EmailAddress: "",               
        Description:""
    });
    const navigate = useNavigate();
    
    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("https://localhost:44390/api/Contact/InsertContact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });

            const responseData = await response.json();
            
            
            if (response.ok) {
                toast.success("message send successful");                               
                setUser({EmailAddress: "",Description: ""  });
                navigate("/contact");
            } else {
                toast.error(responseData.extraDetails ? responseData.extraDetails[0] : responseData.description);
            }
        } catch (error) {
            console.error("Error", error);
        }
    };
    return (
        <div className="container">
            <h1 className="fw-bold">Contact Us</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="EmailAddress" className="form-label">Email Address</label>
                    <input type="email" className="form-control" value={user.EmailAddress} id="EmailAddress" name="EmailAddress" placeholder="Enter your EmailAddress" required onChange={handleInput} />
                </div>  
                <div className="mb-3">
                    <label htmlFor="Description" className="form-label">Message</label>
                    <textarea type="text"rows="4" className="form-control" value={user.Description} id="description" name="Description" placeholder="Enter your Message" required onChange={handleInput} ></textarea>
                </div>  
                {isLoggedIn
                            ? <button type="submit">Send Message</button>
                            : <Link to="/login" className="btn btn-primary btn-lg">Please Login</Link>}                          
                
            </form>
        </div>
    );
}
export default Contact;