import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';  // Import the useNavigate hook
import './css/Thankyou.css';

export default function ThankYou() {
  const navigate = useNavigate();  // Initialize the navigate function

  const handleContinueShopping = () => {
    navigate('/getmobile');  // Navigate to the /getmobile route
  };

  return (
    <div className="thank-you-container">
      <div className="thank-you-card">
        <CheckCircle className="icon" />
        <h1 className="thank-you-title">Thank You for Your Purchase!</h1>
        <p className="thank-you-message">Your order has been successfully placed. You will receive a confirmation email shortly.</p>
        <button
          className="thank-you-button"
          onClick={handleContinueShopping}  // Use the handleContinueShopping function
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
