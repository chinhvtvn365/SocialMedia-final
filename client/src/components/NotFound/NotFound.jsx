import React from 'react'
import "./NotFound.css"
import { Link } from 'react-router-dom';
import notfound from "../../img/404notfound.jpg";

const NotFound = () => {
  return (
    <div className="NotFound">
       <h1>Something went wrong.</h1>
       <div className="Notfound-info">
        <div className="Notfound-img">
        <img src={notfound} alt="" />
        </div>
        <div className="Notfound-text">
          <h1>404</h1>
          <h3>Sorry, we can't find the page.</h3>
          <Link to="/timeline" className="button Notfound-bt">Back to timeline <i class="fa-solid fa-arrow-right"></i></Link>
        </div>
       </div>
    </div>
  )
}

export default NotFound