const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Dish = require('../../models/Dish');
const Category = require('../../models/Category');

// @route POST api/dishes
// @desc Create a dish
// @access Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Le nom du menu est obligatoire').not().isEmpty(),
      check('price', 'Le prix est obligatoire').not().isEmpty(),
      check('price', 'Le prix doit être supérieur à 0').isFloat({ gt: 0 }),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { category, name, price, composition, description } = req.body;

    const dishField = {};
    dishField.user = req.user.id;

    if (name) dishField.name = name;
    if (price) dishField.price = price;
    if (description) dishField.description = description;
    if (composition) {
      dishField.composition = composition
        .split(',')
        .map(ingredient => ingredient.trim());
    }

    try {
      // Test if category exist
      if (category) {
        const isCategoryExist = await Category.findById(category);

        if (!isCategoryExist) {
          return res.status(404).json({ msg: 'Catégorie non trouvée' });
        }
        dishField.category = category;
      }

      let dish = await Dish.findOne({ user: req.user.id, name });
      if (dish) {
        //Check user
        if (dish.user.toString() !== req.user.id) {
          return res.status(401).json({ msg: 'Utilisateur non autorisé' });
        }
        // Update
        dish = await Dish.findOneAndUpdate(
          { user: req.user.id, name },
          { $set: dishField },
          { new: true }
        );

        return res.json(dish);
      }
      // Create
      dish = new Dish(dishField);
      await dish.save();
      res.json(dish);
    } catch (err) {
      console.error(err.message);
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Catégorie non trouvée' });
      }
      res.status(500).send('Server Error');
    }
  }
);

// @route PUT api/dishes/:id
// @desc Update dish by Id
// @access Private
router.put('/:id', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  try {
    const dish = await Dish.findById(req.params.id);

    if (!dish) {
      return res.status(404).json({ msg: 'Plat non trouvé' });
    }
    //Check user
    if (dish.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Utilisateur non autorisé' });
    }
    const { category, name, price, composition, description } = req.body;

    // Update
    if (name) dish.name = name;
    if (price) dish.price = price;
    if (description) dish.description = description;
    if (composition) {
      dish.composition = composition
        .split(',')
        .map(ingredient => ingredient.trim());
    }
    // Test if category exist
    if (category) {
      const isCategoryExist = await Category.findById(category);

      if (!isCategoryExist) {
        return res.status(404).json({ msg: 'Catégorie non trouvée' });
      }
      dish.category = category;
    }

    const newDish = await Dish.findByIdAndUpdate(
      req.params.id,
      { $set: dish },
      { new: true }
    );
    res.json(newDish);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Plat non trouvé' });
    }
    res.status(500).send('Server Error');
  }
});

// @route GET api/dishes
// @desc Get all dishes by user
// @access Private
router.get('/', auth, async (req, res) => {
  try {
    const dishes = await Dish.find({ user: req.user.id });
    res.json(dishes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route GET api/dishes/:id
// @desc Get dish by ID
// @access Public
router.get('/:id', async (req, res) => {
  try {
    const dish = await Dish.findById(req.params.id);

    if (!dish) {
      return res.status(404).json({ msg: 'Plat non trouvé' });
    }
    res.json(dish);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Plat non trouvé' });
    }
    res.status(500).send('Server Error');
  }
});

// @route DELETE api/menus/:id
// @desc Delete menu by ID
// @access Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const menu = await Dish.findById(req.params.id);

    if (!menu) {
      return res.status(404).json({ msg: 'Plat non trouvé' });
    }
    //Check user
    if (menu.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Utilisateur non autorisé' });
    }

    await menu.remove();

    res.json({ msg: 'Plat supprimé' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Plat non trouvé' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
