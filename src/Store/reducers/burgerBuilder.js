import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    ingredients: null,
    totalPrice: 2,
    error: false,
    building: false
}

const INGREDIENT_PRICES = {
    salad: 0.2,
    bacon: 0.5,
    chesse: 0.4,
    meat: 1.5
}

const addIngredient = (state, action) => {
     const updatedIng = {
            [action.ingredientType]: state.ingredients[action.ingredientType] + 1
        };
        const updatedIngs = updateObject(state.ingredients, updatedIng);
        const updatedSt = {
            ingredients: updatedIngs,
            totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientType],
            building: true
        }
        return updateObject(state, updatedSt);
}

const removeIngredient = (state, action) => {
     const updatedIngredient = {
            [action.ingredientType]: state.ingredients[action.ingredientType] + 1
        };
        const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
        const updatedState = {
            ingredients: updatedIngredients,
            totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientType],
            building: true
        }
        return updateObject(state, updatedState);
}

const setIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: action.ingredients,
        totalPrice: 2,
        error: false,
        building: false
    });
}

const fetchIngredientsFailed = (state, action) => {
    return updateObject(state, {
        error: true
    });
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_INGRDIENT: return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case actionTypes.SET_INGRDIENTS: return setIngredients(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action);
        default: return state;
    }
}

export default reducer;