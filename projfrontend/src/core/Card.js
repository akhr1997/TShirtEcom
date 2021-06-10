import React from 'react'
import ImageHelper from "./helper/ImageHelper"
import {Redirect} from "react-router-dom"

const isAuthenticated = false;

const Card = ({
    product,
    addtoCart = true,
    removeFromCart = false
}) => {

    const cartTitle= product ? product.name : "Default Photo"
    const cartDescription= product ? product.description : "Default description"
    const cartPrize = product ? product.prize : "Default Prize"

    const addToCart = () => {
        if(isAuthenticated){
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
            addToCart && (
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
                onClick={
                    console.log("Product Removed from cart.")
                }
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