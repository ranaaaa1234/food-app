import React, { useState, useEffect } from 'react';
import './HomePage.css'; 
import SearchBar from '../searchbar/SearchBar'; 
import MealPreview from './MealPreview';

function HomePage() {

  const [searchQuery, setSearchQuery] = useState(''); // State for the search query
  const [searchResults, setSearchResults] = useState([]); // State for storing search results
  const [selectedMeal, setSelectedMeal] = useState(null); // State for the selected meal
  const [mealDetails, setMealDetails] = useState(null); // State for the details of the selected meal
  const [numToShow, setNumToShow] = useState(8); // State for controlling the number of results to show
  const [error, setError] = useState(null); // State for storing error message

  // Effect hook to fetch search results when searchQuery changes
  useEffect(() => {

    // Fetch search results from the API
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`)
      .then(response => response.json())
      .then(data => {
        // Update search results if data is available
        setSearchResults(data.meals ? data.meals.map(meal => ({
          id: meal.idMeal,
          name: meal.strMeal,
          image: meal.strMealThumb,
          details: meal.strInstructions
        })) : []);

          // Update error state if no meals found
            if (!data.meals) {
                setError("Meal not found. Please search for something else.");
            } else {
                setError(null); // Reset error state if meals found
            }
      })

      .catch(error => {
        console.error('Error fetching search results:', error); // Log error if fetching fails
        setError("Error fetching search results. Please try again."); // Update error state on fetch error
        setSearchResults([]); // Reset search results on error
      });
  }, [searchQuery]);

  // Effect hook to fetch meal details when selectedMeal changes
  useEffect(() => {
    if (!selectedMeal) return;

    // Fetch meal details from the API
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${selectedMeal.id}`)
      .then(response => response.json())
      .then(data => {
        // Update meal details if data is available
        if (data.meals && data.meals.length > 0) {
          setMealDetails(data.meals[0]);
        }
      })
      .catch(error => {
        console.error('Error fetching meal details:', error); // Log error if fetching fails
      });
  }, [selectedMeal]);

  // Effect hook to adjust searchResults when numToShow changes
  useEffect(() => {
    if (searchResults.length > 8) {
      setNumToShow(8); // Adjust numToShow if there are more results
    }else {
        setNumToShow(searchResults.length); //Show all results if less than 8
    }
  }, [searchResults]);
    
  // Function to handle loading more results
  const handleLoadMore = () => {
    const newNumToShow = Math.min(numToShow + 8, searchResults.length);
    setNumToShow(newNumToShow); // Increase numToShow by 8 or set it to the length of searchResults
  };

  // Function to handle search query changes
  const handleSearch = query => {
    setSearchQuery(query); // Update search query state
    setSelectedMeal(null); // Reset selected meal when performing a new search
  };

  // Function to handle selecting a meal
  const handleMealSelect = meal => {
    setSelectedMeal(meal); // Update selected meal state
  };

  // Function to handle closing the meal preview
  const handleClosePreview = () => {
    setSelectedMeal(null); // Reset selected meal state to close the preview
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />

        {/* Conditional rendering of the title */}
        <p className='title'>{searchQuery ? searchQuery : 'Recipe inspiration'}</p>

         
      {/* Render the error message if an error occurred */}
      {error && (
        <div className="error">
         <p><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="red" className="bi bi-exclamation-circle" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
            <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/>
          </svg> 
          </p>
          <p className="errorMsg">{error}</p>
        </div>
      )}

      {/* Render the list of search results */}
      <div className='containerHomepage'>
        <ul>
          {searchResults.slice(0, numToShow).map(meal => (
            <li key={meal.idMeal} onClick={() => handleMealSelect(meal)}>
              <img src={meal.image} alt={meal.name} />
              <p className='mealName'>{meal.name}</p>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Render the load more button if there are more results */}
        <div className='loadMore'> 
    {searchResults.length > numToShow && (
        <button className='loadMoreBtn' onClick={handleLoadMore}>Load more...</button>
    )}
    </div>

      {/* Conditionally render the meal preview if a meal is selected */}
      {selectedMeal && (
        <MealPreview 
          selectedMeal={selectedMeal} 
          mealDetails={mealDetails} 
          handleClosePreview={handleClosePreview} 
        />
      )}
    </div>
  );
}

export default HomePage;
