import React from 'react';
import RandomMeal from './RandomMeal';
import SearchMeal from './SearchMeal';
import CulturalMeals from './CulturalMeals';




function App() {
  return (
    <div className="App">
      <h1>React Meal App</h1>
      <SearchMeal />
      <RandomMeal />
      <CulturalMeals />
    </div>
  );
} 

export default App;

