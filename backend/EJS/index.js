const express = require("express");
const app = express();
let port = 8080;
const path = require("path");



app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));


app.get("/", (req, res) => {
    console.log("home page is active");
    res.render("home.ejs");
});

app.get("/rollsdice", (req, res) => {
    console.log("dice rolling is active ");
    let diceval = Math.floor(Math.random() * 6) + 1;
    res.render("rollsdice.ejs", { num: diceval });

});


app.get("/ig/:username", (req, res) => {
    // let { username } = req.params;
    // let followers = ["manav", "kiyan", "kiran", "keyur"];
    // res.render("instagram.ejs", { username, followers });


    let { username } = req.params;
    const instadata = require("./data.json");
    const data = instadata[username];
    console.log(data);
    if (data) {
        res.render("instagram.ejs", { data });
    }
    else {
        res.render("error.ejs");
    }
})



app.listen(port, () => {
    console.log(`${port} is active`);
});