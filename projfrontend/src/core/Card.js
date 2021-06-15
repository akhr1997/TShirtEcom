import React, {useState} from 'react'
import ImageHelper from "./helper/ImageHelper"
import {Redirect} from "react-router-dom"
import { addItemToCart, removeItemFromCart } from './helper/cartHelper';
import {isAutheticated} from "../auth/helper"

// const isAuthenticated = true;

const Card = ({
    product,
    addtoCart = true,
    removeFromCart = false,
    reload = undefined,
    setReload = f => f
    //reload and setreload is to refresh the page when item is removed from the cart
    // function(f){return f}
    //we use this so that there is some change in the state and thus the state is reloaded by the react
    //also called fourse mounting of component as we need to refresh the cart component when item is removed from the cart

}) => {

    const [redirect, setRedirect] = useState(false)

    const cartTitle= product ? product.name : "Default Photo"
    const cartDescription= product ? product.description : "Default description"
    const cartPrize = product ? product.prize : "Default Prize"

    const addToCart = () => {
        if(isAutheticated()){
          addItemToCart(product, () => setRedirect(true))
            console.log("Added to cart")
        }else{
            console.log("Please login first")
        }
    };

    const getARedirect = (redirect) => {
        if(redirect){
            return <Redirect to="/cart" />
        }
    };

    const showAddToCartButton = (addToCart) => {
        return(
          addtoCart && (
                <button
                onClick={addToCart}
                className="btn btn-block btn-outline-success mt-2 mb-2"
              >
                Add to Cart
              </button>
            )
        );
    };

    const showRemoveFromCartButton = (removeFromCart) => {
        return(
            removeFromCart && (
                <button
                onClick={() => {
                  removeItemFromCart(product._id)
                  setReload(!reload)
                  //flipping the switch so that there is a change in state and component reloads
                  console.log("Product Removed from cart.")
                }}
                className="btn btn-block btn-outline-danger mt-2 mb-2"
              >
                Remove from cart
              </button>
            )
        );
    };

    return (
      <div className="card text-white bg-dark border border-info ">
        <div className="card-header lead">{cartTitle}</div>
        <div className="card-body">
        {getARedirect(redirect)}
          <ImageHelper product={product}/>
          <p className="lead bg-success font-weight-normal text-wrap">
            {cartDescription}
          </p>
          <p className="btn btn-success rounded  btn-sm px-4">$ {cartPrize}</p>
          <div className="row">
            <div className="col-12">
              {showAddToCartButton(addToCart)}
            </div>
            <div className="col-12">
              {showRemoveFromCartButton(removeFromCart)}
            </div>
          </div>
        </div>
      </div>
    );
  };

export default  Card;