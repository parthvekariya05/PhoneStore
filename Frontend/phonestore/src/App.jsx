import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Header from "./component/Header";
import Footer from "./component/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Logout from "./pages/Logout";
import Mobile from "./pages/Mobile";
import MobileID from "./pages/MobileID";
import Address from "./pages/Address";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AddEditMobile from "./pages/Admin/AddEditMobile";
import Bill from "./pages/Bill";
import GetAllMobile from './pages/Admin/GetallMobile';
import GetIDmobile from './pages/Admin/GetIDmobile';
import GetallUser from './pages/Admin/GetallUser';
import GetallContact from './pages/Admin/GetallContact';
import GetallAddress from './pages/Admin/GetallAddress';
import GetallOrder from './pages/Admin/GetallOrder';
import Thankyou from './pages/Thnakyou';
import Graph from './pages/Admin/Graph';
import Billhistory from './pages/Billhistory';
import UserDetail from './pages/UserDetail';
import Brand from './pages/Admin/Brand';
import BrandAddEdit from './pages/Admin/BrandAddEdit';



function App() {


  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/getmobile" element={<Mobile />} />
          <Route path="/getmobile/:id" element={<MobileID />} />
          <Route path="/address" element={<Address />} />
          <Route path="/bill" element={<Bill />} />
          <Route path="/thankyou" element={<Thankyou />} />
          <Route path="/order-history" element={<Billhistory />} />
          <Route path="/user-detail" element={<UserDetail />} />


          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/getallmobile" element={<GetAllMobile />} />
          <Route path="/admin/getallmobile/:id" element={<GetIDmobile />} />
          <Route path="/admin/addphone" element={<AddEditMobile />} />
          <Route path="/admin/addphone/:pid" element={<AddEditMobile />} />
          <Route path="/admin/getalluser" element={<GetallUser />} />
          <Route path="/admin/getallcontact" element={<GetallContact />} />
          <Route path="/admin/getallAddress" element={<GetallAddress />} />
          <Route path='/admin/getallorder' element={<GetallOrder />} />
          <Route path='/admin/graph' element={<Graph />} />
          <Route path="/admin/brand" element={<Brand />} />
          <Route path="/admin/add-brand" element={<BrandAddEdit />} />
          <Route path="/admin/edit-brand/:Phone_BrandID" element={<BrandAddEdit />} />



        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
