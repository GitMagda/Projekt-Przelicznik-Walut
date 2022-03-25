const amount = document.getElementById("moneyAmount");
const currency = document.getElementById("moneyCurrency");
const convert = document.getElementById("convertAmount");
const outcome = document.getElementById("outcome");
let amountToConvert = 0;
let chosenCurrencyRate = 0;

fetch("http://api.nbp.pl/api/exchangerates/tables/C/")
  .then((data) => data.json())
  .then((data) => {
    const tables = data[0];
    let myRates = tables.rates.filter(
      (rate) =>
        rate.code === "USD" || rate.code === "CHF" || rate.code === "EUR"
    );
    for (const element of myRates) {
      console.log(element);
      currency.innerHTML += `<option value="${element.bid}">${element.code}</option>`;
      currency.addEventListener("change", (event) => {
        chosenCurrencyRate = `${event.target.value}`;
      });
      amount.addEventListener("change", (event) => {
        amountToConvert = amount.value;
      });
    }
    convert.addEventListener("click", function () {
      let howMuch = amountToConvert * chosenCurrencyRate;
      console.log(chosenCurrencyRate);
      console.log(howMuch);
      if (amountToConvert == "") {
        outcome.innerHTML = `<p>Wpisz warość!</p>`;
      } else {
        outcome.innerHTML = `<p>To: ${howMuch.toFixed(2)} PLN</p>`;
      }
    });
  })
  .catch((error) => {
    console.log(error);
  });
