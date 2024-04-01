const { brand } = require('../models/brand');
const express = require('express');
const upload = require('../utils/multer')
const router = express.Router();

const { MyBrand, BrandId, CreateBrand, UpdateBrand, GetBrand, deleteBrand} = require ('../controllers/brandController');

router.get(`/all/brands`, MyBrand);

router.get('/:id', BrandId );

router.post('/create',upload.array('icon'), CreateBrand);

router.put('/update/brands/:id',upload.array('images'), UpdateBrand);

// router.delete('/delete/brands/:id', deleteBrand)

router.delete('/delete/:id', deleteBrand);

router.put('/:id', GetBrand);


// router.delete('/:id', (req, res) => {
//     brand.findByIdAndRemove(req.params.id).then(brand => {
//         if (brand) {
//             return res.status(200).json({ success: true, message: 'Brand is Deleted!' })
//         } else {
//             return res.status(404).json({ success: false, message: "Brand not Found!" })
//         }
//     }).catch(err => {
//         return res.status(500).json({ success: false, error: err })
//     })
// })

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