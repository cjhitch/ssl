// const fs = require('fs');

// fs.readFile('myfile.txt','utf8',function(err, contents){
//     // console.log(err);
//     console.log(contents);
// })

// fs.writeFile('mynodefile.txt','test string','utf8',function(err){
//     console.log('done');
// })

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question('what is your name?',(name)=> {

    rl.question('what is your age?',(age)=>{
        console.log(name, age);
        rl.close()
    })

})