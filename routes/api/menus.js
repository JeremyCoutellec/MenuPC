const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Menu = require('../../models/Menu');

// @route POST api/menus
// @desc Create Or Update a menu
// @access Private
router.post('/', auth, async (req, res) => {
  const { name, date, description, logo, dishes } = req.body;

  const menuField = {};
  menuField.user = req.user.id;

  menuField.name = name ? name : '';
  menuField.date = date ? date : '';
  menuField.description = description ? description : '';
  menuField.logo = logo ? logo : '';

  try {
    let menu = await Menu.findOne({ user: req.user.id });
    if (menu) {
      //Check user
      if (menu.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'Utilisateur non autorisé' });
      }
      // Update
      menu = await Menu.findOneAndUpdate(
        { user: req.user.id },
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
});

// @route GET api/menus
// @desc Get menu by user
// @access Private
router.get('/', auth, async (req, res) => {
  try {
    const menu = await Menu.findOne({ user: req.user.id });
    res.json(menu);
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
