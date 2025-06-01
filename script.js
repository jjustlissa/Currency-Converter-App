const amount = document.getElementById("amount");
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const convert = document.getElementById("convert");
const result = document.getElementById("result");

function populateCurrency(rates) { // Function to fill the dropdowns with all available currencies from the API
    for (const currency in rates) {  // loop through all currency keys 
        const option1 = document.createElement("option");  // create <option> for FROM currency dropdown
        option1.value = currency;            // set option's value to currency code
        option1.textContent = currency;       //display the currency code as visible text
        fromCurrency.appendChild(option1);    // add this option into the FROM dropdown
    }
    for (const currency in rates) {   //same for toCurrency
        const option2 = document.createElement("option");
        option2.value = currency;
        option2.textContent = currency;
        toCurrency.appendChild(option2);
    }

}

async function loadCurrencyOptions() {   // Function to fetch the list of currencies and populate dropdowns
    const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD");  // get currency rates from USD base
    const data = await response.json();   //convert into json
    populateCurrency(data.rates);    // pass the rates object to the function to fill the dropdowns
}

loadCurrencyOptions();     // call this once when the app starts so dropdowns are ready

convert.addEventListener ("click", convertCurrency);  //when click
async function convertCurrency () {
    const ourAmount = parseFloat(amount.value);  // get user amount
    const from = fromCurrency.value;             // get source currency
    const to = toCurrency.value;                 // get target currency


    if(isNaN(ourAmount)) {    //if "Is Not a Number"
        result.innerText = "Please enter a valid number.";   // check if valid
        return;
    }


     // build the API URL using selected FROM currency
    const apiUrl = `https://api.exchangerate-api.com/v4/latest/${from}`;   
    const response = await fetch(apiUrl);    // build the API URL using selected FROM currency
    const data = await response.json();     //convert to json

    const rate = data.rates[to];    // get the exchange rate from FROM to TO currency
    const convertedAmount = (ourAmount * rate).toFixed(2);     // multiply and round to 2 decimal places
    
    result.innerText = `${ourAmount} ${from} = ${convertedAmount} ${to}`;    // show result on screen

}