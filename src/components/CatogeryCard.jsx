import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import {NavLink} from "react-router-dom";
import "../css/CatogeryCard.css";


const CatogeryCard = ({id, catogery, Icon}) => {
    return(<>
       <div className="col-lg-4 col-md-4 col-sm-10 col-10 m-auto d-block card_item my-3 d-flex align-item-center">
    <Icon className="catogery_icon "/>
    <span className="catogery_name">{catogery}</span>
    <NavLink exact to={`/quizform/${id}/${catogery}`}>
       <DoubleArrowIcon  className="arrow_icon " />
    </NavLink>
   </div>
    </>);
   
}

export default CatogeryCard;

