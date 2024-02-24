import axios from "axios";
import { useEffect, useState } from "react";


function useCurrencyInfo(currency) {
    const [data, setData] = useState({});

    useEffect(() => {
        axios.get(`https://open.er-api.com/v6/latest/${currency}`)
            .then((res) => {
                setData(res.data);
                console.log('this is the rates\n',res.data.rates);
            })
    }, [currency]);

    return data;
}

export default useCurrencyInfo;