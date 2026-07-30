import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

const styles = `
.adm-sidebar {
    min-height: 100vh;
    background: linear-gradient(180deg, #1a1035 0%, #0f0a28 100%);
    box-shadow: 4px 0 24px rgba(106,90,224,0.10);
}
.adm-profile-section {
    padding: 2rem 1rem 1.25rem;
    border-bottom: 1px solid rgba(255,255,255,0.08);
    text-align: center;
}
.adm-avatar {
    width: 72px; height: 72px;
    border-radius: 50%;
    object-fit: cover;
    border: 2.5px solid #6a5ae0;
}
.adm-avatar-placeholder {
    width: 72px; height: 72px;
    border-radius: 50%;
    background: linear-gradient(135deg, #6a5ae0, #4f46e5);
    display: flex; align-items: center; justify-content: center;
    font-size: 26px; font-weight: 700; color: #fff;
    margin: 0 auto;
    border: 2.5px solid #a78bfa;
}
.adm-username {
    font-size: 15px; font-weight: 600;
    color: #fff; margin: 10px 0 2px;
}
.adm-role {
    font-size: 11px;
    background: rgba(106,90,224,0.25);
    color: #a78bfa;
    padding: 2px 10px;
    border-radius: 999px;
    display: inline-block;
}
.adm-nav-section {
    padding: 1rem 0.75rem;
}
.adm-nav-label {
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: rgba(255,255,255,0.28);
    padding: 0.75rem 0.75rem 0.35rem;
    margin: 0;
}
.adm-nav-link {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 9px 12px;
    border-radius: 8px;
    color: rgba(255,255,255,0.65);
    text-decoration: none;
    font-size: 13.5px;
    font-weight: 500;
    transition: background 0.15s, color 0.15s;
    cursor: pointer;
    border: none;
    background: none;
    width: 100%;
    text-align: left;
}
.adm-nav-link:hover {
    background: rgba(106,90,224,0.18);
    color: #fff;
    text-decoration: none;
}
.adm-nav-link i {
    font-size: 16px;
    width: 20px;
    text-align: center;
    color: #a78bfa;
}
.adm-nav-sub {
    list-style: none;
    padding: 2px 0 4px 32px;
    margin: 0;
}
.adm-nav-sub li a {
    display: block;
    padding: 6px 10px;
    font-size: 13px;
    color: rgba(255,255,255,0.5);
    text-decoration: none;
    border-radius: 6px;
    transition: color 0.15s, background 0.15s;
}
.adm-nav-sub li a:hover {
    color: #fff;
    background: rgba(255,255,255,0.06);
    text-decoration: none;
}
.adm-main {
    background: #f5f3ff;
    min-height: 100vh;
    padding: 2rem 2rem;
}
.adm-page-title {
    font-size: 24px;
    font-weight: 700;
    color: #1a1035;
    margin-bottom: 0.25rem;
}
.adm-page-sub {
    font-size: 13px;
    color: #667085;
    margin-bottom: 0;
}
.adm-stat-card {
    border: none;
    border-radius: 16px;
    padding: 1.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    box-shadow: 0 2px 16px rgba(0,0,0,0.07);
    transition: transform 0.18s, box-shadow 0.18s;
    position: relative;
    overflow: hidden;
}
.adm-stat-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 28px rgba(0,0,0,0.13);
}
.adm-stat-card::after {
    content: '';
    position: absolute;
    right: -10px; top: -10px;
    width: 80px; height: 80px;
    border-radius: 50%;
    background: rgba(255,255,255,0.12);
}
.adm-stat-icon {
    width: 52px; height: 52px;
    border-radius: 14px;
    background: rgba(255,255,255,0.22);
    display: flex; align-items: center; justify-content: center;
    font-size: 24px;
    flex-shrink: 0;
    color: #fff;
}
.adm-stat-label {
    font-size: 12px;
    font-weight: 500;
    color: rgba(255,255,255,0.78);
    margin: 0 0 2px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
}
.adm-stat-value {
    font-size: 28px;
    font-weight: 700;
    color: #fff;
    margin: 0;
    line-height: 1;
}
.adm-card-purple { background: linear-gradient(135deg, #6a5ae0, #4f46e5); }
.adm-card-green  { background: linear-gradient(135deg, #10b981, #059669); }
.adm-card-amber  { background: linear-gradient(135deg, #f59e0b, #d97706); }
.adm-card-red    { background: linear-gradient(135deg, #ef4444, #dc2626); }
.adm-section-title {
    font-size: 16px;
    font-weight: 600;
    color: #1a1035;
    margin: 2rem 0 1rem;
}
`;

const NAV_ITEMS = [
    {
        icon: "bi-clipboard-data",
        label: "Graphs",
        id: "graphDD",
        links: [{ to: "/admin/graph", label: "Graphs & Charts", state: true }]
    },
    {
        icon: "bi-box2",
        label: "Products",
        id: "productsDD",
        links: [
            { to: "/admin/getallmobile", label: "Product List" },
            { to: "/admin/addphone", label: "Add Product" }
        ]
    },
    {
        icon: "bi-phone",
        label: "Brand",
        id: "brandDD",
        links: [{ to: "/admin/brand", label: "Brand List" }]
    },
    {
        icon: "bi-person",
        label: "Users",
        id: "usersDD",
        links: [
            { to: "/admin/getalluser", label: "User List" },
            { to: "/admin/getallcontact", label: "Contact Users" }
        ]
    },
    {
        icon: "bi-cart3",
        label: "Orders",
        id: "ordersDD",
        links: [{ to: "/admin/getallorder", label: "User Orders" }]
    },
    {
        icon: "bi-house",
        label: "Address",
        id: "addressDD",
        links: [{ to: "/admin/getalladdress", label: "User Address" }]
    }
];

const AdminDashboard = () => {
    const [logedInUser] = useState(JSON.parse(localStorage.getItem('userData')));
    const [adminProfile, setAdminProfile] = useState(null);
    const [openMenu, setOpenMenu] = useState(null);
    const [counts, setCounts] = useState({
        PhoneCount: 0, UserCount: 0, BillCount: 0, ContactCount: 0
    });

    const API_URLS = {
        PhoneCount:   "https://localhost:44390/api/PhoneDetail/PhoneCount",
        UserCount:    "https://localhost:44390/api/User/UserCount",
        BillCount:    "https://localhost:44390/api/Bill/BillCount",
        ContactCount: "https://localhost:44390/api/Contact/ContactCount",
        AdminProfile: "https://localhost:44390/api/User/AdminProfile/profile"
    };

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const responses = await Promise.all(
                    Object.values(API_URLS).slice(0, 4).map(url => fetch(url))
                );
                const data = await Promise.all(responses.map(r => r.json()));
                setCounts({
                    PhoneCount:   data[0][0]?.phoneCount   ?? 0,
                    UserCount:    data[1][0]?.userCount    ?? 0,
                    BillCount:    data[2][0]?.billCount    ?? 0,
                    ContactCount: data[3][0]?.contactCount ?? 0,
                });
            } catch (e) { console.error(e); }

            try {
                const res = await fetch(API_URLS.AdminProfile);
                setAdminProfile(await res.json());
            } catch (e) { console.error(e); }
        };
        fetchAll();
    }, []);

    if (!logedInUser?.isAdmin) return <Navigate to="/" />;

    const statCards = [
        { label: "Products", value: counts.PhoneCount,   icon: "bi-box2-fill",   cls: "adm-card-purple" },
        { label: "Users",    value: counts.UserCount,    icon: "bi-person-fill", cls: "adm-card-green"  },
        { label: "Orders",   value: counts.BillCount,    icon: "bi-cart3-fill",  cls: "adm-card-amber"  },
        { label: "Contacts", value: counts.ContactCount, icon: "bi-chat-dots-fill", cls: "adm-card-red" },
    ];

    return (
        <>
            <style>{styles}</style>
            <div className="d-flex">

                {/* ── Sidebar ── */}
                <nav className="adm-sidebar" style={{ width: 240, minWidth: 240 }}>
                    <div className="adm-profile-section">
                        {adminProfile?.avatar
                            ? <img src={adminProfile.avatar} alt="avatar" className="adm-avatar" />
                            : <div className="adm-avatar-placeholder">
                                {logedInUser.userName?.charAt(0).toUpperCase()}
                              </div>
                        }
                        <p className="adm-username">{logedInUser.userName}</p>
                        {adminProfile?.role && (
                            <span className="adm-role">{adminProfile.role}</span>
                        )}
                    </div>

                    <div className="adm-nav-section">
                        <p className="adm-nav-label">Navigation</p>
                        {NAV_ITEMS.map((item) => (
                            <div key={item.id}>
                                <button
                                    className="adm-nav-link"
                                    onClick={() => setOpenMenu(openMenu === item.id ? null : item.id)}
                                >
                                    <i className={`bi ${item.icon}`}></i>
                                    {item.label}
                                    <i className={`bi bi-chevron-${openMenu === item.id ? "up" : "down"} ms-auto`}
                                       style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}></i>
                                </button>
                                {openMenu === item.id && (
                                    <ul className="adm-nav-sub">
                                        {item.links.map((link) => (
                                            <li key={link.to}>
                                                <Link
                                                    to={link.to}
                                                    state={link.state ? { counts } : undefined}
                                                >
                                                    {link.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </nav>

                {/* ── Main ── */}
                <main className="adm-main flex-grow-1">
                    <div className="d-flex align-items-center justify-content-between mb-4">
                        <div>
                            <h1 className="adm-page-title">Admin Dashboard</h1>
                            <p className="adm-page-sub">Welcome back, {logedInUser.userName} 👋</p>
                        </div>
                        <span className="badge rounded-pill px-3 py-2"
                              style={{ background: "linear-gradient(135deg,#6a5ae0,#4f46e5)", fontSize: 13 }}>
                            Administrator
                        </span>
                    </div>

                    {/* Stat Cards */}
                    <div className="row g-3">
                        {statCards.map((card) => (
                            <div className="col-sm-6 col-xl-3" key={card.label}>
                                <div className={`adm-stat-card ${card.cls}`}>
                                    <div className="adm-stat-icon">
                                        <i className={`bi ${card.icon}`}></i>
                                    </div>
                                    <div>
                                        <p className="adm-stat-label">{card.label}</p>
                                        <p className="adm-stat-value">{card.value}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Quick Links */}
                    <p className="adm-section-title">Quick actions</p>
                    <div className="row g-3">
                        {[
                            { to: "/admin/getallmobile", icon: "bi-box2",       label: "All Products",  sub: "Manage inventory"   },
                            { to: "/admin/addphone",     icon: "bi-plus-circle", label: "Add Product",   sub: "Add a new phone"    },
                            { to: "/admin/getalluser",   icon: "bi-people",      label: "All Users",     sub: "Manage users"       },
                            { to: "/admin/getallorder",  icon: "bi-cart3",       label: "All Orders",    sub: "View all orders"    },
                        ].map((q) => (
                            <div className="col-sm-6 col-lg-3" key={q.to}>
                                <Link to={q.to} className="text-decoration-none">
                                    <div className="bg-white rounded-3 p-3 d-flex align-items-center gap-3 h-100"
                                         style={{ border: "1px solid #ede9fe", transition: "box-shadow 0.15s", cursor: "pointer" }}
                                         onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 16px rgba(106,90,224,0.12)"}
                                         onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
                                        <div className="rounded-2 d-flex align-items-center justify-content-center flex-shrink-0"
                                             style={{ width: 42, height: 42, background: "#f0ebff" }}>
                                            <i className={`bi ${q.icon}`} style={{ fontSize: 20, color: "#6a5ae0" }}></i>
                                        </div>
                                        <div>
                                            <p className="mb-0 fw-600" style={{ fontSize: 14, fontWeight: 600, color: "#1a1035" }}>{q.label}</p>
                                            <p className="mb-0" style={{ fontSize: 12, color: "#667085" }}>{q.sub}</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </>
    );
};

export default AdminDashboard;