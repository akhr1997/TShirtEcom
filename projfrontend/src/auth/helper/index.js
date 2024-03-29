import {API} from "../../backend"
import {cartEmpty} from "../../core/helper/cartHelper"

export const signUp = (user) =>{
    return fetch(`${API}user/`,{
    method: "POST",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
    body: JSON.stringify(user)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err))
};

export const signIn = (user) => {
    const formData = new FormData()

    for(const name in user){
        formData.append(name, user[name]) //for appending name in form since we have only email and password.
    }

    return fetch(`${API}user/login/`,{
        method: "POST",
        body: formData
    })
    .then(response => {
        console.log("SUCCESS", response)
        return response.json();
    })
    .catch(err => console.log(err))
}

export const authenticate = (data, next) => {
    if(typeof window !== undefined){
        localStorage.setItem("jwt", JSON.stringify(data))//store strings of 'data' in jwt token
        next();
    }
}

export const isAutheticated = () => {
    if(typeof window == undefined){
        return false;
    }

    if(localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt"))
    }else{
        return false;
    }
}

export const signOut = (next) => {
    const userId = isAutheticated() && isAutheticated.user.id

    if(typeof window !== undefined){
        localStorage.removeItem("jwt")
        cartEmpty(() => {});
        //next();

        return fetch(`${API}user/logout/${userId}`, {
            method: "GET"
        })
        .then(response => {
            console.log("Signout success")
            next()
        })
        .catch(err => console.log(err))
    }
}