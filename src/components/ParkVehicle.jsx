import React, { useState } from 'react';
import vehicleService from '../services/vehicleService';
import { toast } from 'react-toastify';

const ParkVehicle = () => {
    const [vehicleOwner, setVehicleOwner] = useState('');
    const [vehicleNumber, setVehicleNumber] = useState('');
    const [vehicleType, setVehicleType] = useState('');

    const handleRegisterVehicle = () => {
        if (!vehicleOwner || !vehicleNumber || !vehicleType) {
            toast.error('All fields are mandatory!');
            return;
        }

        const vehicleData = {
            vehicleOwner,
            vehicleNumber,
            vehicleTypes: vehicleType,
        };

        vehicleService.parkVehicle(vehicleData)
            .then((response) => {
                toast.success(`Vehicle registered successfully at slot: ${response.data.slotNumber}`);
                setVehicleOwner('');
                setVehicleNumber('');
                setVehicleType('');
            })
            .catch((error) => {
                toast.error(error.response.data.message);
            });
    };

    return (
        <div
            className="container d-flex justify-content-center align-items-center"
            style={{
                // minHeight: 'calc(100vh - 80px)', // Adjust height to account for the navbar
                // backgroundColor: '#f4f4f4',
                padding: '20px',
            }}
        >
            <div
                className="card shadow"
                style={{
                    width: '100%',
                    maxWidth: '450px',
                    borderRadius: '12px',
                    // backgroundColor: '#F8F9FA',
                }}
            >
                <div
                    className="card-header text-center"
                    style={{
                        backgroundColor: '#F8F9FA',
                        // color: 'white',
                        padding: '10px',
                        borderRadius: '12px 12px 0 0',
                        fontWeight: '600',
                        fontSize: '1.25rem',
                    }}
                >
                    Vehicle Registration
                </div>
                <div className="card-body p-4">
                    <form>
                        <div className="form-group mb-3">
                            <label
                                htmlFor="vehicleOwner"
                                className="form-label"
                                style={{ fontWeight: '500', color: '#333' }}
                            >
                                Vehicle Owner
                            </label>
                            <input
                                type="text"
                                id="vehicleOwner"
                                className="form-control"
                                value={vehicleOwner}
                                onChange={(e) => setVehicleOwner(e.target.value)}
                                placeholder="Enter owner's name"
                                required
                                style={{
                                    borderRadius: '6px',
                                    padding: '8px',
                                    border: '1px solid #ced4da',
                                }}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label
                                htmlFor="vehicleNumber"
                                className="form-label"
                                style={{ fontWeight: '500', color: '#333' }}
                            >
                                Vehicle Number
                            </label>
                            <input
                                type="text"
                                id="vehicleNumber"
                                className="form-control"
                                value={vehicleNumber}
                                onChange={(e) => setVehicleNumber(e.target.value)}
                                placeholder="Enter vehicle number"
                                required
                                style={{
                                    borderRadius: '6px',
                                    padding: '8px',
                                    border: '1px solid #ced4da',
                                }}
                            />
                        </div>
                        <div className="form-group mb-4">
                            <label
                                htmlFor="vehicleType"
                                className="form-label"
                                style={{ fontWeight: '500', color: '#333' }}
                            >
                                Vehicle Type
                            </label>
                            <select
                                id="vehicleType"
                                className="form-select"
                                value={vehicleType}
                                onChange={(e) => setVehicleType(e.target.value)}
                                style={{
                                    borderRadius: '6px',
                                    padding: '8px',
                                    border: '1px solid #ced4da',
                                }}
                            >
                                 <option value="" disabled selected>Select Vehicle Type</option> {/* Disabled placeholder */}
                                <option value="CAR">CAR</option>
                                <option value="BUS">BUS</option>
                                <option value="TRUCK">TRUCK</option>
                                <option value="BIKE">BIKE</option>
                            </select>
                        </div>
                        <button
                            type="button"
                            onClick={handleRegisterVehicle}
                            className="btn btn-primary w-100"
                            style={{
                                fontWeight: '600',
                                padding: '10px',
                                fontSize: '1rem',
                                borderRadius: '6px',
                            }}
                        >
                            Register Vehicle
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ParkVehicle;
