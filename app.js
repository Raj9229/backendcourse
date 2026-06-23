const express = require("express");
const app = express();
const path = require("path");
app.set("view engine", "ejs");
app.use (express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
const fs = require("fs");


app.get("/", (req, res) => {
    fs.readdir("./files", (err, files) => {  
    res.render("index" , { files });

});

// creating files with name of current date in format dd-mm-yyyy
app.get("/create", (req, res) => {
    const today = new Date();

const day = String(today.getDate()).padStart(2, '0');
const month = String(today.getMonth() + 1).padStart(2, '0');
const year = today.getFullYear();

const fn = `${day}-${month}-${year}`;

    fs.writeFile(`./files/${fn}`, "Hello, World!", (err) => {
        if(err) return res.send("Error creating file");
        else res.send("File created successfully");
    })
});



app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});