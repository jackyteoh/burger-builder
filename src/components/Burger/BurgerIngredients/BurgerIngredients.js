import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './BurgerIngredients.css';

class BurgerIngredient extends Component {
    render () {
        let ingredient = null;

        switch (this.props.type) {
            case ('bun-bottom'):
                ingredient = <div className = {classes.BunBottom}></div>
                break;
            case ('bun-top'):
                ingredient = (
                    <div className = {classes.BunTop}>
                        <div className = {classes.Seeds1}></div>
                        <div className = {classes.Seeds2}></div>
                    </div>
                )
                break;
            case ('patty'):
                ingredient = <div className = {classes.Patty}></div>
                break;
            case ('lettuce'):
                ingredient = <div className = {classes.Lettuce}></div>
                break;
            case ('bacon'):
                ingredient = <div className = {classes.Bacon}></div>
                break;
            case ('cheese'):
                ingredient = <div className = {classes.Cheese}></div>
                break;
            default:
                ingredient = null;
        }
    
        return ingredient;
    }
}

BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired
};

export default BurgerIngredient;