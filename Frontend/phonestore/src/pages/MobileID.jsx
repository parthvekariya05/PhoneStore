import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./css/MobileID.css";

const apiUrl = "https://localhost:44390/api/PhoneDetail/GetByPhoneID";

const MobileID = () => {
    const [data, setData] = useState({});
    const { id } = useParams();
    const navigate = useNavigate(); 

    useEffect(() => {
        fetch(`${apiUrl}/${id}`)
            .then((res) => res.json())
            .then((res) => {
                setData(res[0]);
                console.log(res[0]);
            });
    }, [id]);

    const handleProceed = () => {
        localStorage.setItem("phoneDetails", JSON.stringify(data)); // Store phone details in localStorage
        navigate("/address");
    };

    return (
        <div className="container my-5">
            <h1 className="text-center mb-4 fw-bold">Phone Detail</h1>
            <div className="row justify-content-center align-items-center">
                <div className="col-md-8">
                    <div className="mobileid-card">
                        <div className="mobileid-card-horizontal">
                            <img src={data.phoneImage} className="mobileid-card-img" alt="Phone Image" />
                            <div className="card-body">
                                <h2 className="mobileid-card-title">{data.phoneName}</h2>
                                <p className="mobileid-card-text"><strong>Brand:</strong> {data.phone_BrandName}</p>
                                <p className="mobileid-card-text"><strong>Storage:</strong> {data.phone_Storage}</p>
                                <p className="mobileid-card-text"><strong>Price: </strong>₹{data.price}</p>                                    
                                <button className="mobileid-btn-primary w-100" onClick={handleProceed}>
                                    Proceed to Address
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileID;
