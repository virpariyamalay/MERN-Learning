const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require('express');
const app = express();
const Path = require('path');


app.set('view engine', 'ejs');      //to set the view engine
app.set("views", Path.join(__dirname, "/views"));//to set the path of views folder
app.use(express.urlencoded({ extended: false }));//to parse the data from form

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'delta_app',
    password: '8805',
});

let getRandomUser = () => {
    return [
        faker.string.uuid(),
        faker.internet.username(), // before version 9.1.0, use userName()
        faker.internet.email(),
        faker.internet.password(),
    ];
}


let port = 8080;
app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});

//home route
app.get('/', (req, res) => {
    let query = 'select count(*) from users';
    try {
        connection.query(query, (err, result) => {
            if (err)
                throw err;
            let count = result[0]["count(*)"];//to get the count of users
            console.log(count);
            res.render('home.ejs', { count });
            console.log(result);
        });
    }
    catch (e) {
        console.log(e);
        res.send("some error occured in DB");
    }
    connection.end();
});

//show user data route
app.get('/user', (req, res) => {

    let query = 'select id,username,email from users';
    try {
        connection.query(query, (err, result) => {

            if (err)
                throw err;

            let data = result;
            res.render('showuser.ejs', { data });
            //console.log(result);
        });
    }
    catch (e) {
        console.log("failed to fetch data");
    }

});

//edit username route
app.get('/user/:id/edit', (req, res) => {
    let e_id = req.params.id;
    console.log(e_id);
    let query = "select * from users where id = ?";


    try {
        connection.query(query, [e_id], (err, result) => {

            if (err)
                throw err;

            let data = result[0];
            res.render('edit.ejs', { data });
            console.log(data);
        });
    }
    catch (e) {
        console.log("failed to fetch data");
    }


    //res.render("edit.ejs", { e_id });

});



//-------------------------------------------------------------------------------------------------
//WHEN WE HAVE SINGLE VALUE TO INSERT
// let query = "insert into users (id, username, email, password) values(?,?,?,?) ";
// let user = ["123", "123_newuser", "abc@gmail.com", "abc"];
// try {
//     connection.query(query, user, (err, result) => {
//         if (err)
//             throw err;
//         console.log(result);
//     });
// }
// catch (e) {
//     console.log(e);
// }
// connection.end();

//-----------------------------------------------------------------------------------------------

//WHEN WE HAVE MULTIPLE VALUES TO INSERT
// let query = "insert into users (id, username, email, password) values ? ";
// let users = [
//     [124, "123_newusera", "abc@gmail.coma", "abca"],
//     [125, "123_newuserb", "abc@gmail.comb", "abcb"],
//     [126, "123_newuserc", "abc@gmail.comc", "abcc"],
// ];
// try {
//     connection.query(query, [users], (err, result) => {
//         if (err)
//             throw err;
//         console.log(result);
//     });
// }
// catch (e) {
//     console.log(e);
// }
// connection.end();


//-----------------------------------------------------------------------------------------------
//FOR INSERTING 100 RANDOM USERS DATA INTO DATABASE

// let getRandomUser = () => {
//     return [
//         faker.string.uuid(),
//         faker.internet.username(), // before version 9.1.0, use userName()
//         faker.internet.email(),
//         faker.internet.password(),
//     ];
// }
// let data = [];
// let query = "insert into users (id, username, email, password) values ? ";
// for (let i = 0; i < 100; i++) {
//     data.push(getRandomUser());     //pushing 100 random users data
// }
// try {
//     connection.query(query, [data], (err, result) => {
//         if (err)
//             throw err;
//         console.log(result);
//     });
// }
// catch (e) {
//     console.log(e);
// }
// connection.end();

//-----------------------------------------------------------------------------------------------

// let port = 8080;
// app.listen(port, () => {
//     console.log(`Server is running at port ${port}`);
// });

// app.get('/', (req, res) => {
//     res.send("welcome to home page");
// })