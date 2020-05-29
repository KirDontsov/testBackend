const express = require("express");
const cors = require("cors");

const db = require("./core/db");
const { ProductController } = require("./controllers");

const app = express();

app.use(express.json());

app.use(cors());

app.get("/products", ProductController.all);
app.post("/product", ProductController.create);
app.delete("/product/:id", ProductController.remove);
app.patch("/product/:id", ProductController.update);
app.get("/product/:id", ProductController.show);

app.listen("8000", function(err) {
	if (err) {
		return console.log("change port");
	}
	console.log("server is running");
});
