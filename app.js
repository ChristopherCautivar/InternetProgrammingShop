const express = require("express");
const mysql = require("mysql")
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public")); //folder for images, css, js
app.use(express.urlencoded()); // used to parse data sent using the POST method
// Recall all middleware for app.use executes every time before routes

// app.use(myMiddleware);

// function myMiddleware(req, res, next){
//     console.log(new Date());
//     next(); // passes control to back to server to do the next thing.
// }

//routes
app.get("/", function(req, res){

    res.send("it works");

});



// app.post("/addAuthor", async function(req, res){
//     // req.body has form info, but is encoded. see the above middleware included to parse it.
//     let rows = await insertAuthor(req.body);
//     console.log(rows);
//     let message = "Author WAS NOT added to the datanase!";
//     if(rows.affectedRows > 0){
//         message = "Author successfully added!";
//     }
//     res.render("newAuthor", {"message":message});

// });


//functions should be in a separate file by convention

// function dbConnection(){

       
//     let conn = mysql.createConnection({
//                 host: "cst336db.space",
//                 user: "cst336_dbUser7",
//                 password: "fo14c3",
//                 database:"cst336_db7"
//       }); //createConnection


// return conn;

// }

// function insertAuthor(body){
//     let conn = dbConnection();
//     // promise only surrounds async code
    
//     return new Promise(function(resolve, reject){
//         conn.connect(function(err) {
//             if (err) throw err;
//             console.log("Connected!");

//             let sql = `INSERT INTO q_author
//             (firstName, lastName, sex)
//             VALUES (?,?,?)`;
            
//             let params = [body.firstName, body.lastName, body.gender]

//             conn.query(sql, params, function (err, rows, fields) {
//                 if (err) throw err;
//                 // res.send(rows);
//                 conn.end();
//                 resolve(rows);
//             });

//         });// connection
//     });//promise
// }



//starting server
app.listen(process.env.PORT, process.env.IP, function(){
console.log("Express server is running...");
});