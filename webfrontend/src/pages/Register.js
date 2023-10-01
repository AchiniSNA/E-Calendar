import React from "react";
import {useState} from "react";
import axios from "axios";
import "../style/Register.css";
import "../style/Style.css";
import { useNavigate } from "react-router-dom";
import { FormControl,
         Box,
         Grid,
         Card,
         CardContent,
         Paper,
         TextField,
         Typography,
         Button  } from '@mui/material';



         const Register = () =>{


          const navigate = useNavigate();
          const [registrationData, setRegistrationData] = useState({
            accountNo: '',
            branch: '',
            name: '',
            nicNo: '',
            email: '',
            mobileNo: '',
          });
          const [isEmailValid, setIsEmailValid] = useState(true); // State to track email validation
        
          // Function to update the registrationData state
          const handleChange = (name, value) => {
            setRegistrationData({
              ...registrationData,
              [name]: value,
            });
          };
        
          // Function to validate email
          const validateEmail = (text) => {
            // Regular expression for a valid email address
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const isValid = emailRegex.test(text);
            setIsEmailValid(isValid);
          };
        
          // Function to handle the "Next" button click
          const handleNext = () => {
            // Validate email before proceeding
            validateEmail(registrationData.email);
        
            // Check if email is valid before navigating
            if (isEmailValid) {
              console.log(registrationData);
              navigate('/setPassword', { registrationData: registrationData });

              //navigate('/setPassword',{state: {registrationData}});
              // Add your navigation logic here or render the next component
              console.log('Navigating to the next page with data:', registrationData);
            } else {
              // Handle the case where the email is not valid (show an error message, prevent navigation, etc.)
              // For now, you can log an error message
              console.error('Invalid email address');
            }
          };

          function handleClick(event){
            window.location.href='/';
          }
           
          return (
            <div className="register">
                <div className="image">
                  <img className="img1" alt="" src="./BOC.jpeg" />
                </div>
                
                <div className="label">
                    <div className="text-wrapper">CALENDAR</div>
                </div>
                        
               {/* <div className = "horizontal-line" > </div>  */}
                
              <Paper style={{ background: '#ffe795', width:'100vw' }}>
                <Card style={{maxWidth:450, margin:"auto", borderRadius:20,padding:"0px 20px"}}>
              
                        <CardContent>
                            
                            <FormControl>
                                <form >
                                    
                                    <Grid container justify="center">
                                        <Typography variant="h4" gutterBottom padding="0px 80px">REGISTRATION</Typography>
                                    </Grid>                           
                                    
                                    <Typography variant="subtitle1" >Account No.</Typography>
                                    
                                    <Grid xs={12} sm={6} item>
                                        <TextField type="text" onChange ={(e) => handleChange('accountNo',e.target.value)}  value={registrationData.accountNo} required size="small"/>
                                    </Grid>
                                    
                                    <Typography variant="subtitle1">Branch</Typography>
                                    
                                    <Grid xs={12} sm={6} item>
                                        <TextField type ="text" onChange ={(e) => handleChange('branch', e.target.value)}  value={registrationData.branch} required size="small"/>
                                    </Grid>
        
                                    <Typography variant="subtitle1">NIC No.</Typography>
        
                                    <Grid xs={12} sm={6} item>
                                        <TextField type ="text" onChange ={(e) => handleChange('nicNo', e.target.value)}  value={registrationData.nicNo} required size="small"/>
                                    </Grid>
        
                                    <Typography variant="subtitle1">Name</Typography>
        
                                    <Grid xs={12} sm={6} item>
                                        <TextField type ="text" onChange ={(e) => handleChange('name', e.target.value)}  value={registrationData.name} required size="small"/>
                                    </Grid>
        
                                    <Typography variant="subtitle1">Email Address</Typography>
        
                                    <Grid xs={12} sm={6} item>
                                        <TextField type ="email" onChange ={(e) =>  { handleChange('email', e.target.value);
                                                                                     validateEmail(e.target.value);}}   value={registrationData.email} required size="small"/>
                                        {!isEmailValid && <p className="error">Invalid email address</p>}
                                    </Grid>
        
                                    <Typography variant="subtitle1">Mobile No.</Typography>
        
                                    <Grid xs={12} sm={6} item>
                                        <TextField type ="tel" onChange ={(e) => handleChange('mobileNo', e.target.value)} value={registrationData.mobileNo} required size="small"/>
                                    </Grid>
        
                                    <Box display="flex" justifyContent="space-between">
                                      <Button onClick={handleClick} style = {{
                                                                            backgroundColor:"#fcc507ab",
                                                                            fontSize: "25px",
                                                                            margin:"25px",
                                                                            width:"150px",
                                                                            height: "50px",
                                                                            color: "#000000",
                                                                            algnItems:"center",
                                                                            borderRadius:"20px",                                                                  
                                                                        }}>Back</Button>
                                    
                    
                                    
                                      <Button type="submit" onClick={handleNext} disabled={!isEmailValid} style = {{
                                                                    backgroundColor:"#fcc507ab",
                                                                    fontSize: "25px",
                                                                    margin:"25px",
                                                                    width:"150px",
                                                                    height: "50px",
                                                                    color: "#000000",
                                                                    algnItems:"center",
                                                                    borderRadius:"20px"
                                                                  }}>Next</Button>
                                    
                                    </Box>
                                   
                    
                                </form> 
                                
                            </FormControl>
                        
                        </CardContent>
                
                </Card>
                   
              </Paper>                            
        
            </div>
            
          );
            
          
          };   
        
        export default Register;
  /*function Register()  {

  const [accountNo,setAccountNo]=useState('')
  const [branch,setBranch]=useState('')
  const [nicNo,setNicNo]=useState('')
  const [name,setName]=useState('')
  const [mobile,setMobile]=useState('')
  const [email,setEmail]=useState('')

  const navigate=useNavigate();
    
    function handleSubmit(event) {
        event.preventDefault();
    
        navigate('/setPassword');
      }

    function handleClick(event){
      window.location.href='/';
    }

  
  return (
    <div className="register">
        <div className="image">
          <img className="img1" alt="" src="./BOC.jpeg" />
        </div>
        
        <div className="label">
            <div className="text-wrapper">CALENDAR</div>
        </div>
                
        <div className = "horizontal-line" > </div>
        
      <Paper style={{ background: '#ffe795', width:'100vw' }}>
        <Card style={{maxWidth:450, margin:"auto", borderRadius:20,padding:"0px 20px"}}>
      
                <CardContent>
                    
                    <FormControl>
                        <form onSubmit={handleSubmit}>
                            
                            <Grid container justify="center">
                                <Typography variant="h4" gutterBottom padding="0px 80px">REGISTRATION</Typography>
                            </Grid>                           
                            
                            <Typography variant="subtitle1" >Account No.</Typography>
                            
                            <Grid xs={12} sm={6} item>
                                <TextField type="text" onChange ={(e) => {setAccountNo(e.target.value)}}  id="accountNo" required size="small"/>
                            </Grid>
                            
                            <Typography variant="subtitle1">Branch</Typography>
                            
                            <Grid xs={12} sm={6} item>
                                <TextField type ="text" onChange ={(e) => {setBranch(e.target.value)}}  id="branch" required size="small"/>
                            </Grid>

                            <Typography variant="subtitle1">NIC No.</Typography>

                            <Grid xs={12} sm={6} item>
                                <TextField type ="text" onChange ={(e) => {setNicNo(e.target.value)}}  id="nic" required size="small"/>
                            </Grid>

                            <Typography variant="subtitle1">Name</Typography>

                            <Grid xs={12} sm={6} item>
                                <TextField type ="text" onChange ={(e) => {setName(e.target.value)}}  id="name" required size="small"/>
                            </Grid>

                            <Typography variant="subtitle1">Email Address</Typography>

                            <Grid xs={12} sm={6} item>
                                <TextField type ="email" onChange ={(e) => {setEmail(e.target.value)}}  id="email" required size="small"/>
                            </Grid>

                            <Typography variant="subtitle1">Mobile No.</Typography>

                            <Grid xs={12} sm={6} item>
                                <TextField type ="tel" onChange ={(e) => {setMobile(e.target.value)}}  id="mobile" required size="small"/>
                            </Grid>

                            <Box display="flex" justifyContent="space-between">
                              <Button onClick={handleClick} style = {{
                                                                    backgroundColor:"#fcc507ab",
                                                                    fontSize: "25px",
                                                                    margin:"25px",
                                                                    width:"150px",
                                                                    height: "50px",
                                                                    color: "#000000",
                                                                    algnItems:"center",
                                                                    borderRadius:"20px",                                                                  
                                                                }}>Back</Button>
                            
            
                            
                              <Button type="submit" style = {{
                                                            backgroundColor:"#fcc507ab",
                                                            fontSize: "25px",
                                                            margin:"25px",
                                                            width:"150px",
                                                            height: "50px",
                                                            color: "#000000",
                                                            algnItems:"center",
                                                            borderRadius:"20px"
                                                          }}>Next</Button>
                            
                            </Box>
                           
            
                        </form> 
                        
                    </FormControl>
                
                </CardContent>
        
        </Card>
           
      </Paper>                            

    </div>
    
  );
    
  
};

export default Register;
*/

/*
async function submit(e){
    e.preventDefault();
    try{
        await axios.post("http://localhost:3000/Register",{
            accountNo,branch,nicNo,name,mobile,email
        })
    }

    catch{
        console.log(e);

    }
  }

  ---------------------------------------------------------------------------------------------------------
*/

