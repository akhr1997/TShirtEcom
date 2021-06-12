import React, {useState} from 'react'
import Base from "../core/Base"
import {Link} from 'react-router-dom' //similar to a or href tags in HTML
import {signUp} from "../auth/helper"

const Signup = () => {

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false
    });

    const {name,email, password, error, success} = values //destructuring the values to use it below

    //const handleChange = name => event => {} // higher order function. take multiple inputs and change values.
    //it takes a name and fire and "event" and a method for that.

    const handleChange = (name) => //if user is filling the name textbox, name will be updated in [name]
        (event) => {
            setValues({...values, error: false, [name]: event.target.value});// ...value will load previous values.
    };

    const onSubmit = (event) =>{
        event.preventDefault();
        setValues({...values, error: false})
        signUp({name, email, password})
        .then(data => {
            console.log("DATA", data)
            if(data.email === email){
                setValues({
                    ...values,
                    name: "",
                    email: "",
                    password: "",
                    error: "",
                    success: true
                })
            }else{
                setValues({
                    ...values,
                    error: true,
                    success: false
                })
            }
        })
        .catch(e => {console.log(e)})
    }

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

    const signUpForm = () => {
        return(
            <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
                <form>
                    <div className="form-group">
                        <label className="text-light">Name</label>
                        <input
                        type="text"
                        className="form-control"
                        value={name}//what higherorder function is expecting as input.
                        onChange={handleChange("name")}
                        ></input>
                        <br/>
                    </div>
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
        <Base title="Sign Up Page" description="Sign up to access the Tee Store">
        {successMessage()}
        {errorMessage()}
        {signUpForm()}
        <p className="text-white text-center">
            {JSON.stringify(values)}
            {/* values comes from state and prints on frontend */}
        </p>
        </Base>    
    )
}

export default Signup
