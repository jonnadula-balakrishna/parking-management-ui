import React, { useEffect, useState } from "react";
import vehicleService from "../services/vehicleService";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css"; // Importing Bootstrap CSS

const ParkedVehiclesData = () => {
    const [parkedVehiclesData, setParkedVehiclesData] = useState([]);
    const [selectedType, setSelectedType] = useState("");
    const [filteredVehicles, setFilteredVehicles] = useState([]);
    const [searchSlot, setSearchSlot] = useState("");
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
        filterVehicles(type, searchSlot);
    };

    const handleSearchChange = (event) => {
        const slot = event.target.value;
        setSearchSlot(slot);
        filterVehicles(selectedType, slot);
    };

    const filterVehicles = (type, slot) => {
        let filtered = parkedVehiclesData;
        if (type) {
            filtered = filtered.filter((vehicle) => vehicle.vehicleTypes === type);
        }
        if (slot) {
            filtered = filtered.filter((vehicle) => vehicle.slotNumber.toString().includes(slot));
        }
        setFilteredVehicles(filtered);
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

                const updatedParkedVehicles = parkedVehiclesData.filter((vehicle) => vehicle.slotNumber !== selectedSlot);
                setParkedVehiclesData(updatedParkedVehicles);
                setFilteredVehicles(
                    updatedParkedVehicles.filter(
                        (vehicle) =>
                            (vehicle.vehicleTypes === selectedType || selectedType === "") &&
                            (searchSlot === "" || vehicle.slotNumber.toString().includes(searchSlot))
                    )
                );
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
            {/* Filters */}
            <div style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between" }}>
                {/* Search by Slot Number */}
                <input
                    type="text"
                    placeholder="Search by Slot Number"
                    value={searchSlot}
                    onChange={handleSearchChange}
                    className="form-control"
                    style={{ maxWidth: "300px", marginRight: "10px" }}
                />
                {/* Dropdown Filter */}
                <select
                    value={selectedType}
                    onChange={handleTypeChange}
                    className="form-select"
                    style={{ maxWidth: "300px" }}
                >
                    <option value="">Select Vehicle Type</option>
                    {vehicleTypes.map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
            </div>

            {/* Table Container */}
            <div
                style={{
                    width: "100%",
                    maxHeight: "400px",
                    overflowY: "auto",
                    borderRadius: "8px",
                    backgroundColor: "#fafafa",
                }}
            >
                <table className="table table-bordered table-light">
                    <thead className="table-secondary">
                        <tr>
                            <th>Parking Id</th>
                            <th>Owner</th>
                            <th>Vehicle Number</th>
                            <th>Vehicle Type</th>
                            <th>Slot Number</th>
                            <th>In Time</th>
                            <th>Vehicle Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredVehicles.map((vehicle) => (
                            <tr key={vehicle.parkingRegId}>
                                <td>{vehicle.parkingRegId}</td>
                                <td>{vehicle.vehicleOwner}</td>
                                <td>{vehicle.vehicleNumber}</td>
                                <td>{vehicle.vehicleTypes}</td>
                                <td>{vehicle.slotNumber}</td>
                                <td>{new Date(vehicle.vehicleIn).toLocaleString()}</td>
                                <td style={{ color: "#0dbd70" }}>{vehicle.slotStatus}</td>
                                <td>
                                    <button
                                        className="btn btn-outline-danger"
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
