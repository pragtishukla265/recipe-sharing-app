const authMiddleware = require('../middleware/authMiddleware');
const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

// GET all recipes
router.get('/',authMiddleware, async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// POST a recipe
router.post('/',authMiddleware, async (req, res) => {
  const recipe = new Recipe({
title: req.body.title,
    description: req.body.description,
    ingredients: req.body.ingredients,
    imageUrl: req.body.imageUrl,
    difficulty: req.body.difficulty,
    createdBy: req.user,  // <-- because middleware sets req.user
  });

  try {
    const newRecipe = await recipe.save();
    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;

