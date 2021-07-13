import QuizCatogery from "../Data/QuizCatogery";
import CatogeryCard from './CatogeryCard';
import "../css/Quiz.css";

const Quiz = () => {
    const catogeryRowCount = [1,2,3,4,5,6,7,8,9,10,11,12];
    let count = -1;
    return(
        <> 
         <section className="root_div">
         <div className="header_img_div">
         <h1 className="quiz_catogery_header">Select Quiz Catagory</h1>
             <hr className="horizental_line"/>
           <div className="quiz_catagory_div container">
           
             {
                catogeryRowCount.map((value, index)=>{
                    return(<>
                    <div className="row" key={index}>
                   <CatogeryCard id={QuizCatogery[++count].id} catogery={QuizCatogery[count].catogery} Icon={QuizCatogery[count].icon} />
                   <CatogeryCard id={QuizCatogery[++count].id} catogery={QuizCatogery[count].catogery} Icon={QuizCatogery[count].icon} />
                 </div>
                    </>)
                })
             }
           </div> 
          </div>

         </section>
        </>
    );
}

export default Quiz;