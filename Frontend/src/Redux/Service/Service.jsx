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
        return this.axios.post(`${this.apiUrl}/bidder/login`, {
            email,
            password
        });
    }
    user_signup(data){
        const { name, email, pass, mobile } = data;
        return this.axios.post(`${this.apiUrl}/user/sign-up`, {
            name,
            email,
            pass,
            mobile
        });
    }
    bidder_signup(data){
        const { name, email, pass, mobile,companyName,latitude,longitude,proof,skills} = data;
        return this.axios.post(`${this.apiUrl}/bidder/sign-up`, {
            name,
            email,
            pass,
            mobile,
            companyName,
            latitude,
            longitude,
            proof,
            skills
        })
    }
    getTaskList_bidder(data){
        const {skills,longitude,latitude} = data;
        return this.axios.post(`${this.apiUrl}/task/getforbidders`, {
            skills,
            latitude,
            longitude,
            radiusKM:1000000
        })
        
    }

}

export default new Service();
