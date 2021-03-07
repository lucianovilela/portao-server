const obj = require("./portao-eletronico-dev-firebase-adminsdk-8y7r9-7fca14750b.json");

const fs = require('fs');
const file = fs.openSync(".env", "w+");

for (i in obj){
    
    fs.writeSync(file, `${i.toUpperCase()}_GOOGLE=${obj[i].replace(/\n/g, "\\n")}\n`);
}
fs.closeSync(file);
