import { NavLink } from "react-router-dom";
import "../css/Navbar.css";

const Navbar = ({userLoginStatus, userName}) => {
    return(
        <>
<nav className="navbar navbar-expand-lg fixed-top ">
  <div className="container">
    <a href="/" className="navbar-brand">Sun-Tech</a>
    <button className="navbar-toggler  navbar-light" type="button" data-toggle="collapse" data-target=".navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className=" w-100 text-center"><h1 className="nav_app_heading m-auto pb-0">Modern Quiz</h1></div>
    <div className="collapse navbar-collapse navbarSupportedContent" id="">
      <ul className="navbar-nav ml-auto text-center">
        <li className="nav-item">
          <NavLink className="nav-link " activeClassName="navlink_active" exact to="/" aria-current="page" >Quiz</NavLink>
        </li>
        {userLoginStatus ? 
          <>
          {/* User already login. sHOW LOGOUT option */}
            <li className="nav-item">
            <span className="nav-link"  aria-current="page">{userName}</span>
            </li>
            <li className="nav-item">
            <NavLink className="nav-link" activeClassName="navlink_active" exact to="/logout" aria-current="page">Logout</NavLink>
            </li>
          </> : 
          //User not login or register yet.
          <>
           <li className="nav-item">
             <NavLink className="nav-link" activeClassName="navlink_active" exact to="/register" aria-current="page" >Register</NavLink>
           </li>
           <li className="nav-item">
             <NavLink className="nav-link" activeClassName="navlink_active" exact to="/login" aria-current="page">Login</NavLink>
           </li>
        </> }
      </ul>
  
    </div>
  </div>
</nav>

        </>
    );
}

export default Navbar;