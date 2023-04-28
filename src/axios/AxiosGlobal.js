import axios from "axios";

const instance = axios.create(
    {
        baseURL:"http://196.188.107.43/api/v1/",
        headers:{
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Accept':'application/json',
            'Content-Type' : 'multipart/form-data',
            // 'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8',
          }, 
    }
)
export default instance
