import EmailIcon from '@material-ui/icons/Email';
import PasswordIcon from '@material-ui/icons/Lock';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Button from '@material-ui/core/Button';
import axios from "axios";
import { NavLink, useHistory } from "react-router-dom";
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactLoadingAnimation from "./ReactLoadingAnimation";
import signinImg from "../images/login7.png";
import "../css/Login.css";

const reactToastStyle = {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    };

const Login = ({setUserLoginStatus}) => {

    const [inputFieldsData, setInputFieldsData] = useState({ email: "", password: ""});
    const [serverError, setServerError] = useState("");
    const [showLoadingbar, setLoadingbarState] = useState(false);
    const {email, password} = inputFieldsData;
    const history = useHistory();
    

    const inputTextChange = (event) => {
        const inputFieldName = event.target.name;
        const inputFieldValue = event.target.value;
        setInputFieldsData({ ...inputFieldsData, [inputFieldName]: inputFieldValue });
        setServerError("");
    }

    const loginFormSubmit = async (event) => {
        event.preventDefault();
        //send data to server for user login
        const url = "https://suntechnisith.herokuapp.com/users/login";
        const data = {email, password};
        setLoadingbarState(true);
        try {
            const serverResponse = await axios.post(url, data, {withCredentials: true});
            if(serverResponse.status == 200){
                
                toast.success("login successfull", reactToastStyle);
                setTimeout(() => {
                    setUserLoginStatus(true);
                    history.push("/");
                } ,2300);
                
            }      
            setLoadingbarState(false);   
        } catch (error) {
              //set server error message
              setLoadingbarState(false);
              try{
                const serverResponse = error.response;
                toast.error(serverResponse.data, reactToastStyle);
                setServerError(serverResponse.data);
              }catch(error){
                setServerError(error.message);
              }   
        }  
    }



    return(
        <> 
           <section className=" root_div_login">
                <div className="container row_div_login shadow">
                   <div className="heading_div">
                   <h2 className="login_heading">User Login</h2>
                   <ToastContainer />
                   </div>
                   <div className="d-flex justify-content-center" style={{height: "40px"}}>
                  {showLoadingbar ? <ReactLoadingAnimation type={"bars"} color={"blue"} width={50} height={40} /> : null}
                  </div>
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-10 col-sm-10 d-block m-auto ">
                            <img src={signinImg} className="img-fluid" alt="Login Img" />
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-10 col-sm-10 d-block m-auto">
                            <form method="POST" className="form_style_login" onSubmit={loginFormSubmit}>
                                <div className=" p-4">
                                    <p className="text-center text-danger fw-bold">{serverError}</p>
                                  
                                    <div className="row row g-3 my-2">
                                        <div className="col-md-10">
                                            <label  htmlFor="exampleInputEmail1" className="form-label login_label_text text-dark fw-bold"><EmailIcon className="metrial_icon" /> Email address*</label>
                                            <input type="email" className="form-control" placeholder="Enter email address" aria-label="First name"  onChange={inputTextChange} name="email"   value={email}  required />
                                        </div>
                                    </div>
                                    <div className="row my-2">
                                        <div className="col-md-10">
                                            <label htmlFor="exampleInputEmail1" className="form-label login_label_text text-dark fw-bold"><PasswordIcon className="metrial_icon mb-1" />Password*</label>
                                            <input type="password" placeholder="Enter password" className="form-control" placeholder="Enter Password" aria-label="First name" onChange={inputTextChange} name="password"  value={password}  required />
                                        </div>
                                    </div>
                                    <div className="row my-4">
                                        <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                                            <Button variant="contained" className="mt-3 login_btn" color="secondary"  startIcon={<ExitToAppIcon />}  type="submit">
                                             Login
                                           </Button>
                                        </div>
                                        <div className="col-lg-6 col-md-12 col-sm-12 col-12 mt-4">
                                            <NavLink to="/register" className="nav_link">New user? Create account</NavLink>
                                        </div>
                                    </div>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Login;