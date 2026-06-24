const express = require("express");
const app = express();
const path = require("path");
app.set("view engine", "ejs");
app.use (express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
const fs = require("fs");

// reading file on base url
app.get("/", (req, res) => {
    fs.readdir("./files", (err, files) => {  
    res.render("index" , { files });

});
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

//file editing route
app.get("/edit/:filename", (req, res) => {
    fs.readFile(`./files/${req.params.filename}`, "utf8", (err, data) => {
        if(err) return res.send("Error reading file");
        res.render("edit", { filename: req.params.filename, data });
    });
});

app.post("/update/:filename", (req, res) => {
    fs.writeFile(`./files/${req.params.filename}`, req.body.data, (err) => {
        if(err) return res.send("Error updating file");
        res.redirect("/");
    });
});











app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});