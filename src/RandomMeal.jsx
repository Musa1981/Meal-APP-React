import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RandomMeal({ show }) {
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    // Funktion för att hämta en slumpmässig måltid från API
    async function fetchRandomMeal() {
      try {
        // Gör ett GET-anrop till API för att hämta en slumpmässig måltid
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/random.php');
        setMeal(response.data.meals[0]);
      } catch (error) {
        console.error('Error fetching random meal:', error);
      }
    }

    // Kör funktionen för att hämta en slumpmässig måltid om show är true
    if (show) {
      fetchRandomMeal();
    }
  }, [show]);

  // Visa endast om show är true och det finns en måltid
  return (
    <div className="RandomMeal">
      {show && meal && (
        <div>
          <h2>Random Meal</h2>
          <h3>{meal.strMeal}</h3>
          <img src={meal.strMealThumb} alt={meal.strMeal} />
          <p>{meal.strInstructions}</p>
        </div>
      )}
    </div>
  );
}

export default RandomMeal;
