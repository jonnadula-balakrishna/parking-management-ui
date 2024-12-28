import React, { useEffect, useState } from 'react';
import vehicleService from '../services/vehicleService';

const Dashboard = () => {
    const [slots, setSlots] = useState([]);

    useEffect(() => {
        vehicleService.getAllAvailbleSlots().then((res) => setSlots(res.data));
    }, []);

    const getPrefixByVehicleType = (type) => {
        switch (type.toUpperCase()) {
            case 'CAR':
                return 'A';
            case 'BUS':
                return 'B';
            case 'TRUCK':
                return 'D';
            case 'BIKE':
                return 'C';
            default:
                return '';
        }
    };

    const generateSlots = (vehicleType, totalSlots, availableSlotCodes) => {
        const prefix = getPrefixByVehicleType(vehicleType);
        const allSlots = [];
        for (let i = 1; i <= totalSlots; i++) {
            const slotCode = `${prefix}${i}`;
            const isAvailable = availableSlotCodes.includes(slotCode);

            allSlots.push({
                code: slotCode,
                isAvailable: isAvailable,
            });
        }
        return allSlots;
    };

    return (
        <div
            style={{
                padding: "20px",
                fontFamily: "Arial, sans-serif",
                backgroundImage: 'url("E:\React\parking-lot\src\images.jpg")', // Add your background image URL here
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",  // Optional: Keeps background fixed when scrolling
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

                    return (
                        <div
                            key={index}
                            style={{
                                border: "1px solid #ddd",
                                borderRadius: "8px",
                                padding: "20px",
                                boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
                                backgroundColor: "#ffffff", // Add a background color for card-like appearance
                                opacity: 0.9,  // Optional: Adjust opacity for overlay effect
                            }}
                        >
                            <h2 style={{ color: "rgba(203, 156, 15, 0.77)" }}>{slot.typeOfVehicle}</h2>
                            <p>
                                Slots: {slot.availableSlots} / {slot.totalSlots}
                            </p>
                            <div
                                style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: "10px",
                                    marginTop: "10px",
                                }}
                            >
                                {allSlots.map(({ code, isAvailable }) => (
                                    <span
                                        key={code}
                                        style={{
                                            backgroundColor: isAvailable ? "#d4edda" : "#f8d7da",
                                            borderRadius: "4px",
                                            padding: "5px 10px",
                                            fontSize: "14px",
                                            color: isAvailable ? "#155724" : "#721c24",
                                            border: `1px solid ${isAvailable ? "#c3e6cb" : "#f5c6cb"}`,
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
        </div>
    );
};

export default Dashboard;
