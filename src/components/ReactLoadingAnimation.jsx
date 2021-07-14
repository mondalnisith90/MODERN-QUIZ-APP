import react from "react";
import ReactLoading from 'react-loading';

const ReactLoadingAnimation = ({type, color, width, height}) => {
    return(
         <ReactLoading type={type} color={color} height={height} width={width} />
    );
}

export default ReactLoadingAnimation;