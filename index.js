const express = require('express');
const app = express();
const PORT = 5000 || process.env.PORT;
const cors = require('cors');
const volcanoRoutes = require('./routes/index');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

app.use('/volcanoes', volcanoRoutes);


app.get('/', (req, res, next)=>{
    res.send('Welcome to the Hilton Software Volcanoes API');
});


app.listen(PORT, ()=>{
    console.log(`App is listening on port ${PORT}`);
});