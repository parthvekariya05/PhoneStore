import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./css/MobileID.css";

const apiUrl = "https://localhost:44390/api/PhoneDetail/GetByPhoneID";

const MobileID = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        fetch(`${apiUrl}/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch");
                return res.json();
            })
            .then((res) => {
                setData(res[0]);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    const handleProceed = () => {
        localStorage.setItem("phoneDetails", JSON.stringify(data));
        navigate("/address");
    };

    if (loading) return (
        <div className="mid-wrapper">
            <div className="mid-skeleton">
                <div className="mid-sk-img"></div>
                <div className="mid-sk-body">
                    <div className="mid-sk-line" style={{ width: "60%" }}></div>
                    <div className="mid-sk-line" style={{ width: "40%" }}></div>
                    <div className="mid-sk-line" style={{ width: "50%" }}></div>
                    <div className="mid-sk-line" style={{ width: "45%" }}></div>
                    <div className="mid-sk-line mid-sk-btn"></div>
                </div>
            </div>
        </div>
    );

    if (error) return (
        <div className="mid-wrapper">
            <div className="mid-error">⚠️ {error}</div>
        </div>
    );

    if (!data) return null;

    return (
        <div className="mid-wrapper">
            <button className="mid-back-btn" onClick={() => navigate(-1)}>
                ← Back
            </button>

            <div className="mid-card">
                <div className="mid-img-wrap">
                    <img src={data.phoneImage} className="mid-img" alt={data.phoneName} />
                </div>

                <div className="mid-body">
                    <span className="mid-brand">{data.phone_BrandName}</span>
                    <h1 className="mid-name">{data.phoneName}</h1>

                    <div className="mid-specs">
                        <div className="mid-spec-row">
                            <span className="mid-spec-label">Storage</span>
                            <span className="mid-spec-value">{data.phone_Storage}</span>
                        </div>
                        <div className="mid-spec-row">
                            <span className="mid-spec-label">Price</span>
                            <span className="mid-spec-value mid-price">
                                ₹{Number(data.price).toLocaleString("en-IN")}
                            </span>
                        </div>
                    </div>

                    <button className="mid-proceed-btn" onClick={handleProceed}>
                        Proceed to Address →
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MobileID;