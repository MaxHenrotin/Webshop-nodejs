const express = require('express');
const router = express.Router();
//const { categories, products } = require('../data/data');

// Route pour le panier
router.get('/cart', (req, res) => {
    res.render('cart');
});

router.get('/cart/getAll', (req, res) => {
  res.json(req.session.cart || {});
});

router.post('/cart/add/:id', (req, res) => {
  const rawCart = req.session.cart || {};
  const cart = new Map(Object.entries(rawCart));

  const id = req.params.id;

  const currentCount = cart.get(id) || 0;
  cart.set(id, currentCount + 1);

  req.session.cart = Object.fromEntries(cart);
  res.json(req.session.cart);
});

router.post('/cart/remove/:id', (req, res) => {
  const rawCart = req.session.cart || {};
  const cart = new Map(Object.entries(rawCart));

  const id = req.params.id;

  if (cart.has(id)) {
    const count = cart.get(id);
    if (count > 1) {
      cart.set(id, count - 1);
    } else {
      cart.delete(id);
    }
  }

  req.session.cart = Object.fromEntries(cart);
  res.json(req.session.cart);
});

module.exports = router;