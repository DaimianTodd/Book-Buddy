import React from "react";
import {Link} from "react-router-dom";

export default function Navigation(){
    return(
        <div id = "navBar">
            <Link to = '/Account'>Account</Link>
            <br/>
            <Link to = '/Books'></Link>
            <br/>
            <Link to = '/Login'></Link>
            <br/>
            <Link to = '/Register'></Link>
            <br/>
            
        </div>
    )
}