import { useParams } from "react-router";
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
import "../css/QuizForm.css";


const QuizForm = () => {
    const {id, catogery} = useParams();
    const [quizFormData, setQuizFormData] = useState({
      totalQuestions: 15,
      difficultyLevel: "medium"
    });
    const [inputError, setInputError] = useState("");
    const {totalQuestions, difficultyLevel} = quizFormData;
    

    const formInputClick = (event) => {
      setInputError("");
      const fieldName =event.target.name;
      const fieldValue = event.target.value;
     
      setQuizFormData({...quizFormData, [fieldName]: fieldValue});
    }

    const quizStart = (event) => {
      if(totalQuestions > 50 || totalQuestions <10){
        setInputError("total questions number must be between 10 to 50");
        event.preventDefault();
      }else if(! validator.isInt(""+totalQuestions)){
        setInputError("total questions should be an integer number");
        event.preventDefault();
      }
    }


    return(<>
        <section className="quizform_root_div d-flex justify-content-center align-items-center ">
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

     

               <NavLink to={`/quiz/${id}/${difficultyLevel}/${totalQuestions}`} style={{textDecoration: "none"}}>
               <Button variant="contained" color="secondary" onClick={quizStart} className="start_quiz_btn" endIcon={<DoubleArrowIcon/>}>
                start Quiz
               </Button>
               </NavLink>
             </form>

              </div>
         </div>

        </section>
    </>);
}

export default QuizForm;