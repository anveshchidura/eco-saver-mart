const { Router } = require('express');
const router = Router();
const { cloudinary } = require('../config/cloudinary');
const isAuth = require('../middlewares/isAuth')
const Product = require('../models/Product');
const User = require('../models/User');
const moment = require('moment');

const productService = require('../services/productService');

router.get('/', async (req, res) => {
    const { page, search } = req.query;
    console.log("entered");
    console.log(search);
    try {
        let products;
        if (search !== '' && search !== undefined) {
            products = await Product.find();
            products = products.filter(x => x.active == true)
            products = products.filter(x => x.title.toLowerCase().includes(search.toLowerCase()) || x.city.toLowerCase().includes(search.toLowerCase()))
            res.status(200).json({ products: products });
        } else {

            products = await Product.find();
            products = products.filter(x => x.active == true)
            res.status(200).json({ products: products });
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/:category', async (req, res) => {

    const { page } = req.query;
    try {
        let products = await Product.paginate({ category: req.params.category, active: true }, { page: parseInt(page) || 1, limit: 10 });
        res.status(200).json({ products: products.docs, pages: products.pages });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

router.get('/specific/:id', async (req, res) => {
    try {
        let product = await (await Product.findById(req.params.id)).toJSON()
        let seller = await (await User.findById(product.seller)).toJSON()
        product.addedAt = moment(product.addedAt).format('D MMM YYYY  HH:mm')
        let jsonRes = {
            ...product,
            name: seller.name,
            phoneNumber: seller.phoneNumber,
            email: seller.email,
            createdSells: seller.createdSells.length,
            avatar: seller.avatar,
            sellerId: seller._id,

            isAuth: false
        }
        if (req.user) {
            let user = await User.findById(req.user._id)
            jsonRes.isSeller = Boolean(req.user._id == product.seller);
            jsonRes.isWished = user.wishedProducts.includes(req.params.id)
            jsonRes.isAuth = true
        }
        res.status(200).json(jsonRes);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

router.post('/create', async (req, res) => {
    let { title, quantity, price, originalPrice, description, city, category, image, flexibility, address1, address2, stateName, zipcode, expiryDate } = req.body;
    try {
        console.log(JSON.stringify(req.user));
        let errors = [];
        if (title.length < 3 || title.length > 50) errors.push('Title should be at least 3 characters long and max 50 characters long; ');
        if (isNaN(Number(price))) errors.push('Price should be a number; ');
        if (isNaN(Number(quantity))) errors.push('Quantity should be a number; ');
        if (isNaN(Number(zipcode))) errors.push('Zipcode should be a number; ');

        if (description.length < 10 || description.length > 1000) errors.push('Description should be at least 10 characters long and max 1000 characters long; ');

        if (!image.includes('image')) errors.push('The uploaded file should be an image; ');
        if (!category) errors.push('Category is required; ');

        if (errors.length >= 1) throw { message: [errors] };

        let compressedImg = await productService.uploadImage(image);
        let user = await productService.findUserById(req.user._id);
        let product = new Product({
            title, price, description, city, category, flexibility, address1, address2, stateName, zipcode, expiryDate,
            quantity: quantity,
            originalPrice: originalPrice,
            image: compressedImg,
            addedAt: new Date(),
            seller: req.user._id,
            created_user_name: user.name,
            created_user_avatar: user.avatar


        })

        console.log(JSON.stringify(user));
        await product.save()
        await productService.userCollectionUpdate(req.user._id, product);

        res.status(201).json({ productId: product._id });
    } catch (err) {
        console.error(err);
        res.status(404).json({ error: err.message })
    }
});

router.patch('/edit/:id', isAuth, async (req, res) => {
    let { title, quantity, price, originalPrice, description, city, category, image } = req.body;
    try {
        let user = await productService.findUserById(req.user._id);
        let product = await productService.findById(req.params.id);
        let errors = [];
        if (user._id.toString() !== product.seller.toString()) {
            errors.push('Permission denied ')
        }

        if (title.length < 3 || title.length > 50) errors.push('Title should be atleast 3 characters long and max 50 characters long; ');
        if (isNaN(Number(price))) errors.push('Price must be a number; ');
        if (isNaN(Number(quantity))) errors.push('Quantity should be a number; ');
        if (description.length < 10 || description.length > 1000) errors.push('Description should be at least 10 characters long and max 1000 characters long; ');
        if (req.body.image) {
            if (!req.body.image.includes('image')) errors.push('The uploaded file should be an image; ');
        }
        if (!category || category == "Choose...") errors.push('Category is mandatory; ');

        if (errors.length >= 1) throw { message: [errors] };

        if (req.body.image) {
            let compressedImg = await productService.uploadImage(req.body.image);
            await productService.edit(req.params.id, { title, quantity, price, originalPrice, description, city, category, image: compressedImg });
        } else {
            await productService.edit(req.params.id, { title, quantity, price, originalPrice, description, city, category });
        }
        res.status(201).json({ message: 'Updated!' });
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
})

router.get('/sells/active/:id', async (req, res) => {
    try {
        let userId = '';
        if (req.params.id) {
            userId = req.params.id
        } else {
            userId = req.user_id
        }
        let user = await (await User.findById(userId).populate('createdSells')).toJSON();
        res.status(200).json({ sells: user.createdSells.filter(x => x.active), user });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

router.get('/sells/archived', async (req, res) => {
    try {
        let user = await (await User.findById(req.user._id).populate('createdSells')).toJSON();
        res.status(200).json({ sells: user.createdSells.filter(x => x.active == false), user });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

router.get('/enable/:id', async (req, res) => {
    try {
        await Product.updateOne({ _id: req.params.id }, { active: true });
        res.status(200).json({ msg: "Activated" });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

router.get('/archive/:id', async (req, res) => {
    try {
        await Product.updateOne({ _id: req.params.id }, { active: false });
        res.status(200).json({ msg: "Successfully Archived" });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});



router.get('/wish/:id', async (req, res) => {
    try {
        let user = await User.findById(req.user._id);

        if (!user.wishedProducts.includes(req.params.id)) {
            await User.updateOne({ _id: req.user._id }, { $push: { wishedProducts: req.params.id } })
            await Product.updateOne({ _id: req.params.id }, { $push: { likes: user } });

            res.status(200).json({ msg: "wished" });
        } else {
            await User.updateOne({ _id: req.user._id }, { $pull: { wishedProducts: req.params.id } })
            await Product.updateOne({ _id: req.params.id }, { $pull: { likes: req.user._id } });

            res.status(200).json({ msg: "unwished" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

router.get('/wishlist/:id', async (req, res) => {
    try {
        let user = await (await User.findById(req.user._id).populate('wishedProducts')).toJSON();

        res.status(200).json({ wishlist: user.wishedProducts });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});


router.patch('/confirmSell/:id', isAuth, async (req, res) => {

    let { salePrice, saleFlag, active } = req.body;
    try {
        let user = await productService.findUserById(req.user._id);
        let product = await productService.findById(req.params.id);
        let errors = [];
        if (user._id.toString() !== product.seller.toString()) {
            errors.push('You have no permission to perform this action! ')
        }

        if (salePrice.length < 0) errors.push('salePrice should greater than zero; ');
        if (isNaN(Number(salePrice))) errors.push('salePrice should be a number; ');


        if (errors.length >= 1) throw { message: [errors] };
        if (salePrice > 0) {
            saleFlag = true;
            active = false;
        }

        if (req.body.image) {
            let compressedImg = await productService.uploadImage(req.body.image);
            await productService.edit(req.params.id, { salePrice, saleFlag, active });
        } else {
            await productService.edit(req.params.id, { salePrice, saleFlag, active });
        }
        res.status(201).json({ message: 'Saleprice Updated!' });
    } catch (err) {
        res.status(404).json({ error: err.message });
    }

});


module.exports = router;