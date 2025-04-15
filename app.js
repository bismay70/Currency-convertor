

  const BASE_URL = "https://open.er-api.com/v6/latest";

  const fromSelect = document.getElementById("from-currency");
  const toSelect = document.getElementById("to-currency");
  const resultDiv = document.getElementById("result");
  const fromFlag = document.getElementById("from-flag");
  const toFlag = document.getElementById("to-flag");

const countryFlags = {
      AFN: "AF",
      AED: "AE",
      ALL: "AL",
      XCD: "AG",
      ANG: "AN",
      AMD: "AM",
      AQD: "AQ",
      AOA: "AO",
      AUD: "AU",
      ARS: "AR",
      BAM: "BA",
      AZN: "AZ",
      BDT: "BD",
      BBD: "BB",
      BGN: "BG",
      XOF: "BE",
      BIF: "BI",
      BHD: "BH",
      BND: "BN",
      BMD: "BM",
      BRL: "BR",
      BOB: "BO",
      NOK: "BV",
      BSD: "BS",
      BYR: "BY",
      BWP: "BW",
      CAD: "CA",
      BZD: "BZ",
      XAF: "CF",
      CDF: "CD",
      CLP: "CL",
      CHF: "CH",
      COP: "CO",
      CNY: "CN",
      CUP: "CU",
      CRC: "CR",
      CYP: "CY",
      CVE: "CV",
      DJF: "DJ",
      CZK: "CZ",
      DOP: "DO",
      DKK: "DK",
      ECS: "EC",
      DZD: "DZ",
      EGP: "EG",
      EEK: "EE",
      EUR: "FR",
      ETB: "ET",
      FKP: "FK",
      FJD: "FJ",
      GEL: "GE",
      GBP: "GB",
      GHS: "GH",
      GGP: "GG",
      GMD: "GM",
      GIP: "GI",
      GTQ: "GT",
      GNF: "GN",
      HKD: "HK",
      GYD: "GY",
      HRK: "HR",
      HNL: "HN",
      HUF: "HU",
      HTG: "HT",
      ILS: "IL",
      IDR: "ID",
      IQD: "IQ",
      INR: "IN",
      ISK: "IS",
      IRR: "IR",
      JOD: "JO",
      JMD: "JM",
      KES: "KE",
      JPY: "JP",
      KHR: "KH",
      KGS: "KG",
      KPW: "KP",
      KMF: "KM",
      KWD: "KW",
      KRW: "KR",
      KZT: "KZ",
      KYD: "KY",
      LBP: "LB",
      LAK: "LA",
      LRD: "LR",
      LKR: "LK",
      LTL: "LT",
      LSL: "LS",
      LYD: "LY",
      LVL: "LV",
      MDL: "MD",
      MAD: "MA",
      MKD: "MK",
      MGA: "MG",
      MNT: "MN",
      MMK: "MM",
      MRO: "MR",
      MOP: "MO",
      MUR: "MU",
      MTL: "MT",
      MWK: "MW",
      MVR: "MV",
      MYR: "MY",
      MXN: "MX",
      NAD: "NA",
      MZN: "MZ",
      NGN: "NG",
      XPF: "NC",
      NPR: "NP",
      NIO: "NI",
      OMR: "OM",
      NZD: "NZ",
      PEN: "PE",
      PAB: "PA",
      PHP: "PH",
      PGK: "PG",
      PLN: "PL",
      PKR: "PK",
      QAR: "QA",
      PYG: "PY",
      RSD: "RS",
      RON: "RO",
      RWF: "RW",
      RUB: "RU",
      SBD: "SB",
      SAR: "SA",
      SDG: "SD",
      SCR: "SC",
      SGD: "SG",
      SEK: "SE",
      SLL: "SL",
      SOS: "SO",
      SKK: "SK",
      STD: "ST",
      SVC: "SV",
      SRD: "SR",
      SZL: "SZ",
      SYP: "SY",
      TJS: "TJ",
      THB: "TH",
      TND: "TN",
      TMT: "TM",
      TRY: "TR",
      TOP: "TO",
      TWD: "TW",
      TTD: "TT",
      UAH: "UA",
      TZS: "TZ",
      USD: "US",
      UGX: "UG",
      UZS: "UZ",
      UYU: "UY",
      VND: "VN",
      VEF: "VE",
      YER: "YE",
      VUV: "VU",
      ZMK: "ZM",
      ZAR: "ZA",
     ZWD: "ZW",
  };

  const currencyList = Object.keys(countryFlags);

  currencyList.forEach((curr) => {
    const option1 = document.createElement("option");
    const option2 = document.createElement("option");
    option1.value = option1.textContent = curr;
    option2.value = option2.textContent = curr;
    fromSelect.appendChild(option1);
    toSelect.appendChild(option2);
  });

  fromSelect.value = "USD";
  toSelect.value = "INR";

  const updateFlags = () => {
    fromFlag.src = `https://flagsapi.com/${countryFlags[fromSelect.value]}/flat/32.png`;
    toFlag.src = `https://flagsapi.com/${countryFlags[toSelect.value]}/flat/32.png`;
  };

  fromSelect.addEventListener("change", updateFlags);
  toSelect.addEventListener("change", updateFlags);

  document.getElementById("converter-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const amount = parseFloat(document.getElementById("amount").value);
    const fromCurrency = fromSelect.value;
    const toCurrency = toSelect.value;

    if (!amount || amount < 0) {
      resultDiv.textContent = "Enter a valid amount.";
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/${fromCurrency}`);
      const data = await res.json();

      if (!data || !data.rates || !data.rates[toCurrency]) {
        resultDiv.textContent = "Conversion failed. Try again later.";
        return;
      }

      const rate = data.rates[toCurrency];
      const converted = (amount * rate).toFixed(2);
      resultDiv.textContent = `${amount} ${fromCurrency} = ${converted} ${toCurrency}`;
    } catch (err) {
      resultDiv.textContent = "Something went wrong. Check your internet or try again.";
    }
  });

  updateFlags();
