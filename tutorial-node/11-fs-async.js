const { readFile, writeFile } = require("fs");

console.log('start');
readFile("./content/first.txt", "utf-8", (err, result) => {
  if (err) {
    console.log(err);
    return;
  } else {
    const first=result;
    readFile('./content/second.txt','utf-8',(err,result)=>{
        if(err){
            console.log(err);
        }else{
            const second=result;

            writeFile('./content/result-asyn.txt', `Here is the result from Asyn : ${first} ,${second}`,(err,result)=>{
              if(err){
                  console.log(err);
                  return;
              }else{
                  console.log('done with this task');
              }
            })
        }
    })
  }
});

console.log('starting with next task');