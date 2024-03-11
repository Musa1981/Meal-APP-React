import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

function SearchMeal() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [ingredients, setIngredients] = useState([]);

  // Funktion för att hantera inlämning av sökformulär
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (searchTerm.trim() !== '') { // Kontrollera om söktermen är tom
      try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
        setSearchResults(response.data.meals || []);
        setSelectedMeal(null); // Radera vald maträtt när ny sökning körs
      } catch (error) {
        console.error('Error searching meals:', error);
      }
    } else {
      setSearchResults([]); // Rensa sökresultaten om söktermen är tom
    }
  };

  // Funktion för att hämta ingredienser för den valda maträtten
  const fetchIngredients = async (mealId) => {
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

  // Funktion för att hantera klick på en måltid
  const handleMealClick = (meal) => {
    setSelectedMeal(meal);
    fetchIngredients(meal.idMeal); // Hämta ingredienser för den valda maträtten
  };

  return (
    <div className="SearchMeal">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicSearch">
          <Form.Control
            type="text"
            placeholder="Enter meal name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Search
        </Button>
      </Form>
      <div className="search-results">
        {searchResults.map((result) => (
          <div key={result.idMeal} className="meal-item">
            <img
              src={result.strMealThumb}
              alt={result.strMeal}
              onClick={() => handleMealClick(result)}
            />
            <p>{result.strMeal}</p>
          </div>
        ))}
      </div>
      <div className="meal-details">
        {selectedMeal && (
          <div>
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
        )}
      </div>
    </div>
  );
}

export default SearchMeal;
