import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MealDetails({ selectedMeal }) {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${selectedMeal.idMeal}`);
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

    if (selectedMeal) {
      fetchIngredients();
    }
  }, [selectedMeal]);

  return (
    <div className="meal-details">
      <h3>{selectedMeal.strMeal}</h3>
      <img src={selectedMeal.strMealThumb} alt={selectedMeal.strMeal} />
      <h4>Ingredients:</h4>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient.measure} {ingredient.ingredient}</li>
        ))}
      </ul>
      <p>{selectedMeal.strInstructions}</p>
    </div>
  );
}

export default MealDetails;
