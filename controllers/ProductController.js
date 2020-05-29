const { Product } = require("../models");

function ProductController() {}

const create = function(req, res) {
	const data = {
		id: req.body.id,
		name: req.body.name,
		desc: req.body.desc,
		price: req.body.price,
		testo: req.body.testo,
		diametr: req.body.diametr,
		weight: req.body.weight,
		numberOfPersons: req.body.numberOfPersons,
		protein: req.body.protein,
		fat: req.body.fat,
		energy: req.body.energy,
		img: req.body.img
	};

	Product.create(data, function(err, doc) {
		if (err) {
			return res.status(500).json({
				success: false,
				message: err
			});
		}
		res.status(201).json({
			success: true,
			data: doc
		});
	});
	console.log(data);
};

const update = async function(req, res) {
	const productId = req.params.id;

	const data = {
		name: req.body.name,
		desc: req.body.desc,
		price: req.body.price,
		testo: req.body.testo,
		diametr: req.body.diametr,
		weight: req.body.weight,
		numberOfPersons: req.body.numberOfPersons,
		protein: req.body.protein,
		fat: req.body.fat,
		energy: req.body.energy,
		img: req.body.img
	};

	Product.updateOne({ _id: productId }, { $set: data }, function(err, doc) {
		if (err) {
			return res.status(500).json({
				success: false,
				message: err
			});
		}

		if (!doc) {
			return res.status(404).json({
				success: false,
				message: "PRODUCT_NOT_FOUND"
			});
		}

		res.json({
			success: true
		});
	});
};

const remove = async function(req, res) {
	const id = req.params.id;

	try {
		await Product.findOne({ _id: id });
	} catch (e) {
		return res.status(404).json({
			success: false,
			message: "PRODUCT_NOT_FOUND"
		});
	}

	Product.deleteOne({ _id: id }, err => {
		if (err) {
			return res.status(500).json({
				success: false,
				message: err
			});
		}

		res.json({
			status: "succces"
		});
	});
};

const show = async function(req, res) {
	const id = req.params.id;
	try {
		const product = await Product.findById(id)
			.populate("appointments")
			.exec();

		res.json({
			status: "succces",
			data: { ...product._doc }
		});
	} catch (e) {
		return res.status(404).json({
			success: false,
			message: "PRODUCT_NOT_FOUND"
		});
	}
};

const all = function(req, res) {
	Product.find({}, function(err, docs) {
		if (err) {
			return res.status(500).json({
				success: false,
				message: err
			});
		}

		res.json({
			success: true,
			data: docs
		});
	});
};

ProductController.prototype = {
	all,
	create,
	update,
	remove,
	show
};

module.exports = ProductController;
