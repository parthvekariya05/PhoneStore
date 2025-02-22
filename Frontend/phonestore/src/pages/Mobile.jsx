import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./css/Mobile.css";

const apiUrl = "https://localhost:44390/api/PhoneDetail/GetAllPhone";

const Mobile = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState(""); // State for search input

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(apiUrl, {
                    headers: { "Content-Type": "application/json" },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }

                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchData();
    }, []);

    // Filtered data based on search query
    const filteredData = data.filter((item) =>
        item.phone_BrandName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container my-5 getmobile-body-bg">
            <div className="d-flex justify-content-between mb-4">
                <Link to="/order-history" className="getmobile-order-history">
                    Order History
                </Link>
                {/* Add User Details link */}
                <Link to="/user-detail" className="getmobile-order-history">
                    User Details
                </Link>
            </div>

            <h1 className="text-center mb-4">Available Mobile Phones</h1>

            {/* Search Bar */}
            <div className="search-container">
                <input
                    type="text"
                    className="getmobile-search-input"
                    placeholder="Search mobile by name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {error && <p className="text-danger text-center">{error}</p>}

            <div className="row row-cols-1 row-cols-md-3 g-4">
                {filteredData.map((item) => (
                    <div className="col" key={item.phoneID}>
                        <div className="getmobile-phone-card h-100">
                            <img src={item.phoneImage} className="card-img-top" alt="Mobile Image" />
                            <div className="card-body">
                                <h5 className="getmobile-phone-title">{item.phone_BrandName} {item.phoneName}</h5>
                                <p className="getmobile-phone-price">Price : ₹{item.price}</p>
                                <Link to={`/getmobile/${item.phoneID}`} className="btn btn-primary getmobile-buy-btn w-100">
                                    Buy Now
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Mobile;
