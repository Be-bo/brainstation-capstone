// MARK: Functions
/**
 * Gets a currently computed CSS value for a specific CSS carousel variable so that we can mess with it realtime.
 * If the value is in rem the value also gets converted to px.
 * @param {string} cssVariableName - CSS name of the target property variable of a clothing carousel.
 * @returns {number} Current float value of the CSS variable provided as a param, converted to px.
 */
function getCssValue(cssVariableName){
    const validElement = document.querySelector('.carousel');
    const computedStyle = getComputedStyle(validElement);
    let variableStringValue = computedStyle.getPropertyValue(cssVariableName).trim();

    if(variableStringValue.includes('rem')){
        variableStringValue = variableStringValue.replace('rem', '');
        return convertRemToPx(variableStringValue);
    }else return parseFloat(variableStringValue.replace('px', ''));
}

/**
 * Converts a rem value to pixels.
 * @param {string} remValue - Value to convert from rem to pixels.
 * @returns {number} Target value converted from rem to pixels.
 */
function convertRemToPx(remValue){
    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const pixels = parseFloat(remValue) * rootFontSize;
    return pixels;
}

/**
 * Returns a skeleton clothing category array item to be stored in the Playground Redux Slice.
 * Fills out the category id and assigns default (empty) values to the rest.
 * @param {string} categoryId - The ID of the clothing category we're storing information for.
 * @returns {Object} A promise that resolves to the user object.
 * @property {string} category_id - The ID of the clothing category we're storing information for.
 * @property {string} selected_clothing_id - The ID of the clothing item currently selected by the user in the given carousel/category.
 * @property {Array} selected_color - A tuple containing the string literal name of the color and its corresponding string hex code, respectively.
 */
function setUpDefaultReduxCategoryItem(categoryId){
    return {
        category_id: categoryId,
        selected_clothing_id: '',
        selected_color: []
    }
}

const serverIP = '3.130.188.16:80';


// MARK: Exports
module.exports = {
    getCssValue,
    convertRemToPx,
    setUpDefaultReduxCategoryItem,
    serverIP
}
