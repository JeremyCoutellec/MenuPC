const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');
const Company = require('../../models/Company');
const Menu = require('../../models/Menu');

// @route  POST api/users
// @desc   Register user
// @access Public
router.post(
  '/',
  [
    check('name', 'Le nom est obligatoire').not().isEmpty(),
    check('email', "L'email doit être valide").isEmail(),
    check('companyName', "Le nom de l'entreprise est obligatoire")
      .not()
      .isEmpty(),
    check('companyEmail', "L'email de l'entreprise doit être valide").isEmail(),
    check(
      'password',
      'Le mot de passe doit contenir au moins 6 caractères'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "L'utilisateur existe déjà" }] });
      }

      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });

      user = new User({
        name,
        email,
        avatar,
        password,
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // Create company
      const {
        companyName,
        localisation,
        description,
        companyEmail,
        logo,
        website,
        isSocial,
        youtube,
        twitter,
        facebook,
        linkedin,
        instagram,
      } = req.body;

      const userCompany = await User.findOne({ name, email });
      const companyField = {};
      companyField.user = userCompany._id;

      companyField.name = companyName;
      companyField.localisation = localisation || '';
      companyField.description = description || '';
      companyField.email = companyEmail || '';
      companyField.logo = logo || '';
      companyField.website = website || '';

      // Build social object
      companyField.social = {};
      console.log(isSocial);
      companyField.social.youtube = (isSocial && youtube) || '';
      companyField.social.facebook = (isSocial && facebook) || '';
      companyField.social.twitter = (isSocial && twitter) || '';
      companyField.social.instagram = (isSocial && instagram) || '';
      companyField.social.linkedin = (isSocial && linkedin) || '';

      // Create
      company = new Company(companyField);
      await company.save();

      // Create Menu
      const menuField = {};
      menuField.user = userCompany._id;

      menuField.name = `La carte ${companyName}`;

      // Create
      menu = new Menu(menuField);
      await menu.save();

      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000, // on prod 3600
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
