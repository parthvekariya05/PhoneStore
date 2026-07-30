import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./css/Mobile.css";

const apiUrl = "https://localhost:44390/api/PhoneDetail/GetAllPhone";

const Mobile = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(apiUrl, {
                    headers: { "Content-Type": "application/json" },
                });
                if (!response.ok) throw new Error("Failed to fetch data");
                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const filteredData = data.filter((item) =>
        item.phone_BrandName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="gm-wrapper">

            <div className="gm-topbar">
                <Link to="/order-history" className="gm-nav-pill">📦 Order History</Link>
                <Link to="/user-detail" className="gm-nav-pill">👤 User Details</Link>
            </div>

            <div className="gm-header">
                <h1 className="gm-title">Available Mobile Phones</h1>
                <p className="gm-subtitle">Find your perfect device</p>
            </div>

            <div className="gm-search-wrap">
                <span className="gm-search-icon">🔍</span>
                <input
                    type="text"
                    className="gm-search-input"
                    placeholder="Search by brand name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                    <button className="gm-search-clear" onClick={() => setSearchQuery("")}>✕</button>
                )}
            </div>

            {error && <p className="gm-error">{error}</p>}

            {!loading && !error && (
                <p className="gm-count">{filteredData.length} phone{filteredData.length !== 1 ? "s" : ""} found</p>
            )}

            {loading && (
                <div className="gm-grid">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div className="gm-skeleton" key={i}>
                            <div className="gm-sk-img"></div>
                            <div className="gm-sk-body">
                                <div className="gm-sk-line" style={{ width: "50%" }}></div>
                                <div className="gm-sk-line" style={{ width: "80%" }}></div>
                                <div className="gm-sk-line" style={{ width: "40%" }}></div>
                                <div className="gm-sk-line gm-sk-btn"></div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {!loading && (
                <div className="gm-grid">
                    {filteredData.length === 0 ? (
                        <div className="gm-empty">
                            <div className="gm-empty-icon">📱</div>
                            <p>No phones found for "<strong>{searchQuery}</strong>"</p>
                        </div>
                    ) : (
                        filteredData.map((item) => (
                            <div className="gm-card" key={item.phoneID}>
    <div className="gm-card-img-wrap">
        <img
            src={item.phoneImage}
            className="gm-card-img"
            alt={`${item.phone_BrandName} ${item.phoneName}`}
        />
    </div>
    <div className="gm-card-body">
        <h5 className="gm-card-name">{item.phone_BrandName} {item.phoneName}</h5>
        <p className="gm-card-price">₹{Number(item.price).toLocaleString("en-IN")}</p>
        <Link to={`/getmobile/${item.phoneID}`} className="gm-buy-btn">Buy Now</Link>
    </div>
</div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default Mobile;