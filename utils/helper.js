const fs = require('fs'),
filePath = 'volcanoes.json';

module.exports = {

 getFileData : ()=>{
    const jsonData = fs.readFileSync(filePath);
    return JSON.parse(jsonData);
} ,

 saveAccountData : (data)=>{
    const stringifyData = JSON.stringify(data);
    fs.writeFileSync(filePath, stringifyData);
}

};
