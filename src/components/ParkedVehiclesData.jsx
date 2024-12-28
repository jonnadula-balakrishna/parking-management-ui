import React, { useEffect, useState } from "react";
import vehicleService from "../services/vehicleService";
import { toast } from "react-toastify";

const ParkedVehiclesData = () => {
    const [parkedVehiclesData, setParkedVehiclesData] = useState([]);
    const [selectedType, setSelectedType] = useState("");
    const [filteredVehicles, setFilteredVehicles] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null);

    useEffect(() => {
        vehicleService.getParkedVehicleVehiclesList().then((res) => {
            setParkedVehiclesData(res.data);
            setFilteredVehicles(res.data);
        });
    }, []);

    const vehicleTypes = [...new Set(parkedVehiclesData.map((vehicle) => vehicle.vehicleTypes))];

    const handleTypeChange = (event) => {
        const type = event.target.value;
        setSelectedType(type);
        if (type) {
            setFilteredVehicles(parkedVehiclesData.filter((vehicle) => vehicle.vehicleTypes === type));
        } else {
            setFilteredVehicles(parkedVehiclesData);
        }
    };

    const handleUnParkClick = (slotNumber) => {
        setSelectedSlot(slotNumber);
        setShowModal(true);
    };

    const confirmUnPark = () => {
        vehicleService
            .unParkVehicle(selectedSlot)
            .then((res) => {
                toast.success(res.data);
                setFilteredVehicles(filteredVehicles.filter((vehicle) => vehicle.slotNumber !== selectedSlot));
            })
            .catch((err) => toast.error(err))
            .finally(() => setShowModal(false));
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedSlot(null);
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h2 style={{ textAlign: "center", color: "#199442" }}>Parked Vehicles List</h2>
            <div style={{ marginBottom: "20px", display: "flex", justifyContent: "right" }}>
                <select
                    value={selectedType}
                    onChange={handleTypeChange}
                    style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ddd" }}
                >
                    <option value="">Select Vehicle Type</option>
                    {vehicleTypes.map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
            </div>
            <div
                style={{
                    width: "100%",
                    maxHeight: "400px", // Set max height for the table container
                    overflowY: "auto", // Enable vertical scrolling
                    border: "1px solid #ddd", // Optional border for visual clarity
                    borderRadius: "4px",
                }}
            >
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={{ backgroundColor: "#f2f2f2" }}>
                            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Owner</th>
                            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Vehicle Number</th>
                            <th style={{ border: "1px solid #ddd", padding: "5px" }}>Vehicle Type</th>
                            <th style={{ border: "1px solid #ddd", padding: "2px" }}>Slot Number</th>
                            <th style={{ border: "1px solid #ddd", padding: "8px" }}>In Time</th>
                            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Vehicle Status</th>
                            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredVehicles.map((vehicle) => (
                            <tr key={vehicle.parkingRegId}>
                                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{vehicle.vehicleOwner}</td>
                                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{vehicle.vehicleNumber}</td>
                                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{vehicle.vehicleTypes}</td>
                                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{vehicle.slotNumber}</td>
                                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{new Date(vehicle.vehicleIn).toLocaleString()}</td>
                                <td style={{ border: "1px solid #ddd", padding: "8px", color: "#0bdb70" }}>{vehicle.slotStatus}</td>
                                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                                    <button
                                        className="btn btn-danger"
                                        style={{
                                            transition: "background-color 0.3s ease",
                                        }}
                                        onMouseEnter={(e) => {
                                            e.target.style.backgroundColor = "#12798a";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.backgroundColor = "";
                                        }}
                                        onClick={() => handleUnParkClick(vehicle.slotNumber)}
                                    >
                                        Unpark
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {showModal && (
                <div
                    style={{
                        position: "fixed",
                        top: "0",
                        left: "0",
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0,0,0,0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <div
                        style={{
                            backgroundColor: "#fff",
                            padding: "20px",
                            borderRadius: "8px",
                            width: "300px",
                            textAlign: "center",
                        }}
                    >
                        <h3>Confirm Unpark</h3>
                        <p>Are you sure you want to unpark this vehicle?</p>
                        <div style={{ marginTop: "20px" }}>
                            <button
                                className="btn btn-primary"
                                onClick={confirmUnPark}
                                style={{ marginRight: "10px" }}
                            >
                                Yes
                            </button>
                            <button className="btn btn-secondary" onClick={closeModal}>
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>

    );
};

export default ParkedVehiclesData;
