import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from './Store/actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
import Layout from './hoc/Layout/Layout';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder';
//import Checkout from './container/Checkout/Checkout';
//import Orders from './container/Orders/Orders';
//import Auth from './container/Auth/Auth';
import Logout from './container/Auth/Logout/Logout';

const asyncCheckout = asyncComponent(() => {
    return import('./container/Checkout/Checkout');
});
const asyncOrders = asyncComponent(() => {
    return import('./container/Orders/Orders');
});
const asyncAuth = asyncComponent(() => {
    return import('./container/Auth/Auth');
});


class App extends Component {
    componentDidMount() {
		this.props.onTryAutoSignup();
	}
			
  render() {
	  
	  let routes = (
		  <Switch>
			  <Route path="/auth" component={asyncAuth} />
			  <Route path="/" exact component={BurgerBuilder} />
                <Redirect to="/" />
		  </Switch>
	  );
	  if(this.props.isAuthenticated) {
		  routes = (
			  <Switch>
				<Route path="/checkout" component={asyncCheckout} />
				<Route path="/orders" component={asyncOrders} />
				<Route path="/auth" component={asyncAuth} />
				<Route path="/logout" component={Logout} />
				<Route path="/" exact component={BurgerBuilder} />  
                <Redirect to="/" />
			  </Switch>
		  );
      }
	  
    return (
      <div>
        <Layout>
            {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token !== null
	}
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
