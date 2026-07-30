import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../store/auth";

const headerStyles = `
.hdr-root {
    position: sticky;
    top: 0;
    z-index: 100;
    background: rgba(15, 10, 40, 0.95);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.07);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}
.hdr-inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.hdr-brand {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
}
.hdr-brand-icon { font-size: 20px; }
.hdr-brand-text {
    font-size: 18px;
    font-weight: 700;
    color: #ffffff;
    letter-spacing: -0.01em;
}
.hdr-brand-accent {
    background: linear-gradient(135deg, #a78bfa, #60a5fa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}
.hdr-nav {
    display: flex;
    align-items: center;
    gap: 6px;
}
.hdr-link {
    padding: 6px 14px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    color: rgba(255,255,255,0.7);
    text-decoration: none;
    transition: color 0.15s, background 0.15s;
}
.hdr-link:hover {
    color: #ffffff;
    background: rgba(255,255,255,0.08);
    text-decoration: none;
}
.hdr-btn-login {
    padding: 8px 18px;
    border-radius: 999px;
    font-size: 13px;
    font-weight: 600;
    background: linear-gradient(135deg, #6a5ae0, #4f46e5);
    color: #ffffff;
    text-decoration: none;
    margin-left: 6px;
    transition: box-shadow 0.15s, opacity 0.15s;
}
.hdr-btn-login:hover {
    color: #ffffff;
    text-decoration: none;
    box-shadow: 0 4px 14px rgba(106,90,224,0.45);
    opacity: 0.92;
}
.hdr-btn-logout {
    padding: 8px 18px;
    border-radius: 999px;
    font-size: 13px;
    font-weight: 600;
    border: 1px solid rgba(255,255,255,0.2);
    color: rgba(255,255,255,0.8);
    text-decoration: none;
    margin-left: 6px;
    transition: background 0.15s, color 0.15s;
}
.hdr-btn-logout:hover {
    background: rgba(255,255,255,0.08);
    color: #ffffff;
    text-decoration: none;
}
.hdr-hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
}
.hdr-bar {
    width: 22px;
    height: 2px;
    background: #ffffff;
    border-radius: 2px;
    transition: transform 0.2s, opacity 0.2s;
    display: block;
}
.hdr-bar-open-1 { transform: translateY(7px) rotate(45deg); }
.hdr-bar-open-2 { opacity: 0; }
.hdr-bar-open-3 { transform: translateY(-7px) rotate(-45deg); }
.hdr-mobile-menu {
    overflow: hidden;
    max-height: 0;
    transition: max-height 0.25s ease;
    background: rgba(15, 10, 40, 0.97);
}
.hdr-mobile-open { max-height: 300px; }
.hdr-mobile-inner {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 1rem 1.25rem;
}
.hdr-mobile-link {
    padding: 10px 4px;
    font-size: 15px;
    font-weight: 500;
    color: rgba(255,255,255,0.75);
    text-decoration: none;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    transition: color 0.15s;
}
.hdr-mobile-link:hover { color: #ffffff; text-decoration: none; }
.hdr-mobile-btn {
    margin-top: 8px;
    padding: 11px;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 600;
    text-align: center;
    text-decoration: none;
}
.hdr-mobile-login {
    background: linear-gradient(135deg, #6a5ae0, #4f46e5);
    color: #ffffff;
}
.hdr-mobile-logout {
    border: 1px solid rgba(255,255,255,0.2);
    color: rgba(255,255,255,0.8);
}
@media (max-width: 768px) {
    .hdr-nav { display: none; }
    .hdr-hamburger { display: flex; }
}
`;

const Header = () => {
    const { isLoggedIn } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <style>{headerStyles}</style>
            <header className="hdr-root">
                <div className="hdr-inner">
                    <Link to="/" className="hdr-brand">
                        <span className="hdr-brand-icon">📱</span>
                        <span className="hdr-brand-text">
                            Mobile<span className="hdr-brand-accent">Shop</span>
                        </span>
                    </Link>

                    <nav className="hdr-nav">
                        <Link className="hdr-link" to="/">Home</Link>
                        <Link className="hdr-link" to="/about">About</Link>
                        <Link className="hdr-link" to="/contact">Contact</Link>
                        {isLoggedIn ? (
                            <Link className="hdr-btn-logout" to="/Logout">Logout</Link>
                        ) : (
                            <Link className="hdr-btn-login" to="/Login">Login</Link>
                        )}
                    </nav>

                    <button
                        className="hdr-hamburger"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span className={`hdr-bar ${menuOpen ? "hdr-bar-open-1" : ""}`}></span>
                        <span className={`hdr-bar ${menuOpen ? "hdr-bar-open-2" : ""}`}></span>
                        <span className={`hdr-bar ${menuOpen ? "hdr-bar-open-3" : ""}`}></span>
                    </button>
                </div>

                <div className={`hdr-mobile-menu ${menuOpen ? "hdr-mobile-open" : ""}`}>
                    <div className="hdr-mobile-inner">
                        <Link className="hdr-mobile-link" to="/" onClick={() => setMenuOpen(false)}>Home</Link>
                        <Link className="hdr-mobile-link" to="/about" onClick={() => setMenuOpen(false)}>About</Link>
                        <Link className="hdr-mobile-link" to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
                        {isLoggedIn ? (
                            <Link className="hdr-mobile-btn hdr-mobile-logout" to="/Logout" onClick={() => setMenuOpen(false)}>Logout</Link>
                        ) : (
                            <Link className="hdr-mobile-btn hdr-mobile-login" to="/Login" onClick={() => setMenuOpen(false)}>Login</Link>
                        )}
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;