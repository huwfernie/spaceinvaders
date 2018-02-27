const router = require('express').Router();
const statics = require('../controllers/statics');

router.route('/')
  .get(statics.index);

router.all('*', (req, res) => res.notFound());

module.exports = router;
