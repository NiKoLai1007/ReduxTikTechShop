const { Order } = require('../models/order');
const express = require('express');
const { OrderItem } = require('../models/order-item');
const router = express.Router();
// const user = require('../models/user');
const nodemailer = require("nodemailer");
const { isAuthenticated } = require('../middlewares/auth');



const sendOrderNotification = async (email, order) => {
    //create a nodemailer transport

    const transporter = nodemailer.createTransport({
        //configure the email service
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "acd56bdea70288",
            pass: "fe5d00b3474c67",
        },
    });

    //compose the email message
    const mailOptions = {
        from: 'shan.palima@tup.edu.ph',
        to: email,
        subject: "Order Notification",
    };
    // const productText = products.map(product => `- ${product.name} x${product.quantity}`).join('\n');

    mailOptions.text = `Thank you for ordering from TikTech! \n\nThis is the list of items you've ordered: Payment Method: ${order.paymentMethod}\nOrder Total:₱ ${order.totalPrice}`;

    //send the email
    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log("Error sending verification email", error);
    }
};


router.get(`/`, async (req, res) => {
    const orderList = await Order.find().populate('user', 'name').sort({ 'dateOrdered': -1 });

    if (!orderList) {
        res.status(500).json({ success: false })
    }
   
    res.status(201).json(orderList)
})

router.get(`/:id`, async (req, res) => {
    const order = await Order.findById(req.params.id)
        .populate('user', 'name')
        .populate({
            path: 'orderItems', 
            populate: {
                path: 'product', 
                populate: 'category'
            }
        });

    if (!order) {
        res.status(500).json({ success: false })
    }
    res.send(order);
})

router.post('/', isAuthenticated, async (req, res) => {
    const orderItemsIds = Promise.all(req.body.orderItems.map(async (orderItem) => {
        console.log(req.body)
        // const orderItemsIds = req.body.orderItems.map(async (orderItem) => {
            let newOrderItem = new OrderItem({
                quantity: orderItem.quantity,
                product: orderItem.product
            })

            newOrderItem = await newOrderItem.save();

            return newOrderItem._id;
        })
    )
        console.log(orderItemsIds)
        const orderItemsIdsResolved =  await orderItemsIds;
        console.log(orderItemsIds)
        // const totalPrices = await Promise.all(orderItemsIdsResolved.map(async (orderItemId)=>{
        //     const orderItem = await OrderItem.findById(orderItemId).populate('product', 'price');
        //     const totalPrice = orderItem.product.price * orderItem.quantity;
        //     return totalPrice
        // }))

        // const totalPrice = totalPrices.reduce((a,b) => a +b , 0);

        let order = new Order({
            orderItems: orderItemsIdsResolved,
            shippingAddress1: req.body.shippingAddress1,
            shippingAddress2: req.body.shippingAddress2,
            city: req.body.city,
            zip: req.body.zip,
            country: req.body.country,
            phone: req.body.phone,
            status: req.body.status,
            // totalPrice: totalPrice,
            user: req.body.user,
        })
        console.log(req.user);
        order = await order.save();
        if (req.user && req.user.email) {
            sendOrderNotification(req.user.email, order);
          }
          

        if (!order)
            return res.status(400).send('the order cannot be created!')

        res.send(order);
    })



router.put('/:id', async (req, res) => {
    const order = await Order.findByIdAndUpdate(
        req.params.id,
        {
            status: req.body.status
        },
        { new: true }
    )

    if (!order)
        return res.status(400).send('the order cannot be update!')

    res.send(order);
})


router.delete('/:id', (req, res) => {
    Order.findByIdAndRemove(req.params.id).then(async order => {
        if (order) {
            await order.orderItems.map(async orderItem => {
                await OrderItem.findByIdAndRemove(orderItem)
            })
            return res.status(200).json({ success: true, message: 'the order is deleted!' })
        } else {
            return res.status(404).json({ success: false, message: "order not found!" })
        }
    }).catch(err => {
        return res.status(500).json({ success: false, error: err })
    })
})

router.get('/get/totalsales', async (req, res) => {
    const totalSales = await Order.aggregate([
        { $group: { _id: null, totalsales: { $sum: '$totalPrice' } } }
    ])

    if (!totalSales) {
        return res.status(400).send('The order sales cannot be generated')
    }

    res.send({ totalsales: totalSales.pop().totalsales })
})

router.get(`/get/count`, async (req, res) => {
    const orderCount = await Order.countDocuments((count) => count)

    if (!orderCount) {
        res.status(500).json({ success: false })
    }
    res.send({
        orderCount: orderCount
    });
})

router.get(`/get/userorders/:userid`, async (req, res) => {
    const userOrderList = await Order.find({ user: req.params.userid }).populate({
        path: 'orderItems', populate: {
            path: 'product', populate: 'category'
        }
    }).sort({ 'dateOrdered': -1 });

    if (!userOrderList) {
        res.status(500).json({ success: false })
    }
    res.send(userOrderList);
})



module.exports = router;