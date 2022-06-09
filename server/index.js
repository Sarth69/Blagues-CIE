var express = require('express'); //import de la bibliothèque Express
var app = express(); //instanciation d'une application Express

var sq = require('sqlite3');
sq.verbose();

var db = new sq.Database(__dirname + '/compteurLike.db3');
db.run("CREATE TABLE IF NOT EXISTS blagues (id INT, nb_likes INT)");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// setting up cross-origin policy
const cors = require('cors');
app.use(cors({
    origin: 'null'
}));

app.get('',(req,res)=>{
    res.send('Bonjour ! C moi');
})

app.get('/like',(req,res) => {
    var indice = req.query.id;
    db.each("SELECT COUNT(*) FROM blagues WHERE id=?", [indice],(err, row) => {
        if (err) {
            console.log(err);
        } else {
            // console.log(row);
            if (row['COUNT(*)']){
                db.each("SELECT nb_likes FROM blagues WHERE id=?", [indice],(err2, row2) => {
                    if (err2) {
                        console.log(err2);
                    } else{
                        console.log('adding a like');
                        db.run("UPDATE blagues SET nb_likes = ? WHERE id = ?", [row2['nb_likes']+1, indice]);
                    }
                    
                })
            } else {
                console.log('creating element in table');
                db.run("INSERT INTO blagues VALUES(?,?)", [indice,1]);
            }          
        }
    });
});

app.get('/nb_likes', (req,res) => {
    var indice = req.query.id;
    db.each("SELECT COUNT(*) FROM blagues WHERE id=?", [indice],(err, row) => {
        if (err) {
            console.log(err);
        } else {
            if (row['COUNT(*)']){
                db.each("SELECT nb_likes FROM blagues WHERE id=?", [indice],(err2, row2) => {
                    if (err2) {
                        console.log(err2);
                    } else{
                        res.send(row2['nb_likes']);
                    }
                    
                })
            } else {
                db.run("INSERT INTO blagues VALUES(?,?)", [indice,1]);
                res.send('1');
            }          
        }
    });
});

app.listen(8080); //commence à accepter les requêtes
console.log("App listening on port 8080...");