import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Lettuce', type: 'lettuce' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Patty', type: 'patty' },
];

//<button className = {classes.BuildControl}>Clear All</button>
//Clear all for each ingredient?
const buildControls = (props) => (
    <div className = {classes.BuildControls}>
        <p> Current Price: <strong>${props.price.toFixed(2)}</strong></p>
        <button className = {classes.ClearAll}
                onClick = {() => props.ingredientClearAll()}
                disabled = {!props.clearable}> CLEAR ALL </button>
        {controls.map(ctrl => (
            <BuildControl 
                key = {ctrl.label} 
                label = {ctrl.label}
                added = {() => props.ingredientAdded(ctrl.type)}
                removed = {() => props.ingredientRemoved(ctrl.type)}
                clear = {() => props.ingredientClear(ctrl.type)}
                disabled = {props.disabled[ctrl.type]}
            />
        ))}
        <button className = {classes.OrderButton}
                disabled = {!props.purchasable}>ORDER NOW</button>
    </div>
);

export default buildControls;