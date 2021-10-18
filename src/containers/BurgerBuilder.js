import React, { useState, useEffect, Fragment } from 'react'
import Burger from '../components/Burger/Burger';
import BuildControls from '../components/Burger/BuildControls/BuildControls'
import Modal from '../components/UI/Modal/Modal'
import OrderSummary from '../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../components/UI/Spinner/Spinner'
import withErrorHandler from '../components/hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../store/actions/index'
import axios from '../axios-orders'

const BurgerBuilder = props =>{
    const [purchasing, setPurchasing] = useState(false)
    
    
    useEffect(()=>{
        props.onInitIngredients();
    }, [])
   
    const updatePurchasable = (ingredients) =>{
        const sum=Object.keys(ingredients)
        .map(igkey=>{
            return ingredients[igkey]
        })
        .reduce((sum,el)=>{
            return sum+el;
        },0);
        return sum>0;
    }
   
    // addIngredientHandler =(type)=>{
    //     const oldCount=this.state.ingredients[type];
    //     const updatedCount= oldCount+1;
    //     const updatedIngredients={
    //         ...this.state.ingredients
    //     }
        
    //     updatedIngredients[type]=updatedCount
    //     const PriceAddition= INGREDIENT_PRICES[type]
    //     const oldPrice=this.state.totalPrice;
    //     const updatedPrice = oldPrice+PriceAddition
    //     this.setState({ingredients:updatedIngredients, totalPrice:updatedPrice})
    //     this.updatePurchasable(updatedIngredients)

    // }
    // removeIngredientHandler=(type)=>{
    //     const oldCount=this.state.ingredients[type];
    //     if (oldCount<=0){
    //         return;
    //     }
    //     const updatedCount=oldCount-1;
    //     const updatedIngredients={
    //         ...this.state.ingredients
    //     }
    //     updatedIngredients[type]=updatedCount;
    //     const priceReduction=INGREDIENT_PRICES[type];
    //     const oldPrice=this.state.totalPrice
    //     const updatedPrice=oldPrice-priceReduction
    //     this.setState({ingredients:updatedIngredients, totalPrice:updatedPrice})
    //     this.updatePurchasable(updatedIngredients)
    // }
    const purchaseHandler=()=>{
        if(props.isAuthenticated){
        setPurchasing(true)
    } else{
        props.onSetAuthRedirectPath('/checkout');
        props.history.push('/auth')
    }
}
    const purchaseCancelHandler=()=>{
        setPurchasing(false)
    }
    const purchaseContinueHandler=()=>{
        props.onInitPurchase()
        props.history.push('/checkout')
    }
        const disableInfo={
            ...props.ings
        }
        for(let key in disableInfo){
        disableInfo[key]=disableInfo[key]<=0;
        }
        let orderSummary= null
        
        // if (this.state.loading){
        //     orderSummary=<Spinner/>
        // }
        let burger= props.error? <p>Cant be Loaded</p> : <Spinner />
        if (props.ings){
            burger= (
            <Fragment>
            <Burger ingredients={props.ings}/>
            <BuildControls 
            ingredientAdded={(ingName)=>props.onIngredientAdded(ingName)} 
            ingredientRemoved={(ingName)=>props.onIngredientRemoved(ingName)} 
            disabled={disableInfo}
            purchasable={updatePurchasable(props.ings)}
            price={props.price}
            ordered={purchaseHandler}
            isAuth= {props.isAuthenticated}/>
         </Fragment>
         
            )
        orderSummary=<OrderSummary 
        ingredients={props.ings} 
        price={props.price}
        purchaseCancelled={purchaseCancelHandler}
        purchaseContinued={purchaseContinueHandler}/>
        }
            
        return(
            <Fragment>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
           {burger}
            </Fragment>
        )
    }

const mapStateToProps=state=>{
    return{
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        onIngredientAdded: (ingName)=>dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName)=>dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: ()=>(dispatch(actions.initIngredients())),
        onInitPurchase: () =>(dispatch(actions.purchaseInit())),
        onSetAuthRedirectPath : (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));