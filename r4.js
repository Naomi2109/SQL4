let express = require("express");
let app = express();
let cors = require ("cors");
let mysql = require("mysql2");

let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "contraseña",
    database:"angular"
});

connection.connect(function(error){
    if(error)
    console.log(error);
    else console.log("Conexión correcta");
});

app.use(cors());
app.use(express.urlencoded({ extended:false}));
app.use(express.json());


app.get("/Alumnos", function (req, res)
    {
        let sql;
        if (req.query.id == null)
            sql = "SELECT * FROM Alumnos";
        else 
            sql = "SELECT * FROM Alumnos WHERE id=" + req.query.id;
        
        connection.query(sql, function (err, res)
        {
            if (err)
                console.log(err);
            else 
                res.send(result);
        });

    });



app.post("/Alumnos", function(req, res)
    {
        console.log(req.body);
        let sql = "INSERT INTO alumnos (Nombre, Apellidos2)" + 
                  "VALUES ('" + req.body.Nombre + "', '" +
                                req.body.Apellidos2 + "')";
        console.log(sql);
        connection.query(sql, function (err, res)
        {
            if (err)
                console.log(err);
            else 
            {
                console.log(res);
                if (res.insertId)
                    res.send(String(res.insertId));
                else
                    res.send("-1");
            }

        });

    });

