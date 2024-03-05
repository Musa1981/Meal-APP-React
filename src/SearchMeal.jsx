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
    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
      setSearchResults(response.data.meals || []);
      setSelectedMeal(null); // raderar vald maträtt när ny sökning körs
    } catch (error) {
      console.error('Error searching meals:', error);
    }
  };

  // Funktion för att hantera klick på en måltid
  const handleMealClick = (meal) => {
    setSelectedMeal(meal);
  };

  return (
    <div className="SearchMeal">
      <h2>Search Meal</h2>
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
          <div key={result.idMeal} className="meal-item" onClick={() => handleMealClick(result)}>
            <img src={result.strMealThumb} alt={result.strMeal} />
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
