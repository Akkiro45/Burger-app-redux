import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGRDIENT,
        ingredientType: name
    };
}

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientType: name
    };
}

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGRDIENTS,
        ingredients: ingredients
    };
}

export const fetchIngredientsFalied = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('https://react-my-burger-e8dee.firebaseio.com/ingredients.json')
            .then(response => {
//            this.setState({ingredients: response.data});
            dispatch(setIngredients(response.data));
        }).catch(error => {
            dispatch(fetchIngredientsFalied());
        });
    };
}