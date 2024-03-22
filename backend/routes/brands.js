const { brand } = require('../models/brand');
const express = require('express');
const router = express.Router();

const { MyBrand, BrandId, CreateBrand, GetBrand } = require ('../controllers/brandController');

router.get(`/`, MyBrand);

router.get('/:id', BrandId );

router.post('/', CreateBrand);

router.put('/:id', GetBrand);

// router.delete('/:id', (req, res) => {
//     Category.findByIdAndRemove(req.params.id).then(category => {
//         if (category) {
//             return res.status(200).json({ success: true, message: 'the category is deleted!' })
//         } else {
//             return res.status(404).json({ success: false, message: "category not found!" })
//         }
//     }).catch(err => {
//         return res.status(500).json({ success: false, error: err })
//     })
// })

module.exports = router;