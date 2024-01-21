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

export const colorHexList = {
    "Black": { hex: "#000000" },
    "White": { hex: "#ffffff" },
    "Grey": { hex: "#808080" },
    "Brown": { hex: "#A52A2A" },
    "Beige": { hex: "#F5F5DC" },
    "Navy": { hex: "#000080" },
    "Olive": { hex: "#808000" },
    "Burgundy": { hex: "#800020" },
    "Red": { hex: "#B22222" },
    "Blue": { hex: "#4169E1" },
    "Green": { hex: "#228B22" },
    "Yellow": { hex: "#FFD700" },
    "Purple": { hex: "#6A0DAD" },
    "Teal": { hex: "#008B8B" },
    "Cream": { hex: "#FFEFD5" },
    "Charcoal": { hex: "#464646" },
    "Tan": { hex: "#F0E68C" },
    "Maroon": { hex: "#B03060" },
    "Pink": { hex: "#FFB6C1" }
};

export const topUrlList = {
    "V-Neck Sweater": "http://3.145.198.110:80/public/v-neck-sweater.png",
    "Crew Neck Sweater": "http://3.145.198.110:80/public/crew-sweater.png",
    "Collar Sweater": "http://3.145.198.110:80/public/collar-sweater.png",
    "Cardigan": "http://3.145.198.110:80/public/cardigan.png",
    "Hoodie": "http://3.145.198.110:80/public/hoodie.png",
    "Blazer": "http://3.145.198.110:80/public/blazer.png",
    "Bomber Jacket": "http://3.145.198.110:80/public/bomber.png",
    "Leather Jacket": "http://3.145.198.110:80/public/leather-jacket.png",
    "Utility Jacket": "http://3.145.198.110:80/public/utility-jacket.png",
    "Shirt Jacket": "http://3.145.198.110:80/public/shirt-jacket.png",
    "Jean Jacket": "http://3.145.198.110:80/public/jean-jacket.png",
    "Trench Coat": "http://3.145.198.110:80/public/trench-coat.png",
    "Softshell Jacket": "http://3.145.198.110:80/public/softshell-jacket.png",
    "Puffer Jacket": "http://3.145.198.110:80/public/puffer-jacket.png",
    "Fur Parka": "http://3.145.198.110:80/public/fur-parka.png",
    "Ski Jacket": "http://3.145.198.110:80/public/ski-jacket.png",
};

export const shirtUrlList = {
    "Crew Neck T-Shirt": "http://3.145.198.110:80/public/crew-tee.png",
    "V-Neck T-Shirt": "http://3.145.198.110:80/public/v-neck-tee.png",
    "Polo": "http://3.145.198.110:80/public/polo.png",
    "Button-Up Shirt": "http://3.145.198.110:80/public/button-up.png",
    "Henley": "http://3.145.198.110:80/public/henley.png",
};

export const bottomUrlList = {
    "Chinos": "http://3.145.198.110:80/public/chinos.png",
    "Jeans": "http://3.145.198.110:80/public/jeans.png",
    "Jogger Sweatpants": "http://3.145.198.110:80/public/joggers.png",
    "Traditional Sweatpants": "http://3.145.198.110:80/public/sweatpants.png",
    "Cargo Pants": "http://3.145.198.110:80/public/cargo-pants.png",
    "Dress Pants": "http://3.145.198.110:80/public/dress-pants.png",
};

export const playgroundDataSchema = {
    shirtCategory:
    {
        name: '',
        color: '',
    },
    topCategory:
    {
        name: '',
        color: '',
    },
    bottomCategory:
    {
        name: '',
        color: ''
    },
};
