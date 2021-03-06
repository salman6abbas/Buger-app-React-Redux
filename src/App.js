import './App.module.css';
import React, { Suspense, useEffect } from 'react';
import Layout from './containers/Layout/Layout'; 
import BurgerBuilder from './containers/BurgerBuilder';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index'

const Checkout = React.lazy(() => {
  return import ('./containers/Checkout/Checkout')
})
const Orders = React.lazy(()=>{
  return import ('./containers/Orders/Orders')
})
const Auth = React.lazy(()=>{
  return import ('./containers/Auth/Auth')
})


const App = props =>{

  useEffect(()=>{
    props.onTryAutoSignUp()
  },[])
  
    let routes = (
      <Switch>
      <Route path='/auth' render={props => <Auth {...props}/>}/>
      <Route path='/' exact component= {BurgerBuilder} />
      <Redirect to = '/'/>
      </Switch>
    )

    if(props.isAuthenticated){
      routes= (
        <Switch>
        <Route path='/checkout' render={props => <Checkout {...props}/>} />
        <Route path='/orders' render={props => <Orders {...props} />}/>
        <Route path='/logout' component={Logout} />
        <Route path='/auth' render={props => <Auth {...props}/>}/>  
        <Route path='/' exact component= {BurgerBuilder} />
        <Redirect to = '/'/>
        </Switch>
      )
    }
    return(
    <div>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>
        {routes}
        </Suspense>
      </Layout>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch =>{
  return{
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
