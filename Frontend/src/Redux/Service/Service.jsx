import { API_URL } from "../Store";
import axios from "axios";

class Service {
    constructor() {
        this.apiUrl = API_URL;  // Use the imported API_URL
        this.axios = axios.create({
            // No need for withCredentials
        });
    }

    user_login(data) {
        const { email, passWord } = data;

        // Use this.apiUrl instead of hardcoded URL
        return this.axios.post(`${this.apiUrl}/user/login`, {
            email,
            passWord
        });
    }
    bidder_login(data) {
        const { email, password } = data;
        console.log(email+" "+password);
        // Use this.apiUrl instead of hardcoded URL
        return this.axios.post(`${this.apiUrl}/bidder/login`, {
            email,
            password
        });
    }
}

export default new Service();
