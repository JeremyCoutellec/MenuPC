const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const auth = require('../../middleware/auth');

const Client = require('../../models/Client');
const Company = require('../../models/Company');

// @route POST api/clients
// @desc Create client of the company
// @access Public
router.post(
  '/',
  [
    check('company', "L'identifiant de l'entreprise est obligatoire")
      .not()
      .isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const { clients, company } = req.body;
    const clientField = {};

    try {
      const companyFind = await Company.findById(company);
      if (!companyFind) {
        return res.status(404).json({ msg: 'Entreprise non trouvée' });
      }
      if (clients) {
        clients.map(async client => {
          clientField.lastName = client.lastName ? client.lastName : '';
          clientField.firstName = client.firstName ? client.firstName : '';
          clientField.email = client.email ? client.email : '';
          clientField.phone = client.phone ? client.phone : '';
          clientField.company = company ? company : '';

          client = new Client(clientField);

          await client.save();
        });
      }
      res.json(clients);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route GET api/clients
// @desc Get clients of the user
// @access Private
router.get('/', auth, async (req, res) => {
  try {
    const company = await Company.findOne({ user: req.user.id });
    const clients = await Client.find({ company });
    res.json(clients);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
