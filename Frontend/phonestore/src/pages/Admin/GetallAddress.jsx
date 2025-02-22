import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import "./css/User.css";

const apiUrl = "https://localhost:44390/api/Address/GetAllAddress";
const GetallAddress = () => {
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
                <td>{item.userName}</td>
                <td>{item.address}</td> 
                <td>{item.country}</td> 
                <td>{item.state}</td> 
                <td>{item.city}</td> 
                <td>{item.pincode}</td>                
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
                            <th>User Name</th>
                            <th>Address</th>
                            <th>Country</th>
                            <th>State</th>
                            <th>City</th>
                            <th>Pincode</th>
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
export default GetallAddress;