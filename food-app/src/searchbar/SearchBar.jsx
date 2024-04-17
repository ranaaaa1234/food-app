
  import React, { useState } from 'react';
  import './searchbar.css';

  function SearchBar({ onSearch }) {
    const [query, setQuery] = useState('');

    function handleChange(event) {
      setQuery(event.target.value);
    }

    function handleSubmit(event) {
      event.preventDefault();
      onSearch(query);
    }

    return (

      <div className="container">

  <form onSubmit={handleSubmit}>

  <div className='searchcomp'> 
    <input className='inputField' type="text" value={query} onChange={handleChange} placeholder="Search for a meal..." />

    <button className='searchBtn' type="submit">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="19" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
          </svg>
    </button>
  </div>
  </form>

    </div>
    
    );

        }

  export default SearchBar;