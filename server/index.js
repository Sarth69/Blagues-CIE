var express = require('express'); //import de la bibliothèque Express
var app = express(); //instanciation d'une application Express

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// setting up cross-origin policy
const cors = require('cors');
app.use(cors({
    origin: 'file:///C:/Users/louis/Blagues-CIE'
}));

app.get('',(req,res)=>{
    res.send('Bonjour ! C moi');
})

app.get('/like',(req,res) => {
    res.send("un like de plus !");
});

app.listen(8080); //commence à accepter les requêtes
console.log("App listening on port 8080...");