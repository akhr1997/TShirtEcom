import React, {useState, useEffect} from "react";
import Base from "./Base";
import { getProducts } from "./helper/coreapicalls";
import "../../src/styles.css"
import Card from "./Card";

export default function Home() {

    const [products, setProducts] = useState([]);//product is like name of box, what we insert inside box is
    //get products. first [] in useState is empty. that tells products is empty. setProducts is managed by setState

    const [error, setError] = useState(false);// false because initial value of error is false.

    const loadAllProducts = () => {
        getProducts()
          .then((data) => {
            if (data && data?.error) {
              setError(data.error);
              console.log(error);
            } else {
              setProducts(data);
            }
          });
      };

        useEffect(() => {
            loadAllProducts();
        }, []);
//useeffects will run loadallproducts function

    return ( 
        <Base title="Home Page" description="Welcome to Tee-Store">
            <h1>
                Home Component
            </h1>
            <div className="row">
                {products && products.map( (product, index) => {
                    return(
                        <div key={index} className="col-4 mb-4">
                            <Card product={product}/>
                        </div>
                    );
                })}
            </div>
        </Base>
    );
}