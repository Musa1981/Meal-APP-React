import React, { useState, useEffect } from 'react';
import axios from 'axios';//Detta biblioteket används för att göra HTTP förfrågningar till API

function RandomMeal() {
  const [meal, setMeal] = useState(null);

// Funktion för att hämta en slumpmässig måltid från API
  useEffect(() => {
    async function fetchRandomMeal() {
      try {
         // Gör ett GET-anrop till API för att hämta en slumpmässig måltid
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/random.php');
        setMeal(response.data.meals[0]);
      } catch (error) {
        console.error('Error fetching random meal:', error);
      }
    }
    // Kör funktionen för att hämta en slumpmässig måltid när komponenten monteras
    fetchRandomMeal();
  }, []);

  return (
    <div className="RandomMeal">
      <h2>Random Meal</h2>
      {meal && (
        <div>
          <h3>{meal.strMeal}</h3>
          <img src={meal.strMealThumb} alt={meal.strMeal} />
          <p>{meal.strInstructions}</p>
        </div>
      )}
    </div>
  );
}

export default RandomMeal; 
