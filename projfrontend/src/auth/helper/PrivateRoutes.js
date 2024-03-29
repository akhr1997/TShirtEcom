import React from 'react'
import { Route, Redirect } from 'react-router';
import {isAutheticated} from "./index"

const PrivateRoutes = ({ component: Component, ...rest }) => {
    return (
        <Route
          {...rest}
          render={props =>
          isAutheticated()
            ? (
              <Component {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: "/signin",
                  state: { from: props.location }
                }}
              />
            )
          }
        />
      );
}

export default PrivateRoutes