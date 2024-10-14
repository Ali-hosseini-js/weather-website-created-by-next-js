import React, {useState} from 'react'
import {useRouter} from 'next/router';


const SearchBox = () => {
  const [city, setCity] = useState('');
  const router = useRouter();

  const submitWeatherHandler = (event) => {
    event.preventDefault();
    localStorage.setItem('searchItem', city);
    router.push('/weather-details');
  }

  return (
    <form className="py-10 flex gap-10" onSubmit={submitWeatherHandler}>
        <input type="text" placeholder="find your city." className=" px-4 py-2 rounded-md border-2 border-gray-500 h-10 w-52" onChange={(e) => setCity(e.target.value)}/>
        <button className="bg-gray-500 text-white rounded-md w-32 h-10 font-bold text-xl hover:bg-gray-700" type='submit'>search</button>
    </form>
    )
};

export default SearchBox