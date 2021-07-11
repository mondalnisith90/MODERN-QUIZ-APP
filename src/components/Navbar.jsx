import { NavLink } from "react-router-dom";
import "../css/Navbar.css";

const Navbar = () => {
    return(
        <>
<nav className="navbar navbar-expand-lg fixed-top ">
  <div className="container">
    <a className="navbar-brand" href="#">Sun-Tech</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ml-auto text-center">
        <li className="nav-item">
          <NavLink className="nav-link " activeClassName="navlink_active" exact to="/" aria-current="page" >Quiz</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" activeClassName="navlink_active" exact to="register" aria-current="page" >Register</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" activeClassName="navlink_active" exact to="/login" aria-current="page">Login</NavLink>
        </li>
      </ul>
  
    </div>
  </div>
</nav>

        </>
    );
}

export default Navbar;