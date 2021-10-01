//Auth route

import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const BasicRoute = ({ children, authenticated, session, ...rest }) => {
  console.log(session);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !authenticated ? (
          children
        ) : (
          <Redirect
            to={{ pathname: "/dashboard", state: { from: location } }}
          />
        )
      }
    />
  );
};

const mapStateToProps = ({ session }) => ({
  authenticated: session.authenticated,
  session: session,
});
export default connect(mapStateToProps)(BasicRoute);
