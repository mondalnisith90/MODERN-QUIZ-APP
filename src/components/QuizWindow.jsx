import { useParams } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from '@material-ui/core/Button';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import "../css/QuizWindow.css";


let questionsArray = [];


const QuizWindow = () => {
    const {id, difficultyLevel, totalQuestions} = useParams();
    useEffect(() => {
      fetchDataFromApi();
    }, []);

    const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0); 
    const [quizoptionsState, setQuizOptionState] = useState({A: false, B: false, C: false, D: false});
    const optionStyle = "individual_option_div d-flex align-items-center justify-content-start shadow";
    const activeOptionStyle = "individual_option_div d-flex align-items-center justify-content-start shadow active";

    const fetchDataFromApi = async () => {
      const apiUrl = `https://opentdb.com/api.php?amount=${totalQuestions}&category=${id}&difficulty=${difficultyLevel}&type=multiple`;
      try{
        const apiResponse = await axios.get(apiUrl);
        const apiData = apiResponse.data;
        if(apiData.response_code == 0){
          //means successful. For more information see the api docs.
          const allQuestions = apiResponse.data.results; //this will give an array of all questions
          allQuestions.map((value, index)=> {
            questionsArray.push({question: value.question, catogery: value.category, difficultyLevel: value.difficulty,
               allOptions: [...value.incorrect_answers, value.correct_answer], currectAnswer: value.correct_answer, userAnswer: null});
          });
          setCurrentQuestionNumber(1);
          
        }else{
          //means something wrong. not get  data from api
          throw new Error("Data not found");
        }
        
      }catch(error){
        console.log(error);
      }
    }

    const previousButtonClick = () => {
      if(currentQuestionNumber>1){
        console.log("prev= "+currentQuestionNumber);
        setCurrentQuestionNumber(currentQuestionNumber-1);
        console.log("next= "+currentQuestionNumber);
         //check here if next question's option is already selected by the user or not
         if(questionsArray[currentQuestionNumber - 2].userAnswer){
          //Some option is selected by the user for this particular question
          switch (questionsArray[currentQuestionNumber - 2].userAnswer) {
            case "A":
              setQuizOptionState({A: true, B: false, C: false, D: false});
            break;
            case "B":
              setQuizOptionState({A: false, B: true, C: false, D: false});
            break;
            case "C":
              setQuizOptionState({A: false, B: false, C: true, D: false});
            break;
            case "D":
              setQuizOptionState({A: false, B: false, C: false, D: true});
            break;  
          }

        }else{
          //no option is selected by the user
          setQuizOptionState({A: false, B: false, C: false, D: false});
        }
      }
    }

    const nextButtonClick = () => {
      if(currentQuestionNumber<totalQuestions){
        setCurrentQuestionNumber(currentQuestionNumber+1);
        //check here if next question's option is already selected by the user or not
        if(questionsArray[currentQuestionNumber].userAnswer){
          //Some option is selected by the user for this particular question
          switch (questionsArray[currentQuestionNumber].userAnswer) {
            case "A":
              setQuizOptionState({A: true, B: false, C: false, D: false});
            break;
            case "B":
              setQuizOptionState({A: false, B: true, C: false, D: false});
            break;
            case "C":
              setQuizOptionState({A: false, B: false, C: true, D: false});
            break;
            case "D":
              setQuizOptionState({A: false, B: false, C: false, D: true});
            break;  
          }

        }else{
          //no option is selected by the user
          setQuizOptionState({A: false, B: false, C: false, D: false});
        }
      }
     
      if(currentQuestionNumber == totalQuestions){
        const value =window.confirm("Are you sure to finish the quiz?");
        if(value){
          //when click ok

        }else{
          //when click cancel
        }
      }
      
    }

    const optionAClick = () => {
      setQuizOptionState({A: true, B: false, C: false, D: false});
      //store which option is selected by the user in object of array
      questionsArray[currentQuestionNumber-1].userAnswer = "A";
    }

    const optionBClick = () => {
      setQuizOptionState({A: false, B: true, C: false, D: false});
        //store which option is selected by the user in object of array
        questionsArray[currentQuestionNumber-1].userAnswer = "B";
    }

    const optionCClick = () => {
      setQuizOptionState({A: false, B: false, C: true, D: false});
        //store which option is selected by the user in object of array
        questionsArray[currentQuestionNumber-1].userAnswer = "C";
    }

    const optionDClick = () => {
      setQuizOptionState({A: false, B: false, C: false, D: true});
        //store which option is selected by the user in object of array
        questionsArray[currentQuestionNumber-1].userAnswer = "D";
    }

    return(
        <>
          <section className="quizwindow_root_div d-flex align-items-center justify-content-center m-auto d-block">
          <div className="quizwindow_main_div shadow">
            <div className="window_top_div d-flex align-items-center justify-content-between">
              <div className="question_number_div ">
                  <span style={{color: "#3fc904"}}>{currentQuestionNumber}</span><span style={{color: "#aa00ee"}}>/{totalQuestions}</span>
              </div>
              <div className="timmer_div d-flex align-items-center justify-content-center">
                  <span className="timmer_span">40</span>
              </div>

            </div>
            <hr className="quizwindow_horizental_line"/>
            <div className="window_center_div">
              <div className="question_div">
              
                <h3 className="question_text">{currentQuestionNumber? questionsArray[currentQuestionNumber-1]?.question : ""}</h3>
              </div>
              <div className="options_div">


              <div className="row ">
                <div className="col-md-12">
                <div className= {quizoptionsState.A ? activeOptionStyle : optionStyle} onClick={optionAClick} >
                     <div className="option_alphabate_div  d-flex align-items-center justify-content-center ">
                         <span className="option_alphabate">A</span>
                     </div>
                     <div className="option_text">
                     {currentQuestionNumber? questionsArray[currentQuestionNumber-1]?.allOptions[0] : ""}
                     </div>
                 </div>
                </div>
              </div>


              <div className="row my-4">
                <div className="col-md-12">
                <div className={quizoptionsState.B ? activeOptionStyle : optionStyle}  onClick={optionBClick}>
                     <div className="option_alphabate_div  d-flex align-items-center justify-content-center ">
                         <span className="option_alphabate">B</span>
                     </div>
                     <div className="option_text">
                     {currentQuestionNumber? questionsArray[currentQuestionNumber-1].allOptions[1] : ""}
                     </div>
                 </div>
                </div>
              </div>

              <div className="row my-4">
                <div className="col-md-12">
                <div className={quizoptionsState.C ? activeOptionStyle : optionStyle}   onClick={optionCClick}>
                     <div className="option_alphabate_div  d-flex align-items-center justify-content-center ">
                         <span className="option_alphabate">C</span>
                     </div>
                     <div className="option_text">
                     {currentQuestionNumber? questionsArray[currentQuestionNumber-1].allOptions[2] : ""}
                     </div>
                 </div>
                </div>
              </div>

              <div className="row my-4">
                <div className="col-md-12">
                <div className={quizoptionsState.D ? activeOptionStyle : optionStyle}  onClick={optionDClick} >
                     <div className="option_alphabate_div  d-flex align-items-center justify-content-center ">
                         <span className="option_alphabate">D</span>
                     </div>
                     <div className="option_text">
                     {currentQuestionNumber? questionsArray[currentQuestionNumber-1].allOptions[3] : ""}
                     </div>
                 </div>
                </div>
              </div>  
             </div>
            </div>

            <div className="window_bottom_div d-flex align-items-center justify-content-between m-auto">
              <div className="quiz_previous_btn_div">
              {currentQuestionNumber>1?
              <>
                <Button variant="contained" onClick={previousButtonClick}  className="quiz_previous_btn" startIcon={<KeyboardArrowLeftIcon/>}>
                 Previous
               </Button> 
               </> : null}
              </div>
              <div className="quiz_next_btn_div">
              <Button variant="contained"  onClick={nextButtonClick}  className="quiz_next_btn" endIcon={<KeyboardArrowRightIcon/>}>
                 {currentQuestionNumber<totalQuestions ? "Next" : "Finish"}
               </Button>
              </div>

            </div>
          </div>


          </section>
        </>
    );
}

export default QuizWindow;