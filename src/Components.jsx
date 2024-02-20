import Select from "react-select";
import React from "react";

const CurrencyDiv = React.forwardRef((props, ref) => {

    function isFrom(props) {
        if (props.from === 'From') {
            return <input onChange={props.onchange} ref={ref} type="number" name='fromCurrency' defaultValue={'0'} className=' w-28 bg-transparent border-none focus:outline-1 p-1 focus:border-none ' />
        }else{
            return <p>{props.result}</p>
        }
    }

    return (
        <>
            <div className=' p-3 h-28 flex justify-between bg-white rounded-md'>
                <div className='flex flex-col justify-center'>
                    <label htmlFor="fromCurrency" className=' text-gray-500 mb-2'>{props.from}</label>
                    {isFrom(props)}
                 </div>
                <div className='flex flex-col justify-center'>
                    <label htmlFor="fromCurrencyType" className=' text-gray-500 mb-2'>Currency Type</label>
                    <Select options={props.options} onChange={props.onclick} styles={props.customStyles} />
                </div>
            </div>
        </>
    )
})



export default CurrencyDiv