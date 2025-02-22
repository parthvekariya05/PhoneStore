import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "../css/MobileID.css";

const apiUrl = "https://localhost:44390/api/PhoneDetail/GetByPhoneID";
const GetIDmobile = () => {
    const [logedInUser] = useState(JSON.parse(localStorage.getItem('userData')));
    const [data, setData] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(apiUrl + "/" + id)
            .then((res) => res.json())
            .then((res) => {
                setData(res[0]);
                console.log(res[0]);
            });
    }, []);

    const handleUpdate = () => {
        navigate("/admin/addphone/"+data.phoneID);
    };

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            fetch(`https://localhost:44390/api/PhoneDetail/DeletePhone/${id}`, {
                method: "DELETE",
            })
                .then((res) => {
                    if (res.ok) {
                        alert("Phone record deleted successfully.");
                        navigate("/admin/getallmobile");
                    } else {
                        alert("Failed to delete the phone record.");
                    }
                })
                .catch((error) => {
                    console.error("Error deleting phone record:", error);
                    alert("An error occurred while deleting the phone record.");
                });
        }
    };
    if(!logedInUser.isAdmin)
        {
            return <Navigate to="/" />
        }
        else
        {
    return (
        <>
            <div className="container my-5">
                <Link className="btn btn-dark" to="/admin">back</Link>
                <h1 className="text-center mb-4 fw-bold">Phone Detail</h1>
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-horizontal">
                                <img src={data.phoneImage} className="card-img" alt="Phone Image" />
                                <div className="card-body">
                                    <h2 className="card-title">{data.phoneName}</h2>
                                    <p className="card-text"><strong>Brand:</strong> {data.phone_BrandName}</p>
                                    <p className="card-text"><strong>Storage:</strong> {data.phone_Storage}</p>
                                    <p className="card-text"><strong>Price: </strong>₹{data.price}</p>
                                    <div className="d-flex gap-3 mt-3">
                                        <button
                                            className="btn btn-warning w-50"
                                            onClick={handleUpdate}
                                        >
                                            Update
                                        </button>
                                        <button
                                            className="btn btn-danger w-50"
                                            onClick={handleDelete}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
}
export default GetIDmobile;
