const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "crudheroes",
});

app.use(cors());
app.use(express.json());

app.post("/register", (req, res) => {
    const { name } = req.body;
    const { poder } = req.body;

    let SQL = "INSERT INTO heroes ( name, poder ) VALUES ( ?,? )";

    db.query(SQL, [name, poder], (err, result) => {
        console.log(err);
    });
});

app.get("/getCards", (req, res) => {

    let SQL = "SELECT * from heroes";

    db.query(SQL, (err, result) => {
        if (err) console.log(err);
        else res.send(result);
    });
});

app.put("/edit", (req, res) => {
    const { id } = req.body;
    const { name } = req.body;
    const { poder } = req.body;

    let SQL = "UPDATE heroes SET name = ?, poder = ? WHERE idheroes = ?";

    db.query(SQL, [name, poder, id] ,(err, result) => {
        if(err) console.log(err);
        else res.send(result);
    });
});

app.delete("/delete/:id", (req, res) => {
    const { id } = req.params;
    let SQL = "DELETE FROM heroes WHERE idheroes = ?";

    db.query(SQL, [id], (err, result) => {
        if(err) console.log('Deu ruim no delete', err);
        else res.send(result);
    })
})

app.listen(3001, () => {
    console.log("rodando o servidor");
});