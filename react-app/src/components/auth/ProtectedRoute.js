import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// const ProtectedRoute = props => {

//   if (!props.authenticated) {
//     return <Redirect to="/login"/>
//   }

//   return (
//     <Route {...props}/>
//   );
// };

// export default ProtectedRoute;

// There is a bug with the above code.  It tries to render all the
// protected components. The fix is below

const ProtectedRoute = props => {
  return (
    <Route {...props}>
      {props.authenticated ? props.children : <Redirect to="/login" />}
    </Route>
  )
};
export default ProtectedRoute;
