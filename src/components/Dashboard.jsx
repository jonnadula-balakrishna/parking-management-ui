import React, { useEffect, useState } from 'react';
import vehicleService from '../services/vehicleService';
import { toast } from 'react-toastify';
import "../styles/Dashboard.css";

const Dashboard = () => {
    const [slots, setSlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        vehicleService.getAllAvailbleSlots().then((res) => {
            setSlots(res.data);
            setLoading(false);
        });
    }, []);

    const getPrefixByVehicleType = (type) => {
        switch (type.toUpperCase()) {
            case 'CAR':
                return 'A';
            case 'BUS':
                return 'B';
            case 'BIKE':
                return 'C';
            case 'TRUCK':
                return 'D';
            default:
                return '';
        }
    };

    const getImageByVehicleType = (type) => {
        switch (type.toUpperCase()) {
            case 'CAR':
                return "https://img.icons8.com/plasticine/100/car--v1.png";
            case 'BUS':
                return "https://img.icons8.com/fluency/100/bus.png";
            case 'TRUCK':
                return "https://img.icons8.com/color/100/semi-truck-side-view.png";
            case 'BIKE':
                return "https://img.icons8.com/arcade/100/scooter.png";
            default:
                return null;
        }
    };

    const generateSlots = (vehicleType, totalSlots, availableSlotCodes) => {
        const prefix = getPrefixByVehicleType(vehicleType);
        return Array.from({ length: totalSlots }, (_, i) => ({
            code: `${prefix}${i + 1}`,
            isAvailable: availableSlotCodes.includes(`${prefix}${i + 1}`),
        }));
    };

    const handleDialogBox = (code) => {
        vehicleService.getVehicleInfoBySlotCode(code)
            .then((res) => {
                if (res.data == null) {
                    toast.info("Slot information not available!");
                } else {
                    setSelectedSlot(res.data);
                }
            })
            .catch((error) => {
                toast.error('Failed to fetch slot details!');
            });
    };

    const closeModal = () => setSelectedSlot(null);

    if (loading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <div className="loader"></div>
            </div>
        );
    }

    return (
        <div
            style={{
                padding: "20px",
                fontFamily: "Arial, sans-serif",
                backgroundImage: 'url("E:\\React\\parking-lot\\src\\images.jpg")',
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
            }}
        >
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                    gap: "20px",
                }}
            >
                {slots.map((slot, index) => {
                    const allSlots = generateSlots(slot.typeOfVehicle, slot.totalSlots, slot.availableSlotCodes);
                    const vehicleImage = getImageByVehicleType(slot.typeOfVehicle);

                    return (
                        <div
                            key={index}
                            style={{
                                border: "1px solid #ddd",
                                borderRadius: "8px",
                                padding: "20px",
                                backgroundColor: "#ffffff",
                                boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                            }}
                        >
                            <h2 style={{ color: "rgba(203, 156, 15, 0.77)" }}>
                                {vehicleImage && (
                                    <img
                                        src={vehicleImage}
                                        alt={`${slot.typeOfVehicle} icon`}
                                        style={{
                                            width: "50px",
                                            height: "50px",
                                            margin: "0 auto 10px",
                                        }}
                                    />
                                )}
                                &nbsp;{slot.typeOfVehicle}
                            </h2>
                            <p>Slots: {slot.availableSlots} / {slot.totalSlots}</p>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                                {allSlots.map(({ code, isAvailable }) => (
                                    <span
                                        key={code}
                                        onClick={() => handleDialogBox(code)}
                                        style={{
                                            backgroundColor: isAvailable ? "#d4edda" : "#f8d7da",
                                            borderRadius: "4px",
                                            padding: "5px 10px",
                                            fontSize: "14px",
                                            color: isAvailable ? "#155724" : "#721c24",
                                            border: `1px solid ${isAvailable ? "#c3e6cb" : "#f5c6cb"}`,
                                            cursor: "pointer",
                                        }}
                                    >
                                        {code}
                                    </span>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            {selectedSlot && (
                <>
                    <div
                        onClick={closeModal}
                        style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            backgroundColor: "rgba(0, 0, 0, 0.6)",
                            zIndex: 999,
                            cursor: "pointer",
                        }}
                    />

                    <div
                        style={{
                            position: "fixed",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            backgroundColor: "#f9f9f9",
                            padding: "30px",
                            borderRadius: "12px",
                            boxShadow: "0px 8px 16px rgba(0,0,0,0.2)",
                            zIndex: 1000,
                            maxWidth: "500px",
                            width: "90%",
                            fontFamily: "'Arial', sans-serif",
                            textAlign: "center",
                        }}
                    >
                        <h3 style={{ marginBottom: "20px", fontSize: "24px", color: "#333" }}>
                            Slot Details
                        </h3>
                        <div style={{ textAlign: "left", marginBottom: "20px" }}>
                            <p><strong>Parking ID:</strong> {selectedSlot.parkingRegId}</p>
                            <p><strong>Owner:</strong> {selectedSlot.vehicleOwner}</p>
                            <p><strong>Vehicle Number:</strong> {selectedSlot.vehicleNumber}</p>
                            <p><strong>Vehicle Type:</strong> {selectedSlot.vehicleTypes}</p>
                            <p><strong>Slot Number:</strong> {selectedSlot.slotNumber}</p>
                            <p><strong>Vehicle In:</strong> {new Date(selectedSlot.vehicleIn).toLocaleString()}</p>
                            <p><strong>Vehicle Out:</strong> {selectedSlot.vehicleOut ? new Date(selectedSlot.vehicleOut).toLocaleString() : "Not Yet"}</p>
                            <p><strong>Slot Status:</strong> {selectedSlot.slotStatus}</p>
                        </div>
                        <button
                            onClick={closeModal}
                            style={{
                                padding: "12px 20px",
                                borderRadius: "6px",
                                backgroundColor: "#007bff",
                                color: "#fff",
                                border: "none",
                                fontSize: "16px",
                                cursor: "pointer",
                                transition: "all 0.3s ease",
                            }}
                            onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
                            onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
                        >
                            Close
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Dashboard;
