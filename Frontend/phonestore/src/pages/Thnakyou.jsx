import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./css/Thankyou.css";

export default function ThankYou() {
    const navigate = useNavigate();

    return (
        <div className="ty-wrapper">
            <div className="ty-card">
                <div className="ty-icon-wrap">
                    <CheckCircle className="ty-icon" />
                </div>
                <h1 className="ty-title">Order placed!</h1>
                <p className="ty-message">
                    Your order has been successfully placed. A confirmation email will be sent shortly.
                </p>
                <button className="ty-btn" onClick={() => navigate("/getmobile")}>
                    Continue Shopping
                </button>
            </div>
        </div>
    );
}