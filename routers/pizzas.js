const { log } = require("console");
const express = require("express");
const pizzas = express.Router();
const fs = require('fs');
const package = require("../menu.json")

pizzas
.route("/:id")

.get((req, res) => {
	res.send(`<h2>${JSON.stringify(package.pizzas[Number(req.params.id)-1])}</h2>`);
})
// .post((req, res) => {
// 	res.send(`Youve got a post`);
// 	const newPackage = req.body;
// 	package.packages.push(newPackage)
// 	fs.writeFileSync(`menu.json`,JSON.stringify(package));
// 	// file written successfully
// })

pizzas
.route("/")
.get((req, res) => {
	res.json(package.pizzas);
})

// .post((req, res) => {
// 	res.send(`Youve got a post`);
// 	const newPackage = req.body;
// 	package.packages.push(newPackage)
// 	fs.writeFileSync(`./backend/pkgs.json`,JSON.stringify(package));

// })

module.exports = pizzas