import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "./css/Bill.css"; 
const Bill = () => {
    const [phoneDetails, setPhoneDetails] = useState({});
    const [phoneAddress, setPhoneAddress] = useState({});
    const [payment, setPayment] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [logedInUser] = useState(JSON.parse(localStorage.getItem("userData")));

    useEffect(() => {
        const storedPhone = JSON.parse(localStorage.getItem("phoneDetails"));
        const storedAddress = JSON.parse(localStorage.getItem("phoneAddress"));
        if (storedPhone) setPhoneDetails(storedPhone);
        if (storedAddress) setPhoneAddress(storedAddress);
    }, []);

    const fullAddress = `${phoneAddress.Address || ""}, ${phoneAddress.City || ""}, ${phoneAddress.State || ""}, ${phoneAddress.Country || ""}, ${phoneAddress.Pincode || ""}`;

   const handlePrintAndDownload = async () => {
    setLoading(true);
    const billData = {
        UserID: logedInUser.userID,
        Address: fullAddress,
        phoneID: phoneDetails.phoneID,
        payment,
    };

    try {
        const response = await fetch("https://localhost:44390/api/Bill/InsertBill", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(billData),
        });

        if (response.ok) {
            toast.success("Order placed successfully!");

            const doc = new jsPDF();
            const pageW = doc.internal.pageSize.getWidth();
            const purple = [106, 90, 224];
            const darkText = [16, 24, 40];
            const mutedText = [102, 112, 133];
            const borderColor = [234, 236, 240];

            // ── Header bar ───────────────────────────────────────
            doc.setFillColor(...purple);
            doc.rect(0, 0, pageW, 28, "F");

            doc.setTextColor(255, 255, 255);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(18);
            doc.text("INVOICE", 14, 18);

            doc.setFont("helvetica", "normal");
            doc.setFontSize(9);
            const now = new Date();
            doc.text(`Date: ${now.toLocaleDateString("en-IN")}`, pageW - 14, 12, { align: "right" });
            doc.text(`Order ID: ORD-${Date.now().toString().slice(-6)}`, pageW - 14, 18, { align: "right" });

            // ── Customer details box ─────────────────────────────
            doc.setFillColor(249, 250, 251);
            doc.roundedRect(14, 35, pageW - 28, 36, 3, 3, "F");
            doc.setDrawColor(...borderColor);
            doc.setLineWidth(0.3);
            doc.roundedRect(14, 35, pageW - 28, 36, 3, 3, "S");

            doc.setFont("helvetica", "bold");
            doc.setFontSize(9);
            doc.setTextColor(...mutedText);
            doc.text("CUSTOMER DETAILS", 20, 43);

            doc.setFont("helvetica", "bold");
            doc.setFontSize(11);
            doc.setTextColor(...darkText);
            doc.text(logedInUser.userName, 20, 51);

            doc.setFont("helvetica", "normal");
            doc.setFontSize(9);
            doc.setTextColor(...mutedText);
            const addressLines = doc.splitTextToSize(fullAddress, pageW - 44);
            doc.text(addressLines, 20, 58);

            // ── Order items table ────────────────────────────────
            autoTable(doc, {
                startY: 80,
                head: [["Item", "Details"]],
                body: [
                    ["Mobile Name", phoneDetails.phoneName || "—"],
                    ["Storage", phoneDetails.phone_Storage || "—"],
                    ["Payment Method", payment],
                ],
                theme: "plain",
                styles: {
                    fontSize: 10,
                    cellPadding: { top: 8, bottom: 8, left: 12, right: 12 },
                    textColor: darkText,
                    lineColor: borderColor,
                    lineWidth: 0.3,
                },
                headStyles: {
                    fillColor: purple,
                    textColor: [255, 255, 255],
                    fontStyle: "bold",
                    fontSize: 9,
                    cellPadding: { top: 7, bottom: 7, left: 12, right: 12 },
                },
                alternateRowStyles: {
                    fillColor: [249, 250, 251],
                },
                columnStyles: {
                    0: { cellWidth: 60, textColor: mutedText },
                    1: { fontStyle: "bold" },
                },
                tableLineColor: borderColor,
                tableLineWidth: 0.3,
                margin: { left: 14, right: 14 },
            });

            // ── Price total row ──────────────────────────────────
            const finalY = doc.lastAutoTable.finalY;
            doc.setFillColor(...purple);
            doc.rect(14, finalY, pageW - 28, 14, "F");
            doc.setFont("helvetica", "bold");
            doc.setFontSize(11);
            doc.setTextColor(255, 255, 255);
            doc.text("Total Amount", 20, finalY + 9.5);
            doc.text(
                `₹${Number(phoneDetails.price).toLocaleString("en-IN")}`,
                pageW - 20,
                finalY + 9.5,
                { align: "right" }
            );

            // ── Footer ───────────────────────────────────────────
            const pageH = doc.internal.pageSize.getHeight();
            doc.setFillColor(249, 250, 251);
            doc.rect(0, pageH - 20, pageW, 20, "F");
            doc.setFont("helvetica", "normal");
            doc.setFontSize(9);
            doc.setTextColor(...mutedText);
            doc.text("Thank you for shopping with us!", pageW / 2, pageH - 8, { align: "center" });

            doc.save("invoice.pdf");
            setTimeout(() => navigate("/getmobile"), 2000);
        } else {
            toast.error("Error placing the order");
        }
    } catch (error) {
        toast.error("Error placing the order");
        console.error(error);
    } finally {
        setLoading(false);
    }
};

    return (
        <div className="bill-wrapper">
            <div className="bill-card">
                <div className="bill-header">
                    <h2 className="bill-title">Order Summary</h2>
                    <p className="bill-subtitle">Review your details before placing the order</p>
                </div>

                <div className="bill-body">
                    <div className="bill-grid">
                        <div className="bill-field">
                            <span className="bill-label">Mobile name</span>
                            <span className="bill-value">{phoneDetails.phoneName || "—"}</span>
                        </div>
                        <div className="bill-field">
                            <span className="bill-label">Storage</span>
                            <span className="bill-value">{phoneDetails.phone_Storage || "—"}</span>
                        </div>
                        <div className="bill-field">
                            <span className="bill-label">Price</span>
                            <span className="bill-value bill-price">
                                ₹{phoneDetails.price ? Number(phoneDetails.price).toLocaleString("en-IN") : "—"}
                            </span>
                        </div>
                        <div className="bill-field">
                            <span className="bill-label">Delivery address</span>
                            <span className="bill-value">{fullAddress}</span>
                        </div>
                    </div>

                    <div className="bill-divider"></div>

                    <div className="bill-payment-wrap">
                        <label className="bill-label" htmlFor="payment">Payment method</label>
                        <select
                            id="payment"
                            className="bill-select"
                            value={payment}
                            onChange={(e) => setPayment(e.target.value)}
                        >
                            <option value="">Select payment method</option>
                            <option value="Cash">Cash on Delivery</option>
                            <option value="UPI">UPI</option>
                        </select>
                    </div>
                </div>

                <div className="bill-footer">
                    <button
                        className="bill-btn"
                        onClick={handlePrintAndDownload}
                        disabled={!payment || loading}
                    >
                        {loading ? "Placing order..." : "Place Order & Download Invoice"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Bill;