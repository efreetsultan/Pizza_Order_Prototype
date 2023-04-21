const { log } = require("console");
const express = require("express");
const allergens = express.Router();
const fs = require('fs');
const package = require("../menu.json")

allergens
.route("/:id")

.get((req, res) => {
	res.send(`<h2>${JSON.stringify(package.allergens[Number(req.params.id)-1])}</h2>`);
})
// .post((req, res) => {
// 	res.send(`Youve got a post`);
// 	const newPackage = req.body;
// 	package.packages.push(newPackage)
// 	fs.writeFileSync(`menu.json`,JSON.stringify(package));
// 	// file written successfully
// })

allergens
.route("/")
.get((req, res) => {
	res.json(package.allergens);
})

// .post((req, res) => {
// 	res.send(`Youve got a post`);
// 	const newPackage = req.body;
// 	package.packages.push(newPackage)
// 	fs.writeFileSync(`./backend/pkgs.json`,JSON.stringify(package));

// })

module.exports = allergens