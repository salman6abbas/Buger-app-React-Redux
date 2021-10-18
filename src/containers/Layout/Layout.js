import { Fragment, useState } from "react"
import React from 'react'
import classes from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import { connect } from "react-redux"

const Layout = props => {

    const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false)

    const sideDrawerClosedHandler = () => {
        setSideDrawerIsVisible(false)
    }
    const sideDrawerToggleHandler = () => {
        setSideDrawerIsVisible(!sideDrawerIsVisible)
    }

    return (
        <Fragment>
            <Toolbar
                isAuth={props.isAuthenticated}
                drawerToggleClicked={sideDrawerToggleHandler} />
            <SideDrawer
                isAuth={props.isAuthenticated}
                open={sideDrawerIsVisible}
                closed={sideDrawerClosedHandler} />
            <div>Toolbar, SideDrawer, Backdrop</div>
            <main class={classes.Content}>
                {props.children}
            </main>
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token != null
    }
}



export default connect(mapStateToProps)(Layout)