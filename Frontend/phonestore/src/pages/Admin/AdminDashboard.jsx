import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./css/Admin.css";
import { Link, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

const AdminDashboard = () => {
    const [logedInUser] = useState(JSON.parse(localStorage.getItem('userData')));
    const [adminProfile, setAdminProfile] = useState(null);

    const [counts, setCounts] = useState({
        PhoneCount: 0,
        UserCount: 0,
        BillCount: 0,
        ContactCount: 0
    });

    const API_URLS = {
        PhoneCount: "https://localhost:44390/api/PhoneDetail/PhoneCount",
        UserCount: "https://localhost:44390/api/User/UserCount",
        BillCount: "https://localhost:44390/api/Bill/BillCount",
        ContactCount: "https://localhost:44390/api/Contact/ContactCount",
        AdminProfile: "https://localhost:44390/api/User/AdminProfile/profile"
    };

    const fetchAdminProfile = async () => {
        try {
            const response = await fetch(API_URLS.AdminProfile);
            const admindata = await response.json();

            setAdminProfile(admindata);
        } catch (error) {
            console.error("Error fetching admin profile:", error);
        }
    };

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const responses = await Promise.all(
                    Object.values(API_URLS).slice(0, 4).map(url => fetch(url))
                );

                const data = await Promise.all(responses.map(res => res.json()));

                setCounts({
                    PhoneCount: data[0][0]?.phoneCount ?? 0,
                    UserCount: data[1][0]?.userCount ?? 0,
                    BillCount: data[2][0]?.billCount ?? 0,
                    ContactCount: data[3][0]?.contactCount ?? 0
                });

            } catch (error) {
                console.error("Error fetching counts:", error);
            }
        };

        fetchCounts();
        fetchAdminProfile();
    }, []);

    if (!logedInUser?.isAdmin) {
        return <Navigate to="/" />
    }

    return (
        <div className="container-fluid">
            <div className="row">
                {/* Sidebar */}

                <nav className="col-md-3 col-lg-2 bg-dark text-white vh-100 admin-sidebar">

                    <div className="text-center py-3">
                        {adminProfile?.avatar && (
                            <div className="d-flex justify-content-center">
                                <img
                                    src={adminProfile.avatar}
                                    alt="Admin Avatar"
                                    className="rounded-circle img-fluid"
                                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                                />
                            </div>
                        )}
                        <h6 className="mt-2">{logedInUser.userName}</h6>
                        <p>{adminProfile?.role}</p>
                    </div>



                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <a className="nav-link text-white" data-bs-toggle="collapse" href="#graphDropdown">
                                <i className=" bi bi-clipboard-data      me-2"></i> Graphs
                            </a>
                            <ul className="collapse list-unstyled ps-3" id="graphDropdown">
                                <li><Link to="/admin/graph" state={{ counts }} className="nav-link text-white">Graphs & Charts</Link></li>
                            </ul>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link text-white" data-bs-toggle="collapse" href="#productsDropdown">
                                <i className="bi bi-box2 me-2"></i> Products
                            </a>
                            <ul className="collapse list-unstyled ps-3" id="productsDropdown">
                                <li><Link to="/admin/getallmobile" className="nav-link text-white">Product List</Link></li>
                                <li><Link to="/admin/addphone" className="nav-link text-white">Add Product</Link></li>
                            </ul>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link text-white" data-bs-toggle="collapse" href="#brandDropdown">
                                <i className="bi bi-phone me-2"></i> Brand
                            </a>
                            <ul className="collapse list-unstyled ps-3" id="brandDropdown">
                                <li><Link to="/admin/brand" className="nav-link text-white">Brand List</Link></li>
                                {/* <li><Link to="/admin/addphone" className="nav-link text-white">Add Product</Link></li> */}
                            </ul>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link text-white" data-bs-toggle="collapse" href="#usersDropdown">
                                <i className="bi bi-person me-2"></i> Users
                            </a>
                            <ul className="collapse list-unstyled ps-3" id="usersDropdown">
                                <li><Link to="/admin/getalluser" className="nav-link text-white">User List</Link></li>
                                <li><Link to="/admin/getallcontact" className="nav-link text-white">Contact User</Link></li>
                            </ul>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link text-white" data-bs-toggle="collapse" href="#ordersDropdown">
                                <i className="bi bi-cart3 me-2"></i> Orders
                            </a>
                            <ul className="collapse list-unstyled ps-3" id="ordersDropdown">
                                <li><Link to="/admin/getallorder" className="nav-link text-white">User Orders</Link></li>
                            </ul>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link text-white" data-bs-toggle="collapse" href="#addressDropdown">
                                <i className="bi bi-house me-2"></i> Address
                            </a>
                            <ul className="collapse list-unstyled ps-3" id="addressDropdown">
                                <li><Link to="/admin/getalladdress" className="nav-link text-white">User Address</Link></li>
                            </ul>
                        </li>
                    </ul>
                </nav>

                {/* Main Content */}
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 admin-dashboard">
                    <h1 className="mt-4">Admin Dashboard</h1>
                    <div className="row mt-4">
                        <div className="col-sm-6 col-md-3">
                            <div className="card bg-primary text-white shadow mb-3 admin-card">
                                <div className="card-icon-bg">
                                    <i className="bi bi-box2-fill"></i>
                                </div>
                                <div className="card-body text-center">
                                    <i className="bi bi-box2-fill card-icon"></i>
                                    <h3>{counts.PhoneCount}</h3>
                                    <p>Products</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-6 col-md-3">
                            <div className="card bg-success text-white shadow mb-3 admin-card">
                                <div className="card-icon-bg">
                                    <i className="bi bi-person"></i>
                                </div>
                                <div className="card-body text-center">
                                    <i className="bi bi-person card-icon"></i>
                                    <h3>{counts.UserCount}</h3>
                                    <p>Users</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-6 col-md-3">
                            <div className="card bg-warning text-white shadow mb-3 admin-card">
                                <div className="card-icon-bg">
                                    <i className="bi bi-cart3"></i>
                                </div>
                                <div className="card-body text-center">
                                    <i className="bi bi-cart3 card-icon"></i>
                                    <h3>{counts.BillCount}</h3>
                                    <p>Orders</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-6 col-md-3">
                            <div className="card bg-danger text-white shadow mb-3 admin-card">
                                <div className="card-icon-bg">
                                    <i className="bi bi-chat-dots"></i>
                                </div>
                                <div className="card-body text-center">
                                    <i className="bi bi-chat-dots card-icon"></i>
                                    <h3>{counts.ContactCount}</h3>
                                    <p>Contacts</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
