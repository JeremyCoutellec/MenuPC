const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Category = require('../../models/Category');

// @route POST api/categories
// @desc Create a category
// @access Private
router.post(
  '/',
  [
    auth,
    [check('name', 'Le nom de la catégorie est obligatoire').not().isEmpty()],
    [check('type', 'Le type de la catégorie est obligatoire').not().isEmpty()],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { name, type, logo, description } = req.body;

    const categoryField = {};
    categoryField.user = req.user.id;

    categoryField.name = name;
    categoryField.type = type;
    categoryField.logo = logo ? logo : '';
    categoryField.description = description ? description : '';

    try {
      let category = await await Category.findOne({
        user: req.user.id,
        name,
        type,
      });

      if (category) {
        //Check user
        if (category.user.toString() !== req.user.id) {
          return res.status(401).json({ msg: 'Utilisateur non autorisé' });
        }
        // Update
        category = await Category.findOneAndUpdate(
          { user: req.user.id, name, type },
          { $set: categoryField },
          { new: true }
        );

        return res.json(category);
      }
      // Create
      category = new Category(categoryField);
      await category.save();
      res.json(category);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route GET api/categories
// @desc Get all categories by user
// @access Private
router.get('/', auth, async (req, res) => {
  try {
    const categories = await Category.find({ user: req.user.id });
    res.json(categories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route GET api/categories/type/:idType
// @desc Get all categories by type
// @access Private
router.get('/type/:idType', auth, async (req, res) => {
  try {
    const categories = await Category.find({
      user: req.user.id,
      type: req.params.idType,
    });
    res.json(categories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route GET api/categories/:id
// @desc Get category by ID
// @access Public
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ msg: 'Catégorie non trouvée' });
    }
    res.json(category);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Catégorie non trouvée' });
    }
    res.status(500).send('Server Error');
  }
});

// @route PUT api/categories/:id
// @desc Update category by Id
// @access Private
router.put('/:id', auth, async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ msg: 'Categorie non trouvée' });
    }
    //Check user
    if (category.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Utilisateur non autorisé' });
    }

    const { name, type, logo, description } = req.body;

    // Update
    category.name = name ? name : category.name;
    category.type = type.toString() ? type : category.type;
    category.logo = logo ? logo : category.logo;
    category.description = description ? description : category.description;

    const newCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { $set: category },
      { new: true }
    );

    res.json(newCategory);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Catégorie non trouvée' });
    }
    res.status(500).send('Server Error');
  }
});

// @route DELETE api/categories/:id
// @desc Delete category by ID
// @access Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ msg: 'Catégorie non trouvée' });
    }
    //Check user
    if (category.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Utilisateur non autorisé' });
    }

    await category.remove();

    res.json({ msg: 'Catégorie supprimé' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Catégorie non trouvée' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
