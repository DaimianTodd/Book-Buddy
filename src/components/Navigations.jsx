import React from "react";
import {Link} from "react-router-dom";

export default function Navigation(){
    return(
        <div id = "navBar">
            <Link to = '/Account'>Account</Link>
            <br/>
            <Link to = '/Books'>Books</Link>
            <br/>
            <Link to = '/Login'>Login</Link>
            <br/>
            <Link to = '/Register'>Register</Link>
            <br/>
            
        </div>
    )
}