import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const Bill = () => {
    const [phoneDetails, setPhoneDetails] = useState({});
    const [phoneAddress, setPhoneAddress] = useState({});
    const [payment, setPayment] = useState("");
    const navigate = useNavigate();
    const [logedInUser] = useState(JSON.parse(localStorage.getItem("userData")));    
    useEffect(() => {
        const storedPhone = JSON.parse(localStorage.getItem("phoneDetails"));
        const storedAddress = JSON.parse(localStorage.getItem("phoneAddress"));

        if (storedPhone) setPhoneDetails(storedPhone);
        if (storedAddress) setPhoneAddress(storedAddress);
    }, []);

    const handlePrintAndDownload = async () => {
        const billData = {
            UserID: logedInUser.userID,
            Address: `${phoneAddress.Address}, ${phoneAddress.City}, ${phoneAddress.State}, ${phoneAddress.Country}, ${phoneAddress.Pincode}`,
            phoneID: phoneDetails.phoneID,
            payment: payment,
        };

        try {
            const response = await fetch("https://localhost:44390/api/Bill/InsertBill", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(billData),
            });

            if (response.ok) {
                toast.success("Your order placed successfully");
                setTimeout(() => navigate("/getmobile"), 2000);

                // Generate PDF
                const doc = new jsPDF();
                
                // Title
                doc.setFont("helvetica", "bold");
                doc.setFontSize(20);
                doc.text("Invoice", 90, 15);

                // Section: Customer Details
                doc.setFontSize(12);
                doc.setFont("helvetica", "bold");
                doc.text("Customer Details", 10, 30);
                doc.setFont("helvetica", "normal");
                doc.text(`Name: ${logedInUser.userName}`, 10, 38);
                doc.text(`Address: ${phoneAddress.Address}, ${phoneAddress.City}, ${phoneAddress.State}, ${phoneAddress.Country}, ${phoneAddress.Pincode}`, 10, 46);
                
                // Table: Product Details
                autoTable(doc, {
                    startY: 55,
                    head: [["Item", "Details"]],
                    body: [
                        ["Mobile Name", phoneDetails.phoneName],
                        ["Storage", phoneDetails.phone_Storage],
                        ["Price", `₹${phoneDetails.price}`],
                        ["Payment Method", payment],
                    ],
                    theme: "grid",
                    styles: { fontSize: 11 },
                    headStyles: { fillColor: [41, 128, 185] }, // Blue header
                });

                // Footer
                doc.setFont("helvetica", "bold");
                doc.text("Thank you for shopping with us!", 70, doc.internal.pageSize.height - 20);

                // Save and Download PDF
                doc.save("invoice.pdf");
            } else {
                toast.error("Error placing the order");
            }
        } catch (error) {
            toast.error("Error placing the order");
            console.error("Error posting the bill data:", error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow-sm">
                <div className="card-header bg-primary text-white text-center">
                    <h2>User Bill</h2>
                </div>
                <div className="card-body" id="bill-content">
                    <div className="row mb-3">
                        <div className="col-sm-6">
                            <h5 className="text-muted"><strong>Mobile Name:</strong></h5>
                            <p className="text-dark">{phoneDetails.phoneName}</p>
                        </div>
                        <div className="col-sm-6">
                            <h5 className="text-muted"><strong>Storage:</strong></h5>
                            <p className="text-dark">{phoneDetails.phone_Storage}</p>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-sm-6">
                            <h5 className="text-muted"><strong>Address:</strong></h5>
                            <p className="text-dark">{`${phoneAddress.Address}, ${phoneAddress.City}, ${phoneAddress.State}, ${phoneAddress.Country}, ${phoneAddress.Pincode}`}</p>
                        </div>
                        <div className="col-sm-6">
                            <h5 className="text-muted"><strong>Price:</strong></h5>
                            <p className="text-dark">₹{phoneDetails.price}</p>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-sm-6">
                            <h5 className="text-muted"><strong>Payment Method:</strong></h5>
                            <select 
                                className="form-control" 
                                value={payment} 
                                onChange={(e) => setPayment(e.target.value)}
                            >
                                <option value="">Select Payment Method</option>
                                <option value="Cash">Cash</option>
                                <option value="UPI">UPI</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="card-footer text-center">
                    <button 
                        type="button" 
                        className="btn btn-primary" 
                        onClick={handlePrintAndDownload}
                        disabled={!payment}
                    >
                        Print & Download Bill
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Bill;
