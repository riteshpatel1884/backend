const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set("view engine", 'ejs');
app.use(express.static(path.join(__dirname, "public")));


app.get('/', function(req,res){
    fs.readdir(`./files`, function(er, files){  // It will read directory and its content
       res.render("index", {files:files})   // jab folder read ho jaye uske baad hi response render ho . 
    // Now we can send day thing view render to ejs page. so aab ejs me files naam se function wale files ka data aa jayega
    })
      
})

app.post('/create', function(req,res){
fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details, function(err){
    res.redirect('/')
    });
})

// reading file when clicked on read more link
// app.get('/file/:filename', function(req,res){
//     fs.readFile(`./files/${req.params.filename}`,function(err, filedata){
//         console.log(filedata)
//     })
// })
{/* <Buffer 51 75 65 73 74 69 6f 6e 20 31 0d 0a>
<Buffer 51 75 65 73 74 69 6f 6e 20 31 0d 0a> */}
// If we dont use utf-8 then it will show buffer data like this so to convert it 
// in english, use utf -8

app.get('/file/:filename', function(req,res){
    fs.readFile(`./files/${req.params.filename}`,"utf-8", function(err, filedata){
        res.render("show", {filename: req.params.filename, filedata:filedata})
    })
})

// filename url se mil jayega so used req.params and filedata function ke filedata 
// se mil jayega so didnot use req.params

// edit the task
app.get("/edit/:filename", function(req, res) {
    fs.readFile(`./files/${req.params.filename}`, "utf-8", function(err, filedata){
        if(err){
            return res.send("File not found");
        }
        res.render("edit", { filename: req.params.filename, filedata: filedata
        }); // previous filename params se mil jayega and file ka data filename se 
        // mil jayega
    });
});

// submit the new updated form on edit route jisme hame previous and new name milega 
app.post("/edit", function(req, res) {

    const oldPath = `./files/${req.body.previous}`;
    // If new filename is empty, keep the old filename
    const newFileName =
        req.body.new_filename.trim() === ""
            ? req.body.previous
            : req.body.new_filename.trim() + ".txt";
    const newPath = `./files/${newFileName}`;

    fs.rename(oldPath, newPath, function(err){
        if(err){
            console.log(err);
            return res.send("Rename failed");
        }
        fs.writeFile(newPath, req.body.new_details, function(err){
            if(err){
                return res.send("Unable to update file");
            }
            res.redirect("/");
        });
    });
});

app.listen(3000)