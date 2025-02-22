import { useState, useEffect } from "react";

import { Link, Navigate } from "react-router-dom";

import "../css/Mobile.css";

const apiUrl = "https://localhost:44390/api/PhoneDetail/GetAllPhone";
const GetAllMobile = () => {
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
    if(!logedInUser.isAdmin)
        {
            return <Navigate to="/" />
        }
        else
        {
    const formate = data.map((item) => {
        return (
            <div className="col">
                <div className="card h-100">
                    <img src={item.phoneImage} className="card-img-top" alt="Mobile Image" />
                    <div className="card-body">
                        <h5 className="card-title">{item.phone_BrandName}  {item.phoneName}</h5>
                        <p className="card-text">Price : ₹{item.price}</p>
                        <Link to={"/admin/getallmobile/" + item.phoneID} className="btn btn-primary w-100">Mobile Detail</Link>
                    </div>
                </div>
            </div>
        );
    });

    return (
        <>
            <div className="container my-5">
                <Link className="btn btn-dark" to="/admin">back</Link>
                <h1 className="text-center mb-4" >Available Mobile Phones</h1>
                <div className="row row-cols-1 row-cols-md-3 g-4 ">
                    {formate}
                </div>
            </div>
        </>
    );
}}
export default GetAllMobile;