const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Company = require('../../models/Company');

// @route POST api/companies
// @desc Create a company
// @access Private
router.post(
  '/',
  [
    auth,
    [check('name', 'Le nom de la catégorie est obligatoire').not().isEmpty()],
    [check('email', "L'email doit être valide").isEmail()],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const {
      name,
      localisation,
      description,
      email,
      logo,
      website,
      isSocial,
      youtube,
      twitter,
      facebook,
      linkedin,
      instagram,
    } = req.body;

    const companyField = {};
    companyField.user = req.user.id;

    companyField.name = name;
    companyField.localisation = localisation || '';
    companyField.description = description || '';
    companyField.email = email || '';
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

    try {
      let company = await await Company.findOne({ user: req.user.id });

      if (company) {
        //Check user
        if (company.user.toString() !== req.user.id) {
          return res.status(401).json({ msg: 'Utilisateur non autorisé' });
        }
        // Update
        company = await Company.findOneAndUpdate(
          { user: req.user.id },
          { $set: companyField },
          { new: true }
        );

        return res.json(company);
      }
      // Create
      company = new Company(companyField);
      await company.save();
      res.json(company);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route GET api/companies
// @desc Get company of the user
// @access Private
router.get('/', auth, async (req, res) => {
  try {
    const company = await Company.findOne({ user: req.user.id });
    res.json(company);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route GET api/companies/user/:userId
// @desc Get company by UserId
// @access Public
router.get('/user/:userId', async (req, res) => {
  try {
    const company = await Company.findOne({ user: req.params.userId });
    res.json(company);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route GET api/companies/:id
// @desc Get company by ID
// @access public
router.get('/:id', async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({ msg: 'Entreprise non trouvée' });
    }
    res.json(company);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Entreprise non trouvée' });
    }
    res.status(500).send('Server Error');
  }
});

// @route DELETE api/companies/:id
// @desc Delete company by ID
// @access Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({ msg: 'Entreprise non trouvée' });
    }
    //Check user
    if (company.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Utilisateur non autorisé' });
    }

    await company.remove();

    res.json({ msg: 'Entreprise supprimée' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Entreprise non trouvée' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
