import { useHistory } from "react-router";
import axios from "axios";

const Logout = ({setUserLoginStatus}) => {
    const histroy  = useHistory();
    const userLogout = async () => {
        const url = "https://suntechnisith.herokuapp.com/users/logout"
        try {
            const serverResponse = await axios.get(url, {withCredentials: true});
            if(serverResponse.status === 200){
                //user logout. Now send the user to login page.
                setUserLoginStatus(false);
                histroy.push("/login");
            }
        } catch (error) {
            
        }
    }

    userLogout();

    return(<></>);
}

export default Logout;