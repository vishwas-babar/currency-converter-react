import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import CurrencyDiv from './Components';

let initialOptions = Array();
axios.get('https://open.er-api.com/v6/latest/INR')
  .then((res) => {
    const keys = Object.keys(res.data.rates);

    keys.map((key) => {
      initialOptions.push({ value: key, label: key });
    })

  })


let Currencyrates;
let fromCurrency;
let toCurrency;

function App() {

  const [options, setOptions] = useState(Array());
  const [result, setResult] = useState(0);

  const fromInputRef = useRef();
  const toInputRef = useRef();

  // custome style for select components
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? 'white' : 'rgba(255, 239, 247, 0.5)',
      color: 'black',
    }),
    control: (provided) => ({
      ...provided,
      backgroundColor: 'white',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: 'rgba(255, 239, 247, 0.5)',
      color: 'black',

    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'black',
    }),
    input: (provided) => ({
      ...provided,
      color: 'grey',
      minWidth: '50px',
      maxWidth: '50px',
    }),
  };

  useEffect(() => {
    axios.get('https://open.er-api.com/v6/latest/INR')
      .then((res) => {
        const keys = Object.keys(res.data.rates);

        let optionsCopy;
        optionsCopy = options;
        keys.map((key) => {
          optionsCopy.push({ value: key, label: key });
          setOptions(optionsCopy);
        })

      })
      .catch((err) => {
        console.log('error occured: ', err);
      })
  }, [])

  function handleOnchangeSelectOptionForFrom(event) {
    fromCurrency = event.value;

    axios.get(`https://open.er-api.com/v6/latest/${event.value}`)
    .then( (res) => {
      Currencyrates = res.data.rates;
      calculateCurrency();
    })
    .catch((error) => {
      alert('failed to fetch currency data from api');
      Currencyrates = null;
      fromCurrency = null;
    })
  };

  function handleOnchangeSelectOptionForTo(event) {
  
    toCurrency = event.value;
    calculateCurrency();
  }

  function calculateCurrency() {
    if (!Currencyrates || !fromCurrency || !toCurrency) {
      return;
    }

    let fromInputValue = fromInputRef.current.value;
    let toCurrencyValue = Currencyrates[toCurrency];

    let resultCopy = Number(fromInputValue)*toCurrencyValue;

    setResult(resultCopy.toFixed(2));
  }

  function fromInputOnChange() {
    calculateCurrency();
  }

  return (
    <>
      <div className='' style={{
        height: '100vh',
        width: '100%',
        backgroundImage: 'url(https://cdn.pixabay.com/photo/2017/09/07/08/54/money-2724241_1280.jpg)',
        backgroundSize: 'cover',
      }}>

        <div className='h-fit w-80 bg-customWhite absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] rounded-md shadow-lg border transition-all duration-300 ease-in-out '>
          <div className='w-full h-full backdrop-blur-sm bg-customWhite p-3'>

            <div className='w-full flex flex-col gap-4 relative'>

              <CurrencyDiv ref={fromInputRef} onchange={fromInputOnChange} options={options} from="From" onclick={handleOnchangeSelectOptionForFrom} customStyles={customStyles} />

              {/* <button role='button' className='bg-blue-500 text-white absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] px-3 py-1 rounded-md outline-2 border border-spacing-8 border-white '>SWAP</button> */}

              <CurrencyDiv ref={toInputRef} result={result} options={options} from="To" onclick={handleOnchangeSelectOptionForTo} customStyles={customStyles} />

            </div>

            <button onClick={() => calculateCurrency()} className='w-full bg-green-500 text-white rounded-md py-2 mt-5 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-md active:bg-green-600'>Convert USD to INR</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App;
