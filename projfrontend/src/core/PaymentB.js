import React, {useState, useEffect} from "react"
import { Redirect } from "react-router-dom"
import {cartEmpty} from "./helper/cartHelper"
import {getMeToken, processPayment} from "./helper/paymentHelper"
import {createOrder} from "./helper/orderHelper"
import {isAutheticated, signOut} from "../auth/helper/index"
import DropIn from "braintree-web-drop-in-react"

const PaymentB = ({
    products,
    reload = undefined,
    setReload = f => f,
}) => {

    const [info, setInfo] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: "",
        instance ={}
    })

    const userId = isAutheticated && isAutheticated().user.id;
    const token = isAutheticated && isAutheticated().token;

    const getToken = (userId, token) => {
        getMeToken(userId, token)
        
        .then(info => {
            if(info.error){
                setInfo({
                    ...info,
                    error: info.error
                });
                signOut(() => {
                    return <Redirect to="/" />
                });
            }else{
                const clientToken = info.clientToken;
                setInfo({clientToken: clientToken})
            }
        })
    }

    useEffect(() => {
        getToken(userId, token)
    }, []);

    return (
        <div>
            <h1>Payment B</h1>
        </div>
    )
}

export default PaymentB
