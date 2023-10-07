import client, { baseUrl } from "./client";
import axios from "axios";

const GetCalendars = async (username) =>{
    const res = await client.get(baseUrl+'/calendar/getUserCalendars/'+username);
    console.log(res);
    if(res?.data?.success){
        return(res.data);
    }else{
        return(res.data.message);
    }
}


export default {
    GetCalendars
}