import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, Button, Spinner, Modal } from 'react-bootstrap';

const RandomMeal = () => {
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const fetchMeal = async () => {
    setLoading(true);
    const res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const data = await res.json();
    setMeal(data.meals[0]);
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

  useEffect(() => {
    fetchMeal();
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-4">
      <h2 className="text-center mb-4">Random Meal</h2>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : meal ? (
        <>
          <Card className="shadow-sm">
            <div style={{ height: '200px', overflow: 'hidden' }}>
              <Card.Img
                variant="top"
                src={meal.strMealThumb}
                alt={meal.strMeal}
                style={{ maxHeight: '200px', objectFit: 'contain', width: '100%', padding: '1rem' }}
              />
            </div>
            <Card.Body>
              <Card.Title>{meal.strMeal}</Card.Title>
              <Card.Text>{meal.strInstructions.substring(0, 120)}...</Card.Text>
              <div className="d-flex gap-2">
                <Button variant="info" onClick={() => setShowModal(true)}>Visa recept</Button>
                <a href={meal.strYoutube} target="_blank" rel="noopener noreferrer">
                  <Button variant="primary">YouTube</Button>
                </a>
              </div>
            </Card.Body>
          </Card>

          <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
              <Modal.Header closeButton>
                <Modal.Title>{meal.strMeal}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="img-fluid mb-3 rounded d-block mx-auto"
                  style={{ maxHeight: '200px', objectFit: 'contain' }}
                />
                <h5>Ingredienser:</h5>
                <ul>
                  {getIngredients(meal).map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
                <h5 className="mt-4">Instruktioner:</h5>
                <p>{meal.strInstructions}</p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>Stäng</Button>
              </Modal.Footer>
            </motion.div>
          </Modal>
        </>
      ) : (
        <p>Ingen måltid hittades.</p>
      )}
    </motion.div>
  );
};

export default RandomMeal;
