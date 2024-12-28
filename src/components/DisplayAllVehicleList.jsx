import React, { useEffect, useState } from "react";
// jQuery
import "jquery/dist/jquery.min.js";
// DataTable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/dataTables.dataTables.min.css";

import $ from "jquery";
import vehicleService from "../services/vehicleService";
import { toast } from "react-toastify";

const DisplayAllVehicleList = () => {
    const [vehicleData, setVehicleData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await vehicleService.getAllVehicleList();
                setVehicleData(response.data);
            } catch (error) {
                toast.error("Error fetching vehicle data:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        // Destroy any existing DataTable instance before reinitializing
        if ($.fn.DataTable.isDataTable("#vehicleTable")) {
            $("#vehicleTable").DataTable().destroy();
        }

        // Initialize DataTable once the data is set
        if (vehicleData.length > 0) {
            $("#vehicleTable").DataTable({
                scrollY: "430px", // Set the vertical height
                scrollX: true,   // Enable horizontal scrolling
                paging: true,    // Enable pagination
            });
        }
    }, [vehicleData]);

    const calculateDuration = (inTime, outTime) => {
        if (!outTime) return "N/A";

        const durationMs = new Date(outTime) - new Date(inTime);
        const seconds = Math.floor((durationMs / 1000) % 60);
        const minutes = Math.floor((durationMs / (1000 * 60)) % 60);
        const hours = Math.floor(durationMs / (1000 * 60 * 60));

        return `${hours}h ${minutes}m ${seconds}s`;
    };

    return (
        <div className="container mt-2">
            <h2 className="text-center" style={{ color: "#4CAF50" }}>
                All Vehicles
            </h2>
            <table
                id="vehicleTable"
                className="display"
                style={{ width: "100%" }}
            >
                <thead
                    className="table-header"
                    style={{
                        borderBottom: "",
                        backgroundColor: "#c2c4c4", // Light gray background color
                        color: "#000", // Optional: Set text color for contrast
                    }}
                >
                    <tr>
                        <th style={{ fontWeight: "bold", color: "#333" }}>Parking ID</th>
                        <th style={{ fontWeight: "bold", color: "#333" }}>Owner</th>
                        <th style={{ fontWeight: "bold", color: "#333" }}>Vehicle Number</th>
                        <th style={{ fontWeight: "bold", color: "#333" }}>Type</th>
                        <th style={{ fontWeight: "bold", color: "#333" }}>Slot Code</th>
                        <th style={{ fontWeight: "bold", color: "#333" }}>Entry</th>
                        <th style={{ fontWeight: "bold", color: "#333" }}>Exit</th>
                        <th style={{ fontWeight: "bold", color: "#333" }}>Status</th>
                        <th style={{ fontWeight: "bold", color: "#333" }}>Duration</th>
                    </tr>
                </thead>
                <tbody>
                    {vehicleData.map((vehicle) => (
                        <tr key={vehicle.parkingRegId}>
                            <td>{vehicle.parkingRegId}</td>
                            <td>{vehicle.vehicleOwner}</td>
                            <td>{vehicle.vehicleNumber}</td>
                            <td>{vehicle.vehicleTypes}</td>
                            <td>{vehicle.slotNumber}</td>
                            <td>{new Date(vehicle.vehicleIn).toLocaleString()}</td>
                            <td>{vehicle.vehicleOut ? new Date(vehicle.vehicleOut).toLocaleString() : "N/A"}</td>
                            <td>{vehicle.slotStatus}</td>
                            <td>{calculateDuration(vehicle.vehicleIn, vehicle.vehicleOut)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DisplayAllVehicleList;
