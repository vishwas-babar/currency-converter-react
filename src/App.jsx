import { useEffect, useState } from 'react';
import axios from 'axios';
import { InputBox } from './components/index.js';
import useCurrencyInfo from './hooks/useCurrencyInfo.js';


let Currencyrates;

function App() {

  const [label, setLabel] = useState('FORM');
  const [amount, setAmount] = useState(0);
  const [resultAmount, setResultAmount] = useState(0);
  const [options, setOptions] = useState(Array());
  const [fromCurrencyType, setFromCurrencyType] = useState('INR');
  const [toCurrencyType, setToCurrencyType] = useState('USD');

  useEffect(() => {

  }, [fromCurrencyType, toCurrencyType])

  Currencyrates = useCurrencyInfo(fromCurrencyType).rates;

  useEffect(() => {
    axios.get('https://open.er-api.com/v6/latest/INR')
      .then((res) => {
        const keys = Object.keys(res.data.rates);
        setOptions(keys);
      })
      .catch((err) => {
        console.log('error occured: ', err);
      })
  }, [])


  function calculateCurrency() {

    console.log('called calculatecurrnecy()')
    console.log(Currencyrates)

    let toSingleCurrencyValue = Currencyrates[toCurrencyType];
    console.log(toSingleCurrencyValue);

    let resultCopy = Number(amount) * toSingleCurrencyValue;
    console.log(resultCopy);

    setResultAmount(resultCopy.toFixed(2));
  }

  function fromInputOnChange(event) {
    setAmount(Number(event.target.value));
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

              <InputBox
                onInputChange={fromInputOnChange}
                onSelectChange={(event) => {
                  console.log('getting called select change listener')
                  setFromCurrencyType(event.target.value);
                }}
                fromCurrencyType={fromCurrencyType}
                options={options}
                label="From"
                amount={amount}
                currencyOptions={options}
                from="From" />

              <button
                role='button'
                className='bg-blue-500 text-white absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] px-3 py-1 rounded-md outline-2 border border-spacing-8 border-white '
                onClick={() => {
                    setAmount(resultAmount);
                    setResultAmount(amount);
                }}
              >SWAP</button>

              <InputBox
                onSelectChange={(event) => {
                  console.log(event)
                  setToCurrencyType(event.target.value)
                }}
                toCurrencyType={toCurrencyType}
                options={options} label="To"
                currencyOptions={options}
                amount={resultAmount}
                DisabledInput={true}
                from="To" />

            </div>

            <button onClick={() => calculateCurrency()} className='w-full bg-green-500 text-white rounded-md py-2 mt-5 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-md active:bg-green-600'>Convert {fromCurrencyType} to {toCurrencyType}</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App;
