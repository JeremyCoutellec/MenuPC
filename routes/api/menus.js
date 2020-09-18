const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Menu = require('../../models/Menu');

// @route POST api/menus
// @desc Create a menu
// @access Private
router.post(
  '/',
  [auth, [check('name', 'Le nom du menu est obligatoire').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { name, date, description, logo, dishes } = req.body;

    const menuField = {};
    menuField.user = req.user.id;

    if (name) menuField.name = name;
    if (date) menuField.date = date;
    if (description) menuField.description = description;
    if (logo) menuField.logo = logo;
    if (dishes) menuField.dishes = dishes;

    try {
      let menu = await Menu.findOne({ user: req.user.id, name });
      if (menu) {
        //Check user
        if (menu.user.toString() !== req.user.id) {
          return res.status(401).json({ msg: 'Utilisateur non autorisé' });
        }
        // Update
        menu = await Menu.findOneAndUpdate(
          { user: req.user.id, name },
          { $set: menuField },
          { new: true }
        );

        return res.json(menu);
      }
      // Create
      menu = new Menu(menuField);
      await menu.save();
      res.json(menu);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route PUT api/menus/:id
// @desc Update menu bu Id
// @access Private
router.put('/:id', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  try {
    const menu = await Menu.findById(req.params.id);

    if (!menu) {
      return res.status(404).json({ msg: 'Menu non trouvé' });
    }
    //Check user
    if (menu.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Utilisateur non autorisé' });
    }
    const { name, date, description, logo, dishes } = req.body;

    // Update
    if (name) menu.name = name;
    if (date) menu.date = date;
    if (description) menu.description = description;
    if (logo) menu.logo = logo;
    if (dishes) menu.dishes = dishes;

    const newMenu = await Menu.findByIdAndUpdate(
      req.params.id,
      { $set: menu },
      { new: true }
    );
    res.json(newMenu);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Menu non trouvé' });
    }
    res.status(500).send('Server Error');
  }
});

// @route GET api/menus
// @desc Get all menus by user
// @access Private
router.get('/', auth, async (req, res) => {
  try {
    const menus = await Menu.find({ user: req.user.id });
    res.json(menus);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route GET api/menus/:id
// @desc Get menu by ID
// @access Public
router.get('/:id', async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);

    if (!menu) {
      return res.status(404).json({ msg: 'Menu non trouvé' });
    }
    res.json(menu);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Menu non trouvé' });
    }
    res.status(500).send('Server Error');
  }
});

// @route DELETE api/menus/:id
// @desc Delete menu by ID
// @access Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);

    if (!menu) {
      return res.status(404).json({ msg: 'Menu non trouvé' });
    }
    //Check user
    if (menu.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Utilisateur non autorisé' });
    }

    await menu.remove();

    res.json({ msg: 'Menu supprimé' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Menu non trouvé' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
