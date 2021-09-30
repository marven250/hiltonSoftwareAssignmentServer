const router = require('express').Router(),
encoding = 'utf8',
filePath = 'volcanoes.json',
helper = require('../utils/helper');


router.get('/', (req, res, next)=>{
    const volcanoDatabase = helper.getFileData();
    if(volcanoDatabase){
        res.status(200).send(volcanoDatabase);
    }else{
        res.status(500).send('Database is not initialized with data');
    };
});

router.get('/:name', (req, res, next)=>{
    const volcanoDatabase = helper.getFileData();
    let userInput = req.params.name || null;
    let volcanoList = [];
    if(volcanoDatabase){
        if(userInput){
        volcanoDatabase.forEach(volcanoData=>{
            if(volcanoData && volcanoData.name && volcanoData.name == userInput){
                volcanoList.push(volcanoData);
            };
        });
        res.status(200).send(volcanoList);
    }else{
        res.status(400).send('No userInput through params');
    };
    }else{
        res.status(500).send('Database is not initialized with data');
    };
    
});

router.post('/', (req, res, next)=>{
    var volcanoDatabase = helper.getFileData();
    let userInput = req.body || null;
   
    if(volcanoDatabase && userInput){
        if(userInput){
        volcanoDatabase.push(userInput);
        helper.saveAccountData(volcanoDatabase);
         res.status(200).send(`Data has been successfully saved to the JSON file! ${JSON.stringify(userInput)}`);
        }else{
            res.status(400).send('No userInput through params');
        };
    }else{
        res.status(500).send('Database is not initialized with data or userInput is invalid');
    };
});

router.put('/:name', (req, res, next)=>{
        var volcanoDatabase = helper.getFileData();
        const volcanoName = req.params.name || null;

        if(volcanoDatabase && volcanoName){
            volcanoDatabase.forEach((volcano, idx)=>{
                if(volcano.name == volcanoName){
                    volcanoDatabase[idx] = req.body;
                };
            });
            helper.saveAccountData(volcanoDatabase);
            res.status(200).send(`Volcano ${volcanoName} has been updated!`);
        }else{
            res.status(500).send('Database is not initialized with data or userInput is invalid');
        };
        
});

router.delete('/:name', (req, res, next)=>{
    const volcanoDatabase = helper.getFileData();
    let userInput = req.params.name || null;
    let volcanoList = [];
    if(volcanoDatabase){
        if(userInput){
        volcanoDatabase.forEach((volcanoData, idx)=>{
            if(volcanoData && volcanoData.name && volcanoData.name == userInput){
                volcanoList.push(volcanoData);
                volcanoDatabase.splice(idx, 1);
            };
        });
        helper.saveAccountData(volcanoDatabase);
        res.status(200).send("Successfully removed data from the DB");
    }else{
        res.status(400).send('Bad userInput through params');
    };
    }else{
        res.status(500).send('Database is not initialized with data');
    };
});


module.exports = router;