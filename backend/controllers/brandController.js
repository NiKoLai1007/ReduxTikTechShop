const { brand } = require ('../models/brand')
const ImageFile = require ('../utils/imageUpload')


exports.MyBrand = async (req, res) => {
    const brandList = await brand.find();
console.log(brandList);
    if (!brandList) {
        res.status(500).json({ success: false })
    }
    res.status(200).json({brandList});
}

exports.BrandId = async (req, res) => {
    const brand = await brand.findById(req.params.id);

    if (!brandList) {
        res.status(500).json({ message: 'The Brand with the given ID was not found.' })
    }
    res.status(200).send(brands);
}

exports.CreateBrand = async (req, res) => {
       console.log(req.body)
        req.body.icon = await ImageFile.uploadMultiple({
          imageFiles: req.files,
          request: req,
        });
        
    console.log(req)
    const brands = await brand.create(req.body);

    if (!brands)
        return res.status(400).send('the brand cannot be created!')

    res.send(brands);
}

exports.GetBrand = async (req, res) => {
    const brand = await Brand.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            icon: req.body.icon || Brand.icon,
            color: req.body.color,
        },
        { new: true }
    )

    if (!brands)
        return res.status(400).send('the brands cannot be created!')

    res.send(brands);
}