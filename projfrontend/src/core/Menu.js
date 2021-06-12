import React, {Fragment} from 'react'
//fragment is a empty container like <div>
import {Link, withRouter} from "react-router-dom"
import {signOut, isAutheticated} from "../auth/helper"

const currentTab = (history, path) => {
    if(history.location.pathname === path){
        return {color: "#2ecc71"};
    }else{
        return {color: "FFFFFF"};
    }
};

 const Menu = ({history, path}) => {
     //current path and what path you were on before. so we use history for that
    return (
        <div>
            <ul className="nav nav-tabs bg-dark">
                <li className="nav-item">
                    <Link style={currentTab(history, "/")} className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link style={currentTab(history, "/cart")} className="nav-link" to="/cart">My Cart</Link>
                </li>
                {isAutheticated() && (
                    <li className="nav-item">
                    <Link style={currentTab(history, "/user/dashboard")} className="nav-link" to="/user/dashboard">My Dashboard</Link>
                </li>
                )}
                {!isAutheticated() && (
                    <Fragment>
                    <li className="nav-item">
                    <Link style={currentTab(history, "/signup")} className="nav-link" to="/signup">Sign-Up</Link>
                </li>
                <li className="nav-item">
                    <Link style={currentTab(history, "/signin")} className="nav-link" to="/signin">Sign-In</Link>
                </li>
                    </Fragment>
                )}
                
                {isAutheticated() && (
                    <li className="nav-item">
                    <span
                    onClick={() => {signOut( () => {
                            history.push("/"); 
                        })
                    }}
                    className="nav-link text-warning">Sign-Out</span>
                </li>
                )}

            </ul>
        </div>
    )
}

export default withRouter(Menu)
//use menu with router
