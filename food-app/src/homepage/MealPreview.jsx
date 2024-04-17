import React from 'react';

function MealPreview({ selectedMeal, mealDetails, handleClosePreview }) {

  return (
    <div className='mealPreview'>
      <div className='exit'>
        <button className='closeBtn' onClick={handleClosePreview}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
          </svg>
        </button>
      </div>

  
      <h6>{selectedMeal.name}</h6> 
      {mealDetails && (
        <div className='ingredients'>
          <h5>Ingredients:</h5>
          <div className='ingredientsList'>
            {[...Array(20).keys()].map(index => {
              const ingredient = mealDetails[`strIngredient${index + 1}`];
              const measurement = mealDetails[`strMeasure${index + 1}`];
              return ingredient && measurement && (
                <p className='measure' key={index}>{`${measurement} ${ingredient}`}</p>
              );
            })}
         </div>

          <div className='instructionContent'>
          <h5>Instructions:</h5>
          <span className='mealDescription'>{selectedMeal.details.split('\n\r').map((instr, idx) => (
            <p key={idx}>{instr}</p>
          ))}</span>
          </div>
          </div>
      )}
            
    </div>
  );
}

export default MealPreview;
