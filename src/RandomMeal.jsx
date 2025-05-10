import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

function RandomMeal() {
  const [meal, setMeal] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [ingredients, setIngredients] = useState([]); // Lägg till ingredienser

  useEffect(() => {
    if (meal) {
      setImageLoaded(true);
    }
  }, [meal]);

  const fetchRandomMeal = async () => {
    try {
      const response = await axios.get('https://www.themealdb.com/api/json/v1/1/random.php');
      setMeal(response.data.meals[0]);
      setImageLoaded(false); // Återställ imageLoaded till false för att ladda bilden igen
      fetchIngredients(response.data.meals[0].idMeal); // Hämta ingredienser för den slumpmässiga måltiden
    } catch (error) {
      console.error('Error fetching random meal:', error);
    }
  };

  const fetchIngredients = async (mealId) => { // Funktion för att hämta ingredienser
    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
      const mealData = response.data.meals[0];
      // Extrahera ingredienser från måltidsdata
      const mealIngredients = [];
      for (let i = 1; i <= 20; i++) {
        if (mealData[`strIngredient${i}`]) {
          mealIngredients.push({
            ingredient: mealData[`strIngredient${i}`],
            measure: mealData[`strMeasure${i}`]
          });
        } else {
          break;
        }
      }
      setIngredients(mealIngredients);
    } catch (error) {
      console.error('Error fetching ingredients:', error);
    }
  };

  const handleRandomMeal = async () => {
    await fetchRandomMeal();
  };

  return (
    <div className="RandomMeal">
      <Button variant="primary" onClick={handleRandomMeal}>Random Meal</Button>
      {meal && (
        <div>
          <h2>Random Meal</h2>
          <h3>{meal.strMeal}</h3>
          {imageLoaded ? <img src={meal.strMealThumb} alt={meal.strMeal} /> : <p>Loading image...</p>}
          {/* Visa ingredienser */}
          <h4>Ingredients:</h4>
          <ul className='meal-details-ul'>
            {ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient.measure} {ingredient.ingredient}</li>
            ))}
          </ul>
          <p>{meal.strInstructions}</p>
        </div>
      )}
    </div>
  );
}

export default RandomMeal;

