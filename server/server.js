const express =  require("express");
const {connectMongo} = require("./config/mongoose.config");
const { petsRouter } = require("./router/pets.router");
const cors = require('cors');
const bodyParser = require("body-parser");

connectMongo();

app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json() );
app.use(bodyParser.urlencoded({
    extended: true
}));


app.use('/pets', petsRouter);

app.listen(3000, ()=> {
    console.log("It's alive in port 3000!");
});
