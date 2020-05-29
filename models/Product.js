const mongoose = require("mongoose");

const { Schema } = mongoose;

const ProductSchema = new Schema({
	id: String,
	name: String,
	desc: String,
	price: String,
	testo: Object,
	diametr: Object,
	weight: String,
	numberOfPersons: String,
	protein: String,
	fat: String,
	energy: String,
	img: String
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
