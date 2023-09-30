import React from "react";
import {useState} from "react";
import { Link,useNavigate } from "react-router-dom";
//import axios from "axios";
import "../style/Login.css";
import "../style/Style.css";
import { FormControl,
         Grid,
         Card,
         CardContent,
         Typography,
         TextField,
         Button} from '@mui/material';
import AlertMessage from '../components/AlertMessage'; 
import AuthServices from '../services/AuthService'



const Login= () => {

    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('') 
    const [loginResult, setLoginResult] = useState(null); 

    
    const navigate=useNavigate();

    const handleLogin = async () => {
        
        try {
           
          const response = await AuthServices.LoginUser ({
            username,
            password,
          }).catch((e) => console.log({ e }));
          
          if (response.status === 200) {
            console.log(response.data)
            setLoginResult({ message: 'Login successful!', severity: 'success' });
            
            navigate('/reactBigCalendar');
          } else {
            setLoginResult({ message: 'Login failed. Please check your credentials.', severity: 'error' });
            
            console.log('Login failed');
          }
        } catch (error) {
          // Handle any network or server errors here
          console.error('Login error:', error);
        }
      };
      
   
    return  (

        <div className="login">
        
            <div className="image">
                <img className="img1" alt="" src="./BOC.jpeg" />
            </div>
        
            <div className="label">
                <div className="text-wrapper">CALENDAR</div>
            </div>
            
            <div className = "horizontal-line" > </div>
             
             <img className ="image2" src = "./Login.jpg" alt =""/>
         
            <Card style={{maxWidth:450,marginRight:"0", padding:"0px 80px"}}>
                <CardContent>
                    
                    <FormControl>
                        <form >
                            
                            <Grid container justify="center">
                                <Typography variant="h3" gutterbottom padding="0px 50px">WELCOME</Typography>
                            </Grid>
                            
                            <Typography variant="h4" gutterbottom>Log in to your Calendar</Typography>
                            
                            <Typography variant="h6" >Username</Typography>
                            
                            <Grid xs={12} sm={6} item>
                                <TextField type="text" onChange ={(e) => {setUsername(e.target.value)}}  id="username" required size="small"/>
                            </Grid>
                            
                            <Typography variant="h6">Password</Typography>
                            
                            <Grid xs={12} sm={6} item>
                                <TextField type ="password" onChange ={(e) => {setPassword(e.target.value)}}  id="password" required size="small"/>
                            </Grid>
            
                            <Link to="/PasswordReset" gutterbottom>Forgot password?</Link>
            
                            <Grid container justify="center">
                                    <Button  onClick={handleLogin} style = {{
                                                                    backgroundColor:"#fcc507ab",
                                                                    fontSize: "32px",
                                                                    margin:"20px",
                                                                    width:"315px",
                                                                    height: "50px",
                                                                    color: "#000000",
                                                                    algnItems:"center",
                                                                    borderRadius:"20px"
                                                                }}>Log In</Button>
      
                            </Grid>
            
                             
                                {loginResult && (
                                    <Grid container justify="center">
                                    <AlertMessage message={loginResult.message} severity={loginResult.severity} />
                                    </Grid>
                                )}
                                
                            <Typography varient="h5" gutterbottom>New to Calendar? <Link to="/Register" gutterBottom>Register Now</Link> </Typography>
            
                            <Typography varient="h5"gutterbottom>Trouble logging in?    011 000 0000</Typography>
               
                        </form> 
                    
                    </FormControl>
                
                </CardContent>
           </Card>
        
            
        </div>

    );
              
                    
};

export default Login;

