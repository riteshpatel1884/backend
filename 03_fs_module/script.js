const fs = require('fs');


// Write file means creating a file
// fs.writeFile(file,data[],options] , callback )
// fs.writeFile("ritu.txt", "hello ritu", function(err){
//     if(err) console.log(err);
//     else console.log("done");
// } ) // or write file name in single quote 


// Appending content
// fs.appendFile("ritu.txt", "how are you", function(err){
//     if(err) console.log(err);
//         else console.log("appended");
// })


// // Renaming a file
// fs.rename("rit.txt", "ritu.txt", function(err){
//     if(err) console.log(err);
//         else console.log("done");
// })


// // copying a file
// fs.copyFile("ritu.txt", "copied.txt", function(err) {
//     if(err) console.log(err)
//         else console.log("copied");
// })


// // coping to a folder file whose folder does not exist
// fs.copyFile("ritu.txt", "./copied/copied.txt", function(err) {
//     if(err) {
//         console.log(err)
//     console.log(err.message)}
//         else console.log("copied");
// })

// // {
// //   errno: -4058,
// //   code: 'ENOENT',
// //   syscall: 'copyfile',
// //   path: 'D:\\Backend\\ritu.txt',
// //   dest: 'D:\\Backend\\copied\\copied.txt'
// // }
// // ENOENT: no such file or directory, copyfile 'D:\Backend\ritu.txt' -> 'D:\Backend\copied\copied.txt'


// // Deleting a file
// fs.unlink("copied.txt", function(err) {
//     if(err) console.log(err)
//         else console.log("copied");
// })


// // To remove a folder: but sirf khali folder hi delete kr shakte hai. 
// // Agar isme kuch files hai then wo folder delete nhi kar shakte hai. 

// fs.rmdir("./copied", function(err) {
//     if(err) console.log(err)
//         else console.log("copied");
// })
// // [Error: ENOTEMPTY: directory not empty, rmdir 'D:\Backend\copied'] {
// //   errno: -4051,
// //   code: 'ENOTEMPTY',
// //   syscall: 'rmdir',
// //   path: 'D:\\Backend\\copied'
// // }

// // Since it is not empty so it can't be deleted. To delete it use recursive:true
// fs.rmdir("./copied",{recursive:true}, function(err) {
//     if(err) console.log(err)
//         else console.log("copied");
// })

// // use either rm or rmdir
 

// Creating a folder - Asynchronous way
// fs.mkdir("myFolder", (err) => {
//     if (err) {
//         console.log(err);
//         return;
//     }
//     console.log("Folder created");
// });


// Creating a folder - Synchronous way
// fs.mkdirSync("myFolder");
// console.log("Folder created");


// Reading folder content 
// fs.readdir("myFolder", (err, files) => {
//     if (err) {
//         console.log(err);
//         return;
//     }
//     console.log(files);
// });

// [ 'file.js', 'file2.txt' ]


// // Read a file 
// fs.readFile("myFolder/file2.txt", "utf8", (err, data) => {
//     if (err) {
//         console.log(err);
//         return;
//     }

//     console.log(data);
// });

// Hi, I am Ritesh  