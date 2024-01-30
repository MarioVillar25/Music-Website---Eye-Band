const mysql2 = require('mysql2')

const connection = mysql2.createConnection({
    host : 'localhost',
    user: 'root',
    password: '1234',
    database: 'tour'
}
);

connection.connect(function(err){
    if(err){
        console.error('error conectando' + err.stack);
        return;
    }
    console.log("Conectado a la bd");
})

module.exports = connection;