import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CulturalMeals() {
  const [culturalMeals, setCulturalMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);

  useEffect(() => {
    async function fetchCulturalMeals() {
      try {
        const cultures = ['Italian', 'Mexican', 'Turkish', 'Japanese','Russian'];
        const culturalMealsData = await Promise.all(cultures.map(async (culture) => {
          const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${culture}`);
          return { culture, meals: response.data.meals };
        }));
        setCulturalMeals(culturalMealsData);
      } catch (error) {
        console.error('Error fetching cultural meals:', error);
      }
    }
    fetchCulturalMeals();
  }, []);

  const handleMealClick = (meal) => {
    setSelectedMeal(meal);
  };

  return (
    <div className="CulturalMeals">
      <h2>Cultural Meals</h2>
      {culturalMeals.map((culturalMeal) => (
        <div key={culturalMeal.culture}>
          <h3>{culturalMeal.culture}</h3>
          <ul>
            {culturalMeal.meals.map((meal) => (
              <li key={meal.idMeal} onClick={() => handleMealClick(meal)}>
                {meal.strMeal}
              </li>
            ))}
          </ul>
        </div>
      ))}
      {selectedMeal && (
        <div className="MealDetails">
          <h2>{selectedMeal.strMeal}</h2>
          <img src={selectedMeal.strMealThumb} alt={selectedMeal.strMeal} />
          <p>{selectedMeal.strInstructions}</p>
        </div>
      )}
    </div>
  );
}

export default CulturalMeals; 
