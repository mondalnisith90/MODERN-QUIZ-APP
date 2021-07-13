import { useParams } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from '@material-ui/core/Button';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import QuizResult from "./QuizResult";
import "../css/QuizWindow.css";


let questionsArray = [];
let timmerObj = null;


const QuizWindow = () => {
    const {id, difficultyLevel, totalQuestions, catogery} = useParams();
 
    const [timmer, setTimmer] = useState({minute: 0, second: 0});
    const [startTimmer, setTimmerStatus] = useState(false);
    useEffect(() => {
      fetchDataFromApi();
    }, []);

    useEffect(()=> {
      if(startTimmer){
      const totalTimeMinute = Math.floor(totalQuestions*0.8); //total time in minute
      // const totalTimeMinute = 1;
      let totalTimeSecond = totalTimeMinute * 60; //total time in second
      timmerObj = setInterval(() => {
        if(totalTimeSecond >=0){
          let minute = Math.floor(totalTimeSecond/60);
        let second = totalTimeSecond % 60;
        setTimmer({minute: minute, second: second});
        totalTimeSecond--;
        }
      }, 1000);
      return ()=> clearInterval(timmerObj);
    }
    },[startTimmer]);


    useEffect(()=>{
      if(timmer.minute == 0 && timmer.second == 1){
        clearInterval(timmerObj);
        setQuizSubmit(true);
      }
    }, [timmer.second]);


    const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0); 
    const [quizoptionsState, setQuizOptionState] = useState({A: false, B: false, C: false, D: false});
    //This is required to show and hide quiz window and quiz result window
    //When 'quizSubmit' value is false then show 'quiz window' and hide 'quiz result window' and
    //when 'quizSubmit' value is true then hide 'quiz window' and show 'quiz result window'
    const [quizSubmit, setQuizSubmit] = useState(false);

    const optionStyle = "individual_option_div d-flex align-items-center justify-content-start shadow";
    const activeOptionStyle = "individual_option_div d-flex align-items-center justify-content-start shadow active";

    const fetchDataFromApi = async () => {
      questionsArray = [];
      let apiUrl = ``;
      if(difficultyLevel == "any"){
        apiUrl = `https://opentdb.com/api.php?amount=${totalQuestions}&category=${id}&type=multiple`;
      }else{
        apiUrl = `https://opentdb.com/api.php?amount=${totalQuestions}&category=${id}&difficulty=${difficultyLevel}&type=multiple`;
      }
      
      try{
        const apiResponse = await axios.get(apiUrl);
        const apiData = apiResponse.data;
        if(apiData.response_code == 0){
          //means successful. For more information see the api docs.
          const allQuestions = apiResponse.data.results; //this will give an array of all questions
          allQuestions.map((value, index)=> {
            questionsArray.push({question: value.question, catogery: value.category, difficultyLevel: value.difficulty,
               allOptions: shuffleArray([...value.incorrect_answers, value.correct_answer]), currectAnswer: value.correct_answer, userAnswer: null, userSelectedOption: null});
          });
          setCurrentQuestionNumber(1);
          setTimmerStatus(true);
         
        }else{
          //means something wrong. not get  data from api
          throw new Error("Data not found");
        }
        
      }catch(error){
        console.log(error);
      }
    }


    const shuffleArray = (array) => {
      //change the array element position randomly
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
  }

   

    const previousButtonClick = () => {
      if(currentQuestionNumber>1){
        console.log("prev= "+currentQuestionNumber);
        setCurrentQuestionNumber(currentQuestionNumber-1);
        console.log("next= "+currentQuestionNumber);
         //check here if next question's option is already selected by the user or not
         if(questionsArray[currentQuestionNumber - 2].userSelectedOption){
          //Some option is selected by the user for this particular question
          switch (questionsArray[currentQuestionNumber - 2].userSelectedOption) {
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
        if(questionsArray[currentQuestionNumber].userSelectedOption){
          //Some option is selected by the user for this particular question
          switch (questionsArray[currentQuestionNumber].userSelectedOption) {
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
          //user wants to submit quiz
          clearInterval(timmerObj);
          setQuizSubmit(true);
         

        }else{
          //when click cancel
        }
      }      
    }

    const quizTimeFinished = () => {
      //Quiz time is over i.e. finished
      // clearInterval(timmerObj);
      setQuizSubmit(true);
    }

    if(timmer.minute== 0 && timmer.second == 0){
      // quizTimeFinished();
    }

    const optionAClick = () => {
      setQuizOptionState({A: true, B: false, C: false, D: false});
      //store which option is selected by the user in object of array
      questionsArray[currentQuestionNumber-1].userAnswer = questionsArray[currentQuestionNumber-1].allOptions[0];
      questionsArray[currentQuestionNumber-1].userSelectedOption = "A";
    }

    const optionBClick = () => {
      setQuizOptionState({A: false, B: true, C: false, D: false});
        //store which option is selected by the user in object of array
        questionsArray[currentQuestionNumber-1].userAnswer = questionsArray[currentQuestionNumber-1].allOptions[1];
        questionsArray[currentQuestionNumber-1].userSelectedOption = "B";
    }

    const optionCClick = () => {
      setQuizOptionState({A: false, B: false, C: true, D: false});
        //store which option is selected by the user in object of array
        questionsArray[currentQuestionNumber-1].userAnswer = questionsArray[currentQuestionNumber-1].allOptions[2];
        questionsArray[currentQuestionNumber-1].userSelectedOption = "C";
    }

    const optionDClick = () => {
      setQuizOptionState({A: false, B: false, C: false, D: true});
        //store which option is selected by the user in object of array
        questionsArray[currentQuestionNumber-1].userAnswer = questionsArray[currentQuestionNumber-1].allOptions[3];
        questionsArray[currentQuestionNumber-1].userSelectedOption = "D";
    }

    return(
        <>
          <section className="quizwindow_root_div">

          {!quizSubmit ? 
          <>

          <div className="d-flex align-items-center justify-content-center m-auto p-2">

           <div className="quizwindow_main_div shadow"> 
            <div className="window_top_div d-flex align-items-center justify-content-between">
              <div className="question_number_div ">
                  <span style={{color: "#3fc904"}}>{currentQuestionNumber}</span><span style={{color: "#aa00ee"}}>/{totalQuestions}</span>
              </div>
              <div className="timmer_div d-flex align-items-center justify-content-center">
                  <span className="timmer_span" >{timmer.minute<10 ? "0"+timmer.minute : timmer.minute}:{timmer.second<10 ? "0"+timmer.second : timmer.second}</span>
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
          </div>
          </> :

          <QuizResult id={id}  totalQuestions={totalQuestions} catogery={catogery} questionsArray={questionsArray} />  }


          </section>
        </>
    );
}

export default QuizWindow;