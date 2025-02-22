// import { useLocation, Link } from "react-router-dom";
// import { 
//     BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, 
//     PieChart, Pie, Cell, 
//     LineChart, Line, 
//     RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
// } from "recharts";
// import "./css/Graph.css";

// const Graph = () => {
//     const location = useLocation();
//     const counts = location.state?.counts || { PhoneCount: 0, UserCount: 0, BillCount: 0, ContactCount: 0 };

//     const chartData = [
//         { name: "Products", total: counts.PhoneCount },
//         { name: "Users", total: counts.UserCount },
//         { name: "Orders", total: counts.BillCount },
//         { name: "Contacts", total: counts.ContactCount }
//     ];

//     const COLORS = ["#007bff", "#28a745", "#ffc107", "#dc3545"];

//     return (
//         <div className="graph-container">            
//             <Link className="btn btn-dark" to="/admin">Back</Link>
//             <h3 className="graph-title">Dashboard Overview</h3>

//             <div className="chart-wrapper">
//                 <h4 className="chart-heading">Total Counts</h4>
//                 <ResponsiveContainer width="100%" height={300}>
//                     <BarChart data={chartData}>
//                         <XAxis dataKey="name" />
//                         <YAxis />
//                         <Tooltip cursor={{ fill: "rgba(0,0,0,0.1)" }} />
//                         <Legend />
//                         <Bar dataKey="total" fill="#007bff" barSize={50} radius={[10, 10, 0, 0]} />
//                     </BarChart>
//                 </ResponsiveContainer>
//             </div>

//             <div className="chart-wrapper">
//                 <h4 className="chart-heading">Data Distribution</h4>
//                 <ResponsiveContainer width="100%" height={300}>
//                     <PieChart>
//                         <Pie data={chartData} dataKey="total" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
//                             {chartData.map((entry, index) => (
//                                 <Cell key={`cell-${index}`} fill={COLORS[index]} />
//                             ))}
//                         </Pie>
//                         <Tooltip />
//                         <Legend />
//                     </PieChart>
//                 </ResponsiveContainer>
//             </div>

//             <div className="chart-wrapper">
//                 <h4 className="chart-heading">Trend Over Time</h4>
//                 <ResponsiveContainer width="100%" height={300}>
//                     <LineChart data={chartData}>
//                         <XAxis dataKey="name" />
//                         <YAxis />
//                         <Tooltip />
//                         <Legend />
//                         <Line type="monotone" dataKey="total" stroke="#28a745" strokeWidth={3} />
//                     </LineChart>
//                 </ResponsiveContainer>
//             </div>

//             <div className="chart-wrapper">
//                 <h4 className="chart-heading">Radar View</h4>
//                 <ResponsiveContainer width="100%" height={300}>
//                     <RadarChart data={chartData} outerRadius={90}>
//                         <PolarGrid />
//                         <PolarAngleAxis dataKey="name" />
//                         <PolarRadiusAxis />
//                         <Radar dataKey="total" stroke="#ffc107" fill="#ffc107" fillOpacity={0.6} />
//                         <Tooltip />
//                     </RadarChart>
//                 </ResponsiveContainer>
//             </div>
//         </div>
//     );
// };

// export default Graph;

import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell,
    LineChart, Line,
    RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from "recharts";
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

    const COLORS = ["#007bff", "#28a745", "#ffc107", "#dc3545"];
    const [currentChart, setCurrentChart] = useState(0);

    const charts = [
        {
            title: "Total Counts",
            component: (
                <BarChart data={chartData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip cursor={{ fill: "rgba(0,0,0,0.1)" }} />
                    <Legend />
                    <Bar dataKey="total" fill="#007bff" barSize={50} radius={[10, 10, 0, 0]} />
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
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="total" stroke="#28a745" strokeWidth={3} />
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
                    <Radar dataKey="total" stroke="#ffc107" fill="#ffc107" fillOpacity={0.6} />
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
            <Link className="btn btn-dark" to="/admin">back</Link>
            <h3 className="graph-title">Dashboard Overview</h3>

            <div className="graph-chart-navigation">
                <div className="row d-flex justify-content-between mb-2" >

                    <button className="btn btn-primary col-1 " onClick={handlePrev}>&larr;</button>
                    <button className="btn btn-primary col-1 ms-3 " onClick={handleNext}>&rarr;</button>
                </div>
                <div className="chart-wrapper">
                    <h4 className="chart-heading">{charts[currentChart].title}</h4>
                    <ResponsiveContainer width="100%" height={300}>
                        {charts[currentChart].component}
                    </ResponsiveContainer>
                </div>

            </div>
        </div>
    );
};

export default Graph;
