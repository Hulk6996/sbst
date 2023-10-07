<script>
  import { onMount } from "svelte";
  import axios from "axios";

  let amount = 1;
  let fromCurrency = "USD";
  let toCurrency = "EUR";
  let convertedAmount = null;

  const convertCurrency = async () => {
    try {
      const response = await axios.get("https://www.cbr-xml-daily.ru/daily_json.js");
      const data = response.data;

      if (data.Valute && data.Valute[fromCurrency] && data.Valute[toCurrency]) {
        const fromRate = data.Valute[fromCurrency].Value;
        const toRate = data.Valute[toCurrency].Value;
        const exchangeRate = fromRate / toRate;
        convertedAmount = (amount * exchangeRate).toFixed(2);
      } else {
        convertedAmount = "Ошибка при конвертации валюты";
      }
    } catch (error) {
      console.error(error);
      convertedAmount = "Ошибка при загрузке курсов валют";
    }
  };

  onMount(() => {
    convertCurrency();
  });
</script>

<h1>Конвертер валют</h1>

<div>
  <label for="fromCurrency">Из валюты:</label>
  <select id="fromCurrency" bind:value={fromCurrency}>
    <option value="USD">USD</option>
    <option value="EUR">EUR</option>
    <option value="GBP">GBP</option>
    <option value="JPY">JPY</option>
  </select>
</div>

<div>
  <label for="amount">Сумма:</label>
  <input type="number" id="amount" bind:value={amount} on:input={convertCurrency} />
</div>

<div>
  <label for="toCurrency">В валюту:</label>
  <select id="toCurrency" bind:value={toCurrency}>
    <option value="USD">USD</option>
    <option value="EUR">EUR</option>
    <option value="GBP">GBP</option>
    <option value="JPY">JPY</option>
  </select>
</div>

<div>
  <p>Результат: {convertedAmount}</p>
</div>





