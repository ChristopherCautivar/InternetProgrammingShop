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

    res.render("index");

});



app.get("/productSearch", async function(req, res){
    
    let sqlCategories = await getCategories();
    let sqlProductNames = await getProductNames();
    //console.log(sqlCategories);
    //res.send("it works!");
    res.render("productSearch", {"categories":sqlCategories, "productName":sqlProductNames}); //"authors":sqlAuthors

}); //root  

app.get("/products", async function(req, res){

    // let keyword = req.query.keyword;
    // console.log(keyword);
    let rows = await getProducts(req.query);  //await needs async and a promise
    // console.log(rows);
    res.render("products", {"records": rows});

});


app.get("/productInfo", async function(req, res){

    // let keyword = req.query.keyword;
    console.log("app.get(/productInfo: " + req.query.productId);
    
    let rows = await getProductInfo(req.query.productId);  //await needs async and a promise
    console.log(rows);
    // res.render("quotes", {"records": rows});
    //firstName, lastName, dob, dod, sex, profession, country, portrait, biography
    res.send(rows);

});




function getCategories(){
    
    let conn = dbConnection();
    return new Promise(function(resolve, reject){
        conn.connect(function(err) {
           if (err) throw err;
           console.log("Connected!");
        
            let sql = `SELECT DISTINCT category FROM products ORDER BY category`;

            conn.query(sql, function (err, rows, fields) {
                if (err) throw err;
                //res.send(rows);
                conn.end();
                resolve(rows);
            });
        
        });//connect
    });//promise
}//getCats func

function getProductNames(){
    
    let conn = dbConnection();
    return new Promise(function(resolve, reject){
        conn.connect(function(err) {
           if (err) throw err;
           console.log("Connected!");
        
            let sql = `SELECT DISTINCT productName FROM products ORDER BY productName`;

            conn.query(sql, function (err, rows, fields) {
                if (err) throw err;
                //res.send(rows);
                resolve(rows);
            });
        
        });//connect
    });//promise
}//getLastNames func

function getProductInfo(productId){
    let prod = productId;
    console.log("prod = "+ prod);
    let conn = dbConnection();
    return new Promise(function(resolve, reject){
        conn.connect(function(err) {
           if (err) throw err;
           console.log("Connected!");
        
            let sql = `SELECT * FROM products 
                    WHERE productId = ${productId}`;
            console.log("getProductInfo sql: "+ sql);
            
            conn.query(sql, function (err, rows, fields) {
                if (err) throw err;
                conn.end();
                resolve(rows);
            });
        
        });//connect
    });//promise
}//getAuthorInfo func


function getProducts(query){
    
    let keyword = query.keyword;
    let category = query.category;
    let productName = query.productName;
    let price = query.price;
    
    let conn = dbConnection();
    return new Promise(function(resolve, reject){
        conn.connect(function(err) {
           if (err) throw err;
           console.log("Connected!");
        
        let params = [];
        let sql = `SELECT productName, category, productId, price FROM products 
                    WHERE productName LIKE '%${keyword}%'`;
    
        if (category) {
            sql += " AND category = ?"; //To prevent sql injection, sql statesment shouldn't have any single quotes
            params.push(query.category);
        }
        
        if (productName) {
            sql += " AND productName = ?"; 
            params.push(query.lastName);
        }
        if (price) {
            sql += " AND price = ?"; 
            params.push(query.price);
        }
                    
            conn.query(sql, params, function (err, rows, fields) {
                if (err) throw err;
                //res.send(rows);
                conn.end();
                resolve(rows);
            });
        
        });//connect
    });//promise
}//getQuotes func



//values in red must be updated
function dbConnection(){
   let conn = mysql.createConnection({
                host: "cst336db.space",
                user: "cst336_dbUser17", // cst336_dbUser
                password: "v02jzk",    // secret
                database: "cst336_db17"  // cst336_db
    }); //createConnection
    return conn;
}



//starting server
app.listen(process.env.PORT, process.env.IP, function(){
console.log("Express server is running...");
});