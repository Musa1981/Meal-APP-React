import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SearchMeal from './SearchMeal';
import RandomMeal from './RandomMeal';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
          <div className="container">
            <Link className="navbar-brand" to="/">Meal App</Link>

            {/* Toggler button for mobile */}
            <button
              className="navbar-toggler"
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-controls="navbarNav"
              aria-expanded={isOpen}
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/" onClick={() => setIsOpen(false)}>Search Meal</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/random" onClick={() => setIsOpen(false)}>Random Meal</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="container">
          <Routes>
            <Route path="/" element={<SearchMeal />} />
            <Route path="/random" element={<RandomMeal />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
