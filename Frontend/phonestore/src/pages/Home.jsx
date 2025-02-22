import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./css/Home.css";
import { useAuth } from "../store/auth";

const Home = () => {
  const { isLoggedIn } = useAuth();
  const [user, setUser] = useState({});
  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData && storedUserData !== "undefined") {
      try {
        const parsedUserData = JSON.parse(storedUserData);
        setUser(parsedUserData);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  return (
    <section className="home-hero-section text-center" id="home">
      <div>
        {isLoggedIn && <h4 className="home-highlight-name">Hello, {user.userName}</h4>}
        <h1 className="display-4 fw-bold">Welcome to the Mobile Shop</h1>

        <p className="lead">All latest smartphones at unbeatable prices. Shop now and experience the best deals!</p>
        {isLoggedIn
          ? <Link to="/getmobile" className="btn home-btn btn-primary btn-lg">Go to Shop</Link>
          : <Link to="/login" className="btn home-btn btn-primary btn-lg">Please Login</Link>
        }
      </div>
    </section>

  )
};
export default Home;
