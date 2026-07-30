import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell,
    LineChart, Line,
    RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from "recharts";
import { FaArrowLeft, FaChartLine, FaChevronLeft, FaChevronRight, FaMobileAlt, FaUsers, FaFileInvoiceDollar, FaAddressBook } from "react-icons/fa";
import "./css/Graph.css";

const Graph = () => {
    const location = useLocation();
    const counts = location.state?.counts || { PhoneCount: 0, UserCount: 0, BillCount: 0, ContactCount: 0 };

    const chartData = [
        { name: "Products", total: counts.PhoneCount },
        { name: "Users", total: counts.UserCount },
        { name: "Orders", total: counts.BillCount },
        { name: "Contacts", total: counts.ContactCount }
    ];

    const COLORS = ["#7b2ff7", "#a855f7", "#ffb020", "#e94560"];
    const [currentChart, setCurrentChart] = useState(0);

    const statCards = [
        { label: "Products", value: counts.PhoneCount, icon: <FaMobileAlt /> },
        { label: "Users", value: counts.UserCount, icon: <FaUsers /> },
        { label: "Orders", value: counts.BillCount, icon: <FaFileInvoiceDollar /> },
        { label: "Contacts", value: counts.ContactCount, icon: <FaAddressBook /> },
    ];

    const charts = [
        {
            title: "Total Counts",
            component: (
                <BarChart data={chartData}>
                    <XAxis dataKey="name" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip cursor={{ fill: "rgba(123, 47, 247, 0.06)" }} />
                    <Legend />
                    <Bar dataKey="total" fill="#7b2ff7" barSize={50} radius={[10, 10, 0, 0]} />
                </BarChart>
            ),
        },
        {
            title: "Data Distribution",
            component: (
                <PieChart>
                    <Pie data={chartData} dataKey="total" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            ),
        },
        {
            title: "Trend Over Time",
            component: (
                <LineChart data={chartData}>
                    <XAxis dataKey="name" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="total" stroke="#7b2ff7" strokeWidth={3} dot={{ r: 5 }} />
                </LineChart>
            ),
        },
        {
            title: "Radar View",
            component: (
                <RadarChart data={chartData} outerRadius={90}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="name" />
                    <PolarRadiusAxis />
                    <Radar dataKey="total" stroke="#a855f7" fill="#a855f7" fillOpacity={0.5} />
                    <Tooltip />
                </RadarChart>
            ),
        },
    ];

    const handleNext = () => {
        setCurrentChart((prev) => (prev + 1) % charts.length);
    };

    const handlePrev = () => {
        setCurrentChart((prev) => (prev - 1 + charts.length) % charts.length);
    };

    return (
        <div className="graph-container">
            <div className="graph-header">
                <Link className="btn graph-back-btn" to="/admin">
                    <FaArrowLeft /> Back
                </Link>
                <h3 className="graph-title">
                    <FaChartLine className="graph-title-icon" /> Dashboard Overview
                </h3>
                <div style={{ width: "90px" }}></div>
            </div>

            <div className="graph-stats-row">
                {statCards.map((card, i) => (
                    <div className="graph-stat-card" key={card.label}>
                        <div className="graph-stat-icon" style={{ background: COLORS[i] }}>
                            {card.icon}
                        </div>
                        <div>
                            <p className="graph-stat-value">{card.value}</p>
                            <p className="graph-stat-label">{card.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="chart-wrapper">
                <div className="chart-nav-header">
                    <button className="chart-nav-btn" onClick={handlePrev} aria-label="Previous chart">
                        <FaChevronLeft />
                    </button>
                    <h4 className="chart-heading">{charts[currentChart].title}</h4>
                    <button className="chart-nav-btn" onClick={handleNext} aria-label="Next chart">
                        <FaChevronRight />
                    </button>
                </div>

                <ResponsiveContainer width="100%" height={300}>
                    {charts[currentChart].component}
                </ResponsiveContainer>

                <div className="chart-dots">
                    {charts.map((chart, i) => (
                        <button
                            key={chart.title}
                            className={`chart-dot ${i === currentChart ? "active" : ""}`}
                            onClick={() => setCurrentChart(i)}
                            aria-label={`Show ${chart.title}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Graph;