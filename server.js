const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.set("view engine", "ejs")

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('static'));

const pizzaRouter = require("./routers/pizzas")
app.use("/api/pizza", pizzaRouter)

const allergensRouter = require("./routers/allergens")
app.use("/api/allergens", allergensRouter)

app.get('/', function (req, res) {
    res.render("index");
});
app.get('/pizza/list', function (req, res) {
    let package = JSON.parse(fs.readFileSync("./menu.json"));
    res.render("menu", { pizzasList: package })
})

app.get("/myorder", function (req, res) {
    let package = JSON.parse(fs.readFileSync("./order.json"));

    const sum = package.orders.reduce((summary, current) => {
        return summary + (Number(current.price) * Number(current.number));
    }, 0);

    res.render("order", { orderList: package.orders, sum });
});
app.post("/myorder", function (req, res) {
    fs.readFile("./order.json", (err, data) => {
        if (err) {
            throw err;
        } else {
            const package = JSON.parse(data);
            const orders = package.orders;
            const newOrder = req.body;

            const oldOrderIndex = orders.findIndex(
                (order) => order.pizza === newOrder.pizza
            );

            if (oldOrderIndex > -1) {
                orders[oldOrderIndex].number =
                    Number(orders[oldOrderIndex].number) + Number(newOrder.number);
            } else {
                package.orders.push(newOrder);
            }
            fs.writeFile("./order.json", JSON.stringify(package, null, 2), (err) => {
                if (err) {
                    throw err;
                } else {
                    res.redirect(301, "/pizza/list");
                }
            });
        }
    });
});
app.post("/checkout", (req, res) => {
    const initObject = {
        orders: [],
    };
    fs.writeFile("./order.json", JSON.stringify(initObject, null, 2), (err) => {
        if (err) {
            throw err;
        } else {
            res.redirect(301, "/");
        }
    });
});

const port = 9001;

app.listen(port, (_) => console.log(`http://127.0.0.1:${port}`));