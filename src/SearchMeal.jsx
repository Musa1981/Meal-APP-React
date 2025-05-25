import React, { useState } from 'react';
import { Card, Button, Form, Row, Col, Spinner, Modal } from 'react-bootstrap';
import { motion } from 'framer-motion';

const SearchMeal = () => {
  const [query, setQuery] = useState('');
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);

  const searchMeal = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + query);
    const data = await res.json();
    setMeals(data.meals || []);
    setLoading(false);
  };

  const getIngredients = (meal) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push(`${ingredient} - ${measure}`);
      }
    }
    return ingredients;
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-4">
      <h2 className="text-center mb-4">Search Meal</h2>
      <Form onSubmit={searchMeal} className="mb-4">
        <Row className="justify-content-center">
          <Col xs={10} md={6} lg={5}>
            <Form.Control
              type="text"
              placeholder="Enter meal name"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </Col>
          <Col xs="auto">
            <Button variant="success" type="submit">
              Search
            </Button>
          </Col>
        </Row>
      </Form>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4 justify-content-center">
          {meals.map((meal) => (
            <Col key={meal.idMeal} className="d-flex justify-content-center">

              <Card className="h-100 shadow-sm">
                <Card.Img
                  variant="top"
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  style={{ maxHeight: '200px', objectFit: 'cover' }}
                />
                <Card.Body>
                  <Card.Title>{meal.strMeal}</Card.Title>
                  <Card.Text>{meal.strInstructions.substring(0, 100)}...</Card.Text>
                  <Card.Text>
                    <strong>Ingredienser:</strong><br />
                    {getIngredients(meal).slice(0, 3).map((i, idx) => (
                      <span key={idx}>{i}<br /></span>
                    ))}
                  </Card.Text>
                  <div className="d-flex gap-2">
                    <Button variant="info" onClick={() => setSelectedMeal(meal)}>Visa recept</Button>
                    <a href={meal.strYoutube} target="_blank" rel="noopener noreferrer">
                      <Button variant="primary">YouTube</Button>
                    </a>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {selectedMeal && (
        <Modal show={true} onHide={() => setSelectedMeal(null)} size="lg" centered>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
            <Modal.Header closeButton>
              <Modal.Title>{selectedMeal.strMeal}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <img
                src={selectedMeal.strMealThumb}
                alt={selectedMeal.strMeal}
                className="img-fluid mb-3 rounded d-block mx-auto"
                style={{ maxHeight: '200px', objectFit: 'contain' }}
              />
              <h5>Ingredienser:</h5>
              <ul>
                {getIngredients(selectedMeal).map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
              <h5 className="mt-4">Instruktioner:</h5>
              <p>{selectedMeal.strInstructions}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setSelectedMeal(null)}>
                Stäng
              </Button>
            </Modal.Footer>
          </motion.div>
        </Modal>
      )}
    </motion.div>
  );
};

export default SearchMeal;
