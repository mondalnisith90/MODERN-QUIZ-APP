import Button from '@material-ui/core/Button';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import ReplayIcon from '@material-ui/icons/Replay';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import "../css/QuizResult.css";

const QuizResult = ({id, totalQuestions, catogery, questionsArray}) => {

    const [quizAnswerVisibility, setQuizAnswerVisibility] = useState({buttonCaption: "View Answer", visibility: false});
    let quizScore = 0;
    questionsArray.map((value)=>{
      if(value.userAnswer == value.currectAnswer){
        quizScore++;
      }
    });

    const viewAnswerBtnClick = () => {
        if(quizAnswerVisibility.visibility){
            setQuizAnswerVisibility({buttonCaption: "View Answer", visibility: false});
        }else{
            setQuizAnswerVisibility({buttonCaption: "Hide Answer", visibility: true})
        }
       
    }

    console.log("Quiz result");
    console.log(questionsArray);

    return(
        <>
           <div className="quiz_result_root_div">
           <div className="  d-flex justify-content-center m-auto">
              <div className="quiz_marks_div"> 
                 <h1 className="result_heading_text">{catogery}</h1>
                 <hr className="quiz_result_hr"/>
                 <h3 className="result_marks_text">Your score {quizScore}/{totalQuestions}</h3>
                 <div className="result_option_div d-flex align-items-center justify-content-between">
                   <div className="view_answer_btn_div">
                   <Button variant="contained"  className="view_answer_btn" endIcon={<RemoveRedEyeIcon/>} onClick={viewAnswerBtnClick}>
                     {quizAnswerVisibility.buttonCaption}
                  </Button>
                   </div>
                   <div className="restart_quiz_btn_div">
                   <NavLink exact to={`/quizform/${id}/${catogery}`} style={{textDecoration: "none"}}>
                   <Button variant="contained"  className="restart_quiz_btn" startIcon={<ReplayIcon/>}>
                      Restart Quiz
                  </Button>
                  </NavLink>
                   </div>

                 </div>
             </div>   
             </div>

             {quizAnswerVisibility.visibility ? 
             <>
             <div className="quiz_answer_main_div container">
             <div className="text-center">
             <h1 className="answer_heading_text">Quiz Answers</h1>
             </div>
             <hr className="quiz_result_hr"/>
              <div className="quiz_answer_div">
              {questionsArray.map((value, index) => {
               return( 
                 <>
                
                <div className="answer_div">
                 <h3 className="quizresult_question_text">{index+1}. {value.question}</h3>
                 <div className="pl-3">
                   <p className="quizresult_option_div">A. {value.allOptions[0]}</p>
                   <p className="quizresult_option_div">B. {value.allOptions[1]}</p>
                   <p className="quizresult_option_div">C. {value.allOptions[2]}</p>
                   <p className="quizresult_option_div">D. {value.allOptions[3]}</p>
                 </div>
                   <p className="user_answer_text">Your answer: {value.userSelectedOption ? value.userSelectedOption : "no answer"}</p>
                   <p className="correct_answer_text">Correct answer: {  value.currectAnswer}</p>
                   </div>

                   </>
                )})}

              </div>
             </div>

             </>  : null}


           </div>
        </>
    );
}

export default QuizResult;