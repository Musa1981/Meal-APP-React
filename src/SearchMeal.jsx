import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';


function SearchMeal() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);

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

  // Funktion för att hämta en slumpmässig måltid
  const handleRandomMeal = async () => {
    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/random.php`);
      setSelectedMeal(response.data.meals[0]);
      setSearchResults([]); // Rensa sökresultaten när en slumpmässig måltid hämtas
    } catch (error) {
      console.error('Error fetching random meal:', error);
    }
  };

  // Funktion för att hantera klick på en måltid
  const handleMealClick = (meal) => {
    setSelectedMeal(meal);
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
      <Button variant="success" onClick={handleRandomMeal}>
        Random Meal
      </Button>
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
            <p>{selectedMeal.strInstructions}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchMeal;
