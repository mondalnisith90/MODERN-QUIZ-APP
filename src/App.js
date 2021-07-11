import Navbar from './components/Navbar';
import { Route, Switch } from 'react-router-dom';
import Quiz from './components/Quiz';
import Register from './components/Register';
import Login from './components/Login';
import QuizForm from './components/QuizForm';
import QuizWindow from "./components/QuizWindow";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import './App.css';
import("../node_modules/bootstrap/dist/css/bootstrap.min.css");




const App =  () => {

  return (
    <>
     <Navbar />
     <Switch>
       <Route exact path="/" component={Quiz} />
       <Route exact path="/quizform/:id/:catogery" component={QuizForm} />
       <Route exact path="/quiz/:id/:difficultyLevel/:totalQuestions" component={QuizWindow} />
       <Route exact path="/register" component={Register} />
       <Route exact path="/login" component={Login} />
     </Switch>
    </>
  
  );
}

export default App;
