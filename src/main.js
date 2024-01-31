function TDEE(gender, age, weight, height) {
    if (gender === "female") {
        return (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }else {
        return (10 * weight) + (6.25 * height) - (5 * age) + 5;
    }
}

function numberOfCalories (TDEE, activityLevel) {
    switch (activityLevel) {
        case 'sedentary':
            TDEE *= 1.2;
            break;
        case 'lightly-active':
            TDEE *= 1.375;
            break;
        case 'moderately-active':
            TDEE *= 1.55;
            break;
        case 'very-active':
            TDEE *= 1.725;
            break;
        case 'exteremely-active':
            TDEE *= 1.9;
            break;
        default:
            TDEE *= 1.55
            break;    
    }
    return TDEE;
}

function calCarbs(calories, diateryPrefierance) {
    let carbs;
    switch (diateryPrefierance) {
        case 'athlete':
            carbs = (calories * (55/100)) / 4;
            break;
        case 'normal':
            carbs = (calories * (50/100)) / 4;
            break;
        case 'diabetic':
            carbs = (calories * (40/100))/ 4;
            break;        
    }
    return carbs;
}

function calProtein(calories, diateryPrefierance) {
    let protein;
    switch (diateryPrefierance) {
        case 'athlete':
            protein = (calories * (25/100)) / 4;
            break;
        case 'normal':
            protein = (calories * (20/100)) / 4;
            break;
        case 'diabetic':
            protein = (calories * (20/100)) / 4 ;
            break;        
    }
    return protein;
}


function calFats(calories, diateryPrefierance) {
    let fat;
    switch (diateryPrefierance) {
        case 'athlete':
            fat = (calories * (20/100)) / 9;
            break;
        case 'normal':
            fat = (calories * (30/100)) / 9;
            break;
        case 'diabetic':
            fat = (calories * (40/100)) / 9;
            break;        
    }
    return fat;
}

function calMacros(){
    const age = parseInt(document.getElementById('age').value);
    const weight = parseInt(document.getElementById('weight').value);
    const height = parseInt(document.getElementById('height').value);
    const gender = document.getElementById('gender').value;
    const activityLevel = document.getElementById('activityLevel').value;
    const dietaryPreferences = document.getElementById('dietaryPreferences').value;

    let tdee = TDEE(gender, age, weight, height);
    let calories = numberOfCalories(tdee, activityLevel);
    let carbGrams = calCarbs(calories, dietaryPreferences);
    let proteinGrams = calProtein(calories, dietaryPreferences);
    let fatGrams = calFats(calories, dietaryPreferences);

    // console.log(carbGrams, proteinGrams, fatGrams);
    let ResultDiv = document.getElementById('result');
    ResultDiv.innerHTML = `
        <h2>Calories Needed: ${Math.round(calories)} kcal</h2>
        <p>Proteins: ${Math.round(proteinGrams)} g</p>
        <p>Carbohydrates: ${Math.round(carbGrams)} g</p>
        <p>Fats: ${Math.round(fatGrams)} g</p>
    `
}