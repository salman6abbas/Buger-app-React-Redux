import React, { Fragment, useEffect, useState } from 'react'
import Modal from '../../UI/Modal/Modal'
import useHttpErrorHandler from '../../../hooks/Http-error-handler'

const withErrorHandler=(WrappedComponent, axios)=>{
    return props =>{
        const [error, clearError] = useHttpErrorHandler(axios)
    
        return (
        <Fragment>
        <Modal 
        show={error}
        modalClosed={clearError}>
            {error? error.message : null}
        </Modal>    
        <WrappedComponent {...props}/>
        </Fragment>
        )
    }
}


export default withErrorHandler;