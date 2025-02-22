import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";

import "./css/User.css";

const apiUrl = "https://localhost:44390/api/Contact/GetAllContact";
const GetallContact = () => {
    const [logedInUser] = useState(JSON.parse(localStorage.getItem('userData')));
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch(apiUrl, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                setData(res);
            });
    }, []);
    const formate = data.map((item) => {
        return (
            <tr>
                <td>{item.emailAddress}</td>
                <td>{item.description}</td>                
            </tr>
        );
    });
    if(!logedInUser.isAdmin)
        {
            return <Navigate to="/" />
        }
        else
        {
    return (
        <>
            <div class="user-page">
                <Link className="btn btn-dark" to="/admin">back</Link>
                <h1>User Contact List</h1>
                <table>
                    <thead>
                        <tr>                            
                            <th>Email Address</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {formate}                       
                    </tbody>
                </table>
            </div>
        </>
    );
}}
export default GetallContact;