import React from "react";
import { useNavigate,useLocation } from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import "../style/Setpassword.css";
import "../style/Style.css";
import { FormControl,
         Grid,
         Card,
         CardContent,
         Paper,
         Typography,
         TextField,
         Button,
         Dialog, 
         DialogActions, 
         DialogContent,
         DialogContentText} from '@mui/material';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AuthService from "../services/AuthService";
import { useParams } from 'react-router-dom';


const SetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  //  const [showModal, setShowModal] = useState(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const [isUniqueUsername, setIsUniqueUsername] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  

  const registrationData = location.state.registrationData;
  
  console.log("Received Registration Data:", registrationData);
 // const { registrationData } = useParams();
  //const { accountNo, branch, name, nicNo, email, mobileNo } = registrationData;
  const accountNo = registrationData.accountNo;
  const branch = registrationData.branch;
  const name = registrationData.name;
  const nicNo = registrationData.nicNo;
  const email = registrationData.email;
  const mobileNo = registrationData.mobileNo;
  const [isBoxOpen, setOpenBox] = useState(false)
 

  
 const handleRegisterAccount = async () => {
    const userData = {
      username: username,
      password: password,
      nicNo: nicNo,
      account_number: accountNo,
      branch: branch,
      name: name,
      phone_number: mobileNo,
      email: email,
    };
    try {
       // const response = await AuthService.RegisterUser(userData);
        const response = {status:200};
        if (response?.status === 200) {
          // Successful registration
          setOpenBox(true);
        } else {
          // Handle unsuccessful registration (e.g., show an error message)
          console.log("Registration Failed");
        }
      } catch (error) {
        // Handle any network or server errors here
        console.error("Registration error:", error);
      }
      // Alert.alert('Your account has been registered Succesfully');
      // Navigate back to the login page
      // navigation.push('WelcomePage');
    };

    const checkUniqueUsername = async (text) => {
        if (text.trim() === "") {
          setIsUniqueUsername(false);
          return;
        }
    
    setIsLoading(true);

    try {
        //const response = await AuthService.CheckUniqueUsername(text);
        const response = {isUnique:true};
        setIsUniqueUsername(response.isUnique);
        setUsername(text);
      } catch (error) {
        console.error("Error checking username uniqueness:", error);
        setIsUniqueUsername(false);
      } finally {
        setIsLoading(false);
      }
    };

    const checkPasswordMatch = (password1, password2) => {
        setIsLoading1(true);
        const passwordsMatch = password1 === password2;
        setIsPasswordMatch(passwordsMatch);
        setIsLoading1(false);};


  //const navigate=useNavigate();
    
   // function handleSubmit(event) {
   //     event.preventDefault();
    
   //   }
      //function handleClick(event){
    //    window.location.href='/';
   //   }
  

  return (
    <div className="setPassword">
        <div className="image">
            <img className="img1" alt="" src="./BOC.jpeg" />
        </div>
        
        <div className="label">
            <div className="text-wrapper">CALENDAR</div>
        </div>
        
      {/*  <div className = "horizontal-line" > </div>   */}




        <Paper style={{  background: '#ffe795',width:'100vw'}}>
            <Card style={{maxWidth:450, margin:"auto", borderRadius:20,padding:"0px 20px"}}>
 
                <CardContent>
                
                    <FormControl>
                    
                    
                        <form>
                        
                        <img className="img3" src = "./lock.png" alt="" style={{height:220, width:220, padding:"0px 90px"}} />  
                            
                            <Typography variant="subtitle1" >Username</Typography>
                            
                            <Grid xs={12} sm={6} item>
                                <TextField type="text" onChange ={(e) => checkUniqueUsername(e.target.value)} disabled={isLoading} required size="small"/>
                                {isLoading ? (
                                    <div className="spinner">Loading...</div>
                                ) : isUniqueUsername ? (
                                    <CheckCircleIcon/>
                                ) : null}
                            </Grid>
                            
                            <Typography variant="subtitle1" >Password</Typography>
                            
                            <Grid xs={12} sm={6} item>
                                <TextField type ="password" onChange ={(e) => {setPassword(e.target.value); 
                                                                               checkPasswordMatch(e.target.value, password);
                                                                               }}  required size="small"/>
                            </Grid>

                            <Typography variant="subtitle1" >Confirm Password</Typography>

                            <Grid xs={12} sm={6} item>
                                <TextField type ="password" onChangeText={(e) => checkPasswordMatch(password, e.target.value)} required size="small"/>
                                {isLoading1 ? (
                                    <div className="spinner">Loading...</div>
                                ) : isPasswordMatch ? (
                                    <CheckCircleIcon/> 
                                ) : null}
                            </Grid>

              
                            <Button  onClick={handleRegisterAccount} 
                                    disabled={!isUniqueUsername || !isPasswordMatch || isLoading || isLoading1}
                                    style = {{
                                                            backgroundColor:"#fcc507ab",
                                                            fontSize: "32px",
                                                            margin:"42px",
                                                            width:"315px",
                                                            height: "50px",
                                                            color: "#000000",
                                                            alignItems:"center",
                                                            borderRadius:"20px",
                                                           
                                                          }}>REGISTER</Button>
                            
                           
                                      
                        </form> 
                        
                    </FormControl>
                
                </CardContent>
        
            </Card>
           
       </Paper> 



       <Dialog  open={isBoxOpen}
                onClose= {()=>setOpenBox(false)}>
                 
                <Typography variant="h5"><TaskAltIcon  fontSize="large"/>  Registration completed</Typography>
                
                <DialogContent>
                    <DialogContentText variant="h6" style={{ padding:"0px 40px"}}>Manage Your Life with </DialogContentText>
                    <DialogContentText  variant="h5" style={{ padding:"0px 60px"}}>BOC Calendar</DialogContentText>
                    <CalendarMonthOutlinedIcon sx={{ fontSize: 60 }} style={{ padding:"25px 120px"}}/>
                    <DialogActions >
                        <Button onClick={()=>{setOpenBox(false);
                                              navigate("/");}} style = {{
                                                            backgroundColor:"#fcc507ab",
                                                            fontSize: "15px",
                                                            margin:"10px",
                                                            width:"90px",
                                                            height: "50px",
                                                            color: "#000000",
                                                            borderColor:"black",
                                                            borderRadius:"10px",
                                                           
                                                          }}>Got it</Button>
                    </DialogActions>
                </DialogContent>
        </Dialog>                        

    </div>
    
  );
};

export default SetPassword;
