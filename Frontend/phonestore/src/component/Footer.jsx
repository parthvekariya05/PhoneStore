import { Link } from "react-router-dom";

const footerStyles = `
.ftr-root {
    background: #0a0618;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    border-top: 1px solid rgba(255,255,255,0.07);
    margin-top: auto;
}
.ftr-inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 3rem 2rem 2rem;
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 2rem;
}
.ftr-brand {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 10px;
}
.ftr-brand-icon { font-size: 20px; }
.ftr-brand-text {
    font-size: 17px;
    font-weight: 700;
    color: #ffffff;
}
.ftr-brand-accent {
    background: linear-gradient(135deg, #a78bfa, #60a5fa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}
.ftr-tagline {
    font-size: 13px;
    color: rgba(255,255,255,0.4);
    line-height: 1.6;
    margin: 0;
    max-width: 240px;
}
.ftr-links-col {
    display: flex;
    flex-direction: column;
    gap: 8px;
}
.ftr-col-title {
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: rgba(255,255,255,0.3);
    margin: 0 0 4px;
}
.ftr-link {
    font-size: 14px;
    color: rgba(255,255,255,0.55);
    text-decoration: none;
    transition: color 0.15s;
}
.ftr-link:hover { color: #a78bfa; text-decoration: none; }
.ftr-bottom {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1.25rem 2rem;
    border-top: 1px solid rgba(255,255,255,0.06);
    font-size: 13px;
    color: rgba(255,255,255,0.28);
}
.ftr-bottom p { margin: 0; }
@media (max-width: 640px) {
    .ftr-inner {
        grid-template-columns: 1fr 1fr;
        gap: 1.5rem;
        padding: 2rem 1.25rem 1.5rem;
    }
    .ftr-brand-col { grid-column: 1 / -1; }
    .ftr-bottom { padding: 1rem 1.25rem; text-align: center; }
}
`;

const Footer = () => {
    return (
        <>
            <style>{footerStyles}</style>
            <footer className="ftr-root">
                <div className="ftr-inner">
                    <div className="ftr-brand-col">
                        <div className="ftr-brand">
                            <span className="ftr-brand-icon">📱</span>
                            <span className="ftr-brand-text">
                                Mobile<span className="ftr-brand-accent">Shop</span>
                            </span>
                        </div>
                        <p className="ftr-tagline">Your one-stop destination for the latest mobiles.</p>
                    </div>

                    <div className="ftr-links-col">
                        <p className="ftr-col-title">Pages</p>
                        <Link className="ftr-link" to="/">Home</Link>
                        <Link className="ftr-link" to="/about">About</Link>
                        <Link className="ftr-link" to="/contact">Contact</Link>
                    </div>

                    <div className="ftr-links-col">
                        <p className="ftr-col-title">Follow us</p>
                        <a className="ftr-link" href="#">Facebook</a>
                        <a className="ftr-link" href="#">Twitter</a>
                        <a className="ftr-link" href="#">Instagram</a>
                    </div>
                </div>

                <div className="ftr-bottom">
                    <p>&copy; 2024 MobileShop. All rights reserved.</p>
                </div>
            </footer>
        </>
    );
};

export default Footer;