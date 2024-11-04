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
            radiusKM:250000000000000
        })
        
    }
    user_addTask(data){
        console.log(data)
        return this.axios.post(`${this.apiUrl}/task/addnew`,data);
    }

    bidder_addBidLog(preparedData){
        console.log(preparedData);
        return this.axios.post(`${this.apiUrl}/task/addlog`, preparedData);
    }
    bidder_addViewToTask(taskId){
        console.log(taskId);
        return this.axios.post(`${this.apiUrl}/task/add-view`,{taskId});
    }
    user_getAllTask(userId){
        console.log(userId);
        return this.axios.get(`${this.apiUrl}/task/get-task-user`,{
            params: {
              userId:userId
            }
        });
    }
    user_getAllBidsForTask(taskId){
        return this.axios.get(`${this.apiUrl}/bid/log-task`,{
            params: {
                taskId:taskId
            }
        });
    }
    getAllMessage(bidLogId){
        return this.axios.get(`${this.apiUrl}/message/get-message-bid-log`,{
            params: {
                bidLogId
            }
        });
    }
    addMessage(messageData){
        return this.axios.post(`${this.apiUrl}/message/new-message`,messageData);
    }
    delOneMessage(id){
        return this.axios.delete(`${this.apiUrl}/message/del-one-message`,{
            params: {
                id:id
            }
        });
    }
    bidder_getBidListForBidders(bidderId){
        return this.axios.get(`${this.apiUrl}/bid/log-bidder`,{
            params: {
                bidderId
            }
        });
    }
    user_acceptTheBidder(data){
        return this.axios.post(`${this.apiUrl}/task/accepted`,data);
    }
    bidder_getBidsForQueue(bidLogIds){
        return this.axios.get(`${this.apiUrl}/bid/get-bidder-ids`,{
            params:{
                bidLogIds:bidLogIds
            }
        }
        )
    }
    user_getOtpForTask(taskId){
        return this.axios.get(`${this.apiUrl}/task/get-task-otp`,{
            params:{
                taskId:taskId
            }
    })
    }

    bidder_otpValidationStartTheWorkRemoveFromQueue(data){
        return this.axios.post(`${this.apiUrl}/task/validate-start`,data);
    }
    common_getPreDefineSkills(){
        return this.axios.get(`${this.apiUrl}/components/getskills`);
    }
    common_completedTaskList(id){
        return this.axios.get(`${this.apiUrl}/task/get-completed-task`,{
            params:{
                id:id
            }
        })
    }
    bidder_getBidsInProgress(bidderId){
        
        return this.axios.get(`${this.apiUrl}/bid/in-progress`,{
            params:{
                bidderId:bidderId
            }
        });
    }
    bidder_sendCompleteRequest(data){
        return this.axios.post(`${this.apiUrl}/task/complete-request`,data);
    }
    user_completeTheTask(data){
        return this.axios.post(`${this.apiUrl}/task/complete-approve`,data);
    }
    user_getNotification(userId){
        console.log(userId);
        return this.axios.get(`${this.apiUrl}/user/get-notification`,{
            params:{
                userId:userId
            }
        });
    }
    bidder_getById(bidderId){
        return this.axios.get(`${this.apiUrl}/bidder/get-by-id`,{
            params:{
                bidderId:bidderId
            }
        });
    }
}

export default new Service();
