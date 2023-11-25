
export function getCssValue(cssVariableName){
    const validElement = document.querySelector('.carousel-outer');
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