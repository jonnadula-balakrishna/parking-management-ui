import axios from "axios";
import { BASE_URL } from "../constants/Constants";

class vehicleService {

    getAllAvailbleSlots() {
        return axios.get(BASE_URL + "/available_slots");
    }

    getParkedVehicleVehiclesList() {
        return axios.get(BASE_URL + "/getAll_parking_vehicles");
    }

    parkVehicle(vehicle) {
        return axios.post(BASE_URL + "/vehicle_registration", vehicle);
    }

    unParkVehicle(slotNumber) {
        return axios.put(BASE_URL + "/vehicle/unParking/" + slotNumber);
    }

    getAllVehicleList() {
        return axios.get(BASE_URL + "/get_all_vehicle_list");
    }

    getVehicleInfoBySlotCode(slotCode) {
        return axios.get(BASE_URL + "/getSlotInfo/" + slotCode);

    }
}


export default new vehicleService();