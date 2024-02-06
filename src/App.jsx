import { useEffect, useInsertionEffect, useRef, useState } from 'react';
import './App.css';
import useFetch from './hooks/useFetch';
import LocationCard from './components/locationCard';
import ResidentCard from './components/ResidentCard';
import Pagination from './components/styles/Pagination';

function App() {

  const [finder, setFinder] = useState(Math.floor(Math.random() * 126 + 1));
  const [location, getLocation, isLoading, hasError] = useFetch();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const url = `https://rickandmortyapi.com/api/location/${finder}`;
    getLocation(url);

  }, [finder]);

  // console.log(location);

  const textInput = useRef();

    const handleSubmit = event => {
      event.preventDefault();
      setFinder(textInput.current.value.trim());
    }

    const quantity = 5;
    const second = currentPage * quantity;
    const first = second -quantity;
    const residentsPart = location && location.residents.slice(first, second);
    const totalPages = location && Math.floor(location.residents.length / quantity) + 1;


  return (
    <div className='app'>
      {
        isLoading ?
        <h2>Loading....</h2>
        :
        <>
        <div className='banner'>
          <img src="https://www.chromethemer.com/download/hd-wallpapers/rick-and-morty-7680x4320.jpg" alt="imagen de banner" />
        </div>
          <h1>Rick and Morty</h1>
          <form 
          onSubmit={handleSubmit}
          className='app_form'
          >
            <input
            className='app_text'
            type="number" 
            ref={textInput} 
            placeholder='type a number (1 to 126)'
            />
            <button className='app_btn'>Search</button>
          </form>
          {
            hasError || finder=== '0' ?
            <h2>This location do not exist</h2>
            :
            <>
              <LocationCard 
                location={location}
              />
              <Pagination 
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalPages={totalPages}
                />
              <div className='app_container'>
              {
                residentsPart.map(resident => (
                  <ResidentCard 
                    key={resident}
                    url={resident}
                  />
                ))
                }
                </div>
                <Pagination 
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalPages={totalPages}
                />
              </>
          }
        </>
      }
      
    </div>
  )
}

export default App;
