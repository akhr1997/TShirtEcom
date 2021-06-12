import React , {useState} from 'react'
import Base from "../core/Base"
import {Link, Redirect} from 'react-router-dom' //similar to a or href tags in HTML
import { signUp, authenticate, isAutheticated, signIn } from '../auth/helper'



const Signin = () => {

    const [values, setValues] = useState({
        name: "",
        email: "ashwin@gmail.com",
        password: "12345",
        error: "",
        success: false,
        loading: false,
        didRedirect: false
    })

    const {name,email, password, error, success, loading, didRedirect} = values //destructuring the values to use it below

    const handleChange = (name) => //if user is filling the name textbox, name will be updated in [name]
        (event) => {
            setValues({...values, error: false, [name]: event.target.value});// ...value will load previous values.
    };

    const onSubmit = (event) =>{
        event.preventDefault();
        setValues({...values, error: false, loading:true})
        signIn({email, password})
        .then(data => {
            console.log("DATA", data);
            if(data.token){
                // let sessionToken = data.token;
                authenticate(data, () => {
                    console.log("TOKEN ADDED");
                    setValues({
                        ...values,
                        didRedirect: true
                    })
                })
            }else{
                setValues({
                    ...values,
                    loading: false
                })
            }
        })
        .catch(e => console.log(e))
    }

    const performRedirect = () => {
        if (isAutheticated()) {
            return <Redirect to="/"/>
        } else {
            
        }
    };

    const loadingMessage = () => {
        return(
            loading && (
                <div className="alert alert-info">
                    <h2>Loading...</h2>
                </div>
            )
        );
    };
    
    const successMessage = () => {
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div
                    className="alert alert-success"
                    style={{display: success ? "" : "none"}}>
                    New Account creation success. Please <Link to="/signin">
                        Login Now
                    </Link>
                    </div>
                </div>
            </div>
        );
    }   


    const errorMessage = () => {
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div
                    className="alert alert-danger"
                    style={{display: error ? "" : "none"}}>
                    Check all fields again.
                    </div>
                </div>
            </div>
        );
    }

    const signInForm = () => {
        return(
            <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
                <form>
                    <div className="form-group">
                        <label className="text-light">Email</label>
                        <input
                        type="text"
                        className="form-control"
                        value={email}//what higherorder function is expecting as input.
                        onChange={handleChange("email")}
                        ></input>
                        <br/>
                    </div>
                    <div className="form-group">
                        <label className="text-light">Password</label>
                        <input
                        type="password"
                        className="form-control"
                        value={password}//what higherorder function is expecting as input.
                        onChange={handleChange("password")}
                        ></input>
                    </div>
                    <br/>
                    <button
                    onClick={onSubmit}
                    className="btn btn-success btn-block">Submit</button>
                </form>
            </div>
        </div>
        );
    }


    return (
        <Base title="Signin" description="Tee-Store">
        {loadingMessage()}
        {signInForm()}
            <p className="text-center">
            {JSON.stringify(values)} 
            {/* values comes from state and prints on frontend */}
            </p>
        {performRedirect()}
        </Base> 
    )
}

export default Signin