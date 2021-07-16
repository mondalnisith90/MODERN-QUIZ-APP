import { NavLink, useHistory } from "react-router-dom";
import EmailIcon from '@material-ui/icons/Email';
import PasswordIcon from '@material-ui/icons/Lock';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PhoneIcon from '@material-ui/icons/Phone';
import Button from '@material-ui/core/Button';
import { useState } from "react";
import validator from "validator";
import axios from "axios";
import ReactLoadingAnimation from './ReactLoadingAnimation';
import { ToastContainer, toast } from 'react-toastify';
import signinPic from "../images/login7.png"
import "../css/Register.css";

const reactToastStyle = {
    position: "top-center",
    autoClose: 1600,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    };


const Register = () => {

    const [inputFieldsData, setInputFieldsData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: ""
    });

    const [inputFieldsError, setInputFieldsError] = useState({
        firstNameError: "",
        lastNameError: "",
        emailError: "",
        phoneNumberError: "",
        passwordError: "",
        confirmPasswordError: "",
        serverError: ""
    });
    const [showLoadingbar, setLoadingbarState] = useState(false);
    const history = useHistory();

    const inputTextChange = (event) => {
        const inputFieldName = event.target.name;
        const inputFieldValue = event.target.value;
        setInputFieldsData({...inputFieldsData, [inputFieldName]: inputFieldValue});
        setInputFieldsError({
            firstNameError: "",
            lastNameError: "",
            emailError: "",
            phoneNumberError: "",
            passwordError: "",
            confirmPasswordError: "",
            serverError: ""
        });
    }

    const {firstName, lastName, email, phoneNumber, password, confirmPassword } = inputFieldsData;
    const {firstNameError, lastNameError, emailError, phoneNumberError, passwordError, confirmPasswordError, serverError } = inputFieldsError;

    const formValidation = () => {
        //check if users fills all the input fields currectly or not
        if(firstName.trim().length<3){
            setInputFieldsError({...inputFieldsError, firstNameError: "Name length must be at least 3 characters"});
            return false
        }
        if(!validator.isAlpha(firstName)){
            setInputFieldsError({...inputFieldsError, firstNameError: "Name must contains only alphabates not spaces, numbers or special characters"});
            return false;
        }

        if(lastName.trim().length<1){
            setInputFieldsError({...inputFieldsError, lastNameError: "Please enter your last name."});
            return false;
           }
           if(! validator.isAlpha(lastName.trim())){
            setInputFieldsError({...inputFieldsError, lastNameError: "Name must contains only alphabates not spaces, numbers, special characters."});
            return false;
           }
        if(!validator.isEmail(email.trim())){
            setInputFieldsError({...inputFieldsError, emailError: "This email address is not valid"});
            return false;
        }

        if(!validator.isAlphanumeric(phoneNumber.trim()) || phoneNumber.trim().length != 10){
            setInputFieldsError({...inputFieldsError, phoneNumberError: " This Phone Number is not valid"});
            return false;
        }

        if(password.trim().length <6){
            setInputFieldsError({...inputFieldsError, passwordError: "Password length must be at least 6 characters"});
            return false;
        }

        if(password != confirmPassword){
            setInputFieldsError({...inputFieldsError, confirmPasswordError: " Confirm Password not matched"});
            return false;
        }

        return true;
    
    }

    const signinFormSubmit = async (event) => {
        event.preventDefault();
        const isAllOk = formValidation();
        if(isAllOk){
            //send user data to server for signin
            setLoadingbarState(true);
            try{
                // { withCredentials: true }
                const url = "https://suntechnisith.herokuapp.com/users/signin";
                const data =  {firstName: firstName, lastName: lastName, email: email, phone: phoneNumber, password: password, cpassword: confirmPassword};
                const serverResponse = await axios.post(url, data);
                // console.log(serverResponse);
                if(serverResponse.status == 201){
                    toast.success("User Registration Successfull", reactToastStyle);
                    setTimeout(() => {
                        history.push("/login");
                    }, 2000);
                }
                setLoadingbarState(false);
            }catch(error){
                //set server error message
                setLoadingbarState(false);
                toast.error("Registration Failed", reactToastStyle);
                const serverResponse = error.response;
                if(serverResponse){
                    setInputFieldsError({...inputFieldsError, serverError: serverResponse.data});
                }else{
                    setInputFieldsError(error.message);
                }  
            }
        }

    }

    

    return(
        <> 
            <section className="register_root_div d-flex justify-content-center">
                <div className="reg_row_div container  shadow">
                  <div className="signin_div">
                    <h2 className="sign_heading">User Registration</h2>
                   
                    </div>
                    <div className="d-flex justify-content-center" style={{height: "40px"}}>
                       {showLoadingbar ? <ReactLoadingAnimation type={"bars"} color={"#08d46e"} width={50} height={40} /> : null}
                   </div>
                   <ToastContainer />
                    <div className="row  my-0 g-0">
                        <div className="col-lg-6 col-md-10 col-sm-10 col-sm-10 d-block m-auto">
                            <img src={signinPic} className="img-fluid register_img " alt="Signin img" />
                        </div>
                        <div className="col-lg-6 col-md-10 col-sm-11 col-sm-11 d-block m-auto ">
                            <form method="POST" className="form_style" onSubmit={signinFormSubmit}>
                            
                                <div className=" p-4">
                                    <p className="text-center text-danger fw-bold">{serverError}</p>
                                    <div className="row g-2 my-1">
                                        <div className="col-md-12 col-sm-12 col-12">
                                            <label htmlFor="exampleInputFirstName" className="form-label reg_label_text text-dark fw-bold"><PersonOutlineIcon className="metrial_icon" />First Name*</label>
                                            <input type="text" id="exampleInputFirstName" className="form-control" placeholder="First name" aria-label="First name" onChange={inputTextChange} name="firstName"  value={firstName} required/>
                                            <span className="input_error_span">{firstNameError}</span>
                                        </div>
                                        <div className="col-md-12 col-sm-12 col-12">
                                            <label htmlFor="exampleInputLastName" className="form-label text-dark reg_label_text fw-bold"><PersonOutlineIcon className="metrial_icon" />Last name*</label>
                                            <input type="text" id="exampleInputLastName" className="form-control" placeholder="Last name" aria-label="Last name" onChange={inputTextChange} name="lastName"  value={lastName} required/>
                                            <span className="input_error_span">{lastNameError}</span>
                                        </div>
                                    </div>
                                    <div className="row g-2 my-1">
                                        <div className="col-md-12 col-sm-12 col-12">
                                            <label htmlFor="exampleInputEmail1" className="form-label text-dark reg_label_text fw-bold"><EmailIcon className="metrial_icon" style={{fontSize: "20px"}}  />Email address*</label>
                                            <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email address" aria-label="First name" onChange={inputTextChange} name="email"   value={email} required />
                                            <span className="input_error_span">{emailError}</span>
                                            </div>
                                        <div className="col-md-12 col-sm-12 col-12">
                                            <label htmlFor="exampleInputPhone" className="form-label text-dark reg_label_text fw-bold"><PhoneIcon className="metrial_icon" style={{fontSize: "20px"}}  />Phone number*</label>
                                            <input type="number" id="exampleInputPhone" className="form-control" placeholder="Enter phone number" aria-label="Last name" name="phoneNumber" onChange={inputTextChange}   value={phoneNumber} required />
                                            <span className="input_error_span">{phoneNumberError}</span>
                                        </div>
                                    </div>
                                    <div className="row g-2 my-3">
                                        <div className="col-md-12 col-sm-12 col-12">
                                            <label htmlFor="exampleInputPassword" className="form-label reg_label_text text-dark fw-bold"><PasswordIcon style={{fontSize: "18px"}}  className="metrial_icon mb-1" />Password*</label>
                                            <input type="password" id="exampleInputPassword" placeholder="Enter password" className="form-control" placeholder="Enter Password" aria-label="First name" onChange={inputTextChange} name="password"  value={password} required />
                                            <span className="input_error_span">{passwordError}</span>
                                           </div>
                                        <div className="col-md-12 col-sm-12 col-12">
                                            <label htmlFor="exampleInputConfirmPassword" className="form-label reg_label_text text-dark fw-bold"><PasswordIcon style={{fontSize: "18px"}}  className="metrial_icon mb-1" />Confirm Password*</label>
                                            <input type="password" id="exampleInputConfirmPassword" placeholder="Confirm password" className="form-control" placeholder="Enter confirm Password" onChange={inputTextChange} aria-label="Last name" name="confirmPassword"   value={confirmPassword} required />
                                            <span className="input_error_span">{confirmPasswordError}</span>
                                        </div>
                                    </div>
                                    <div className="row my-4">
                                        <div className="col-md-6 col-sm-12 col-12">
                                            <Button variant="contained" className="mt-3" color="secondary" className="singin_btn"  startIcon={<PersonAddIcon />}  type="submit">
                                             SignUp
                                           </Button>
                                        </div>
                                        <div className="col-md-6 col-sm-12 col-12 mt-2">
                                            <NavLink to="/login"  className="nav_link">I already have an account</NavLink>
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

export default Register;