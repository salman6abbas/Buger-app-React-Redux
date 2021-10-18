import React, { Fragment } from 'react';
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.module.css'
import BackDrop from '../../UI/Modal/Backdrop/Backdrop'

const sideDrawer=(props)=>{
    let attachedClasses=[classes.SideDrawer, classes.Close]
    if(props.open){
        attachedClasses=[classes.SideDrawer,classes.Open]
    }
    return(
        <Fragment>
        <BackDrop show={props.open} clicked={props.closed}/>
        <div className={attachedClasses.join(' ') } onClick={props.closed}>
            <div className={classes.Logo}><Logo/></div>
            <nav>
                <NavigationItems isAuthenticated={props.isAuth}/>
            </nav>
        </div>
        </Fragment>
    )
}

export default sideDrawer;