
export function getCssValue(cssVariableName){
    const validElement = document.querySelector('.carousel');
    const computedStyle = getComputedStyle(validElement);
    let variableStringValue = computedStyle.getPropertyValue(cssVariableName).trim();

    if(variableStringValue.includes('rem')){
        variableStringValue = variableStringValue.replace('rem', '');
        return convertRemToPx(variableStringValue);
    }else return parseFloat(variableStringValue.replace('px', ''));
}

export function convertRemToPx(remValue){
    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const pixels = parseFloat(remValue) * rootFontSize;
    return pixels;
}

export function convertCategoryToArray(inputMap){
    let itemsArray = Object.values(inputMap);
    const namesArray = Object.keys(inputMap);
    itemsArray = itemsArray.slice(0, itemsArray.length-1);
    for(let i = 0; i<itemsArray.length; i++) itemsArray[i]["name"] = namesArray[i];
    return itemsArray;
}