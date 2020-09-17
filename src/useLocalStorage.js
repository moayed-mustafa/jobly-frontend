import { useState, useEffect } from 'react'


function useLocalStorage(key, first_val = null) {
    // * initial value will be either what is inside of the local storage or the first_val
    // * in the begining it will be null since there's no item in local stoarge, that will change with a user login
    const initial_value = localStorage.getItem(key) || first_val
    // * make a state out of the value in local storage ----> null for now ---> token value when user is logged in
    const [item, setItem] = useState(initial_value)

    useEffect(() => {
        if (!item) {
            localStorage.removeItem(key)
        }
        else {
            localStorage.setItem(key, item)
        }
    }, [item, setItem])
// * return the state!
return [item, setItem]

}

export default useLocalStorage