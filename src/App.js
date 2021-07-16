import Navbar from './components/Navbar';
import { Route, Switch } from 'react-router-dom';
import Quiz from './components/Quiz';
import Register from './components/Register';
import Login from './components/Login';
import QuizForm from './components/QuizForm';
import QuizWindow from "./components/QuizWindow";
import Logout from './components/Logout';
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { LocalParkingOutlined } from '@material-ui/icons';
import("../node_modules/bootstrap/dist/css/bootstrap.min.css");




const App =  () => {

  const [userLoginStatus, setUserLoginStatus] = useState(false);
  const [userName, setUserName] = useState("");
  const fetchUserData = async () => {
    const url = "https://suntechnisith.herokuapp.com/users/data";
    try {
      const serverResponse = await axios.get(url, {withCredentials: true});
      console.log("App.js is called");
      console.log(serverResponse);
      if(serverResponse.status === 200){
         //means user already loged in..
        setUserLoginStatus(true);
        setUserName(serverResponse.data.firstName);
      }else{
        throw new Error();
      }
    } catch (error) {
       //user data not get may be for internet error or available or unauthorize user
      //new user
      setUserLoginStatus(false);
    }
  }

  useEffect(()=>{
    fetchUserData();
  }, [userLoginStatus]);


  return (
    <>
     <Navbar userLoginStatus={userLoginStatus} userName={userName} />
     <Switch>
       <Route exact path="/" component={Quiz} />
       <Route exact path="/quizform/:id/:catogery" component={QuizForm} />
       <Route exact path="/quiz/:id/:difficultyLevel/:totalQuestions/:catogery" component={QuizWindow} />
       <Route exact path="/register" component={Register} />
       <Route exact path="/login" component={()=><Login setUserLoginStatus={setUserLoginStatus} />} />
       <Route exact path="/logout" component={()=><Logout setUserLoginStatus={setUserLoginStatus} />} />
     </Switch>
    </>
  
  );
}

export default App;
