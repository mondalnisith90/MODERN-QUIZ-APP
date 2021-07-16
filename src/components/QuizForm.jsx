import { useParams, useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import Button from '@material-ui/core/Button';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { useState } from "react";
import validator from "validator";
import axios from "axios";
import "../css/QuizForm.css";


const QuizForm = () => {
    const {id, catogery} = useParams();
    const [quizFormData, setQuizFormData] = useState({
      totalQuestions: 10,
      difficultyLevel: "any"
    });
    const [inputError, setInputError] = useState("");
    const {totalQuestions, difficultyLevel} = quizFormData;
    const history = useHistory();
    

    const formInputClick = (event) => {
      setInputError("");
      const fieldName =event.target.name;
      const fieldValue = event.target.value;
     
      setQuizFormData({...quizFormData, [fieldName]: fieldValue});
    }

    const quizStart = async(event) => {
      // event.preventDefault();
      if(totalQuestions > 50 || totalQuestions <10){
        setInputError("total questions number must be between 10 to 50");
        event.preventDefault();
        return;
      }else if(! validator.isInt(""+totalQuestions)){
        setInputError("total questions should be an integer number");
        event.preventDefault();
        return;
      }
      const apiStatusCode =  await getApiStatusCode();
      if(apiStatusCode == 0){
        //all ok. Open quiz window
        const url = `/quiz/${id}/${difficultyLevel}/${totalQuestions}/${catogery}`;
        history.push(url);
      }else if(apiStatusCode == 1){
        //total questions number enter by user is not present in trivia api
        setInputError("This catogery not contain this amount of questions. Please reduce the number.");
        event.preventDefault();
        return;
      }else if(apiStatusCode == 2){
        //something went wrong on server
        setInputError("Something went wrong on the server. Please try with another catogery.");
        event.preventDefault();
        return;
      }
    }

    const getApiStatusCode = async () => {
      let apiUrl = ``;
      if(difficultyLevel == "any"){
        apiUrl = `https://opentdb.com/api.php?amount=${totalQuestions}&category=${id}&type=multiple`;
      }else{
        apiUrl = `https://opentdb.com/api.php?amount=${totalQuestions}&category=${id}&difficulty=${difficultyLevel}&type=multiple`;
      }
      try{
        const apiResponse = await axios.get(apiUrl);
        const apiData = await apiResponse.data;
        return apiData.response_code;
      }catch(error){
        console.log(error.message)
        return 2;
      }
    }



    return(<>
        <section className="quizform_root_div ">
        <div  className="d-flex justify-content-center m-auto d-block align-items-center p-4">

   
         <div className="quizform_main_div ">
             <h1 className="quizform_heading">{catogery}</h1>
              <div className="quiz_form_div ">
               
              <form>
               <div className="mb-3">
                 <label htmlFor="quantity" className="form-label form_level">Number of Questions*</label>
                 <input type="number"  max="50" min="10" value={totalQuestions}  onChange={formInputClick}  className="form-control" id="quantity" name="totalQuestions" placeholder="Enter total quiz question number" />
                 <span className="error_span">{inputError}</span>
               </div>
               <div className="mb-3">
                <FormControl component="fieldset">
                 <FormLabel component="legend" className="form_level">Select Difficulty Level*</FormLabel>
                 <RadioGroup aria-label="difficulty" value={difficultyLevel} name="difficultyLevel" onChange={formInputClick} >
                   <FormControlLabel value="any" control={<Radio />} label="Any difficulty"  />
                   <FormControlLabel value="easy" control={<Radio />} label="Easy" />
                   <FormControlLabel value="medium" control={<Radio />} label="Medium" />
                   <FormControlLabel value="hard" control={<Radio />} label="Hard" />
                 </RadioGroup>
               </FormControl>
               </div>

               <Button variant="contained" color="secondary" onClick={quizStart} className="start_quiz_btn" endIcon={<DoubleArrowIcon/>}>
                start Quiz
               </Button>
             </form>

              </div>
         </div>
         </div>
        </section>
    </>);
}

export default QuizForm;