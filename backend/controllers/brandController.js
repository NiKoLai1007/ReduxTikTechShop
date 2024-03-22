const { brand } = require ('../models/brand')


exports.MyBrand = async (req, res) => {
    const brandList = await brand.find();
console.log(brandList);
    if (!brandList) {
        res.status(500).json({ success: false })
    }
    res.status(200).send(brandList);
}

exports.BrandId = async (req, res) => {
    const brand = await brand.findById(req.params.id);

    if (!brandList) {
        res.status(500).json({ message: 'The Brand with the given ID was not found.' })
    }
    res.status(200).send(brands);
}

exports.CreateBrand = async (req, res) => {
    console.log(req)
    let brand = new Brand({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    })
    brand = await brand.save();

    if (!brand)
        return res.status(400).send('the brand cannot be created!')

    res.send(brand);
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