

function InputBox({
    label,
    amount,
    toCurrencyType,
    onInputChange,
    onSelectChange,
    DisabledInput = false,
    currencyOptions = [],
    
}) {
    return (
        <div className=' p-3 h-28 flex justify-between bg-white rounded-md'>
            <div className='flex flex-col justify-center'>
                <label htmlFor="fromCurrency" className=' text-gray-500 mb-2'>{label}</label>
                <input disabled={DisabledInput} onChange={onInputChange} type="number" value={amount} name='fromCurrency' className=' w-28 bg-transparent border-none focus:outline-1 p-1 focus:border-none ' />
            </div>
            <div className='flex flex-col justify-center'>
                <select value={toCurrencyType} onChange={onSelectChange}>
                    {
                        currencyOptions.map( element => <option key={element} value={element}>{element}</option> )
                    }
                </select>
            </div>
        </div>
    )
};

export default InputBox;