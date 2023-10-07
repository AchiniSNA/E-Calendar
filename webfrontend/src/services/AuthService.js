import { baseUrl } from "./client";
import axios from "axios";
import client from "./client";

const APIEndpoint = "http://localhost:8000/";

const LoginUser = (data) =>
  new Promise((resolve, reject) => {
    const url = baseUrl + '/user/loginAccount';
    console.log('Auth service');
    axios
      .post(url, data)
      .then((res) => {
        // Check if the response status is available
        console.log(res)
        if (res.status) {
          if (res.status === 200) {
            resolve(res);
          } else {
            resolve(res);
          }
        } else {
          // If the response status is not available, handle it as an error
          resolve({ message: 'Response status not available' });
        }
      })
      .catch((err) => {
        resolve(err.response);
      });
  });




const RegisterUser = (data) =>
  new Promise((resolve, reject) => {
    //const headers= {Authorization: `Bearer ${token.getAccessToken()}`}
    const url = baseUrl+'/user/registerAccount';
    axios
    .post(url, data)
    .then((res) => {
    if (res.data.success){
        resolve(res.data);
    } else {
        reject(res.data);
    }
    })
    .catch((err) => {
      reject(err);
    });
});



const CheckUniqueUsername = (username) =>
  new Promise((resolve, reject) => {
    const url = baseUrl + '/user/checkUniqueUsername';
    axios
      .post(url, { username })
      .then((res) => {
        if (res.data.hasOwnProperty("isUnique")) {
          resolve(res.data);
        } else {
          reject({ error: "Unexpected response format" });
        }
      })
      .catch((err) => {
        reject(err);
      });
  });

const GetAccountNumber = async (username) =>{
    const res = await client.get(baseUrl+'/user/getAccountNumber/'+username);
    console.log("hello");
    // console.log(res);
    if(res?.data?.success){
        return(res.data);
    }else{
        return(res.data.message);
    }




export default{
  LoginUser,
  RegisterUser,
  CheckUniqueUsername,
  GetAccountNumber,
}
