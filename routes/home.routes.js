const express = require('express');
const router = express.Router();
const data = require("../data/data");    


router.get('/', (req, res) => {
    res.render('home');
});

router.get('/getData', (req, res) => {
  res.json(data);
});

router.get('/getCategories', (req, res) => {
  // only gives the table with categories
  res.json(data.categories);
});

router.get('/getProducts/:id', (req, res) => {
  const categId = req.params.id;

  const categ = data.categories.find(cat => cat.name.toLowerCase() === categId.toLowerCase());

  res.json(categ.products);
});



module.exports = router;