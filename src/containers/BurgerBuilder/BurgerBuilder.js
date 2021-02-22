import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    lettuce: 0.50,
    cheese: 0.40,
    patty: 1.30,
    bacon: 0.70
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            lettuce: 0,
            bacon: 0,
            cheese: 0,
            patty: 0
        },
        totalPrice: 4.00,
        purchasable: false,
        clearable: false
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({purchasable: sum > 0});
    }

    updateClearableState (ingredients) {
        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey]
        })
        .reduce((sum, el) => {
            return sum + el;
        }, 0);
        this.setState({clearable: sum > 0})
    }

    addIngredientHandler = (type) => {
        //const oldCount = this.state.ingredients[type];
        // const updatedCount = this.state.ingredients[type] + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = this.state.ingredients[type] + 1;
        //const priceAddition = INGREDIENT_PRICES[type];
        //const oldPrice = this.state.totalPrice;
        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
        this.updateClearableState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const updatedIngredients = {
            ...this.state.ingredients
        };
        if (updatedIngredients[type] > 0) {
            updatedIngredients[type] = this.state.ingredients[type] - 1;

            const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
            this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        }
        this.updatePurchaseState(updatedIngredients);
        this.updateClearableState(updatedIngredients);
    }

    clearIngredientHandler = (type) => {
        const updatedIngredients = {
            ...this.state.ingredients
        }
        if (updatedIngredients[type] > 0) {
            const oldAmount = updatedIngredients[type];
            updatedIngredients[type] = 0;

            const newPrice = this.state.totalPrice - ((oldAmount)*INGREDIENT_PRICES[type]);
            this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        }
        this.updatePurchaseState(updatedIngredients);
        this.updateClearableState(updatedIngredients);
    }

    clearAllHandler = () => {
        let updatedIngredients = {
            ...this.state.ingredients
        }
        for (let ingredient in updatedIngredients) {
            updatedIngredients[ingredient] = 0
        }
        const newPrice = 4.00;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
        this.updateClearableState(updatedIngredients);
    }

    render () {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = (disabledInfo[key] <= 0)
        }
        // lettuce: true, patty: true, ...
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    ingredientAdded = {this.addIngredientHandler}
                    ingredientRemoved = {this.removeIngredientHandler}
                    ingredientClear = {this.clearIngredientHandler} 
                    disabled = {disabledInfo}
                    price = {this.state.totalPrice} 
                    purchasable = {this.state.purchasable}
                    clearable = {this.state.clearable}
                    ingredientClearAll = {this.clearAllHandler}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;