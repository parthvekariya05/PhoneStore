import { Link } from 'react-router-dom';
import { useAuth } from "../store/auth";

const About = () => {
    const { isLoggedIn } = useAuth();
    return (
        <section className="py-5 bg-white">
            <div className="container bg-light p-4 rounded shadow">
                <div className="row align-items-center">
                    <div className="col-lg-12">
                        <h2>Welcome to Online Mobile Shop</h2>
                        <p>
                            At Online Mobile Shop, we bring you the latest and greatest mobile devices from leading
                            brands. With a commitment to quality, affordability, and customer satisfaction, our
                            platform is your one-stop destination for all things mobile.
                        </p>
                        <p>
                            Our journey began with a passion for technology and a desire to make premium mobile
                            devices accessible to everyone. Today, we are proud to serve thousands of customers
                            nationwide, offering a seamless shopping experience and exceptional support.
                        </p>
                        <p>
                            We believe in empowering our customers with the best options, competitive prices, and reliable services.
                            From flagship smartphones to budget-friendly devices, our carefully curated selection ensures there's
                            something for everyone.
                        </p>
                        {isLoggedIn
                            ? <Link to="/getmobile" className="btn btn-primary mt-3">Explore Our Products</Link>
                            : <Link to="/login" className="btn btn-primary btn-lg">Please Login</Link>}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;
