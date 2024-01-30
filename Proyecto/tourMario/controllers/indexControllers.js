const bcrypt = require("bcrypt");
const connection = require("../config/db");

class IndexControllers {
  getAllBands = (req, res) => {
    let sql = "SELECT * FROM band WHERE band_isdeleted = 0";
    connection.query(sql, (err, result) => {
      console.log("resultttttt:", result);
      if (err) throw err;
      res.render("index", { result });
    });
  };

  showAbout = (req, res) => {
    res.render("about.ejs");
  };

  showRegisterForm = (req, res) => {
    res.render("formRegisterBand.ejs");
  };

  register = (req, res) => {
    const { band_name, style, description, email, password, phone_number } =
      req.body;

    //metemos las condiciones para el email y el password
    if (
      email == "" ||
      password == "" ||
      email.length < 4 ||
      password.length < 4
    ) {
      res.render("formRegisterBand.ejs", {
        message:
          "You must fill all the fields and more than 4 characters",
      });
    } else {
      //encriptamos la contraseña

      bcrypt.hash(password, 8, function (err, hash) {
        if (err) throw err;
        console.log(hash);
        let sql = `INSERT INTO band (band_name, style, description, email, password, phone_number) values ("${band_name}", "${style}", "${description}", "${email}", "${hash}", "${phone_number}"); `;

        if (req.file != undefined) {
          let img = req.file.filename;
          sql = `INSERT INTO band (band_name, style, description, email, password, phone_number, photo) values ("${band_name}", "${style}", "${description}", "${email}", "${hash}", "${phone_number}", "${img}"); `;
        }

        connection.query(sql, (err, result) => {
          if (err) {
            console.log(err);
            if (err.errno == 1062) {
              console.log("Errno 1062 hecho");
              return res.render("formRegisterBand", {
                message: "This user already exists",
              });
            } else {
              throw err;
            }
          }

          console.log("*****REGISTRO*****", result );

          res.redirect('/');

        });
      });
    }
  };

  showLoginForm = (req, res) => {
    res.render("formLogin");
  };

  login = (req, res) => {
    const { email, password } = req.body;

    //1º ver si el usuario existe
    let sql = `SELECT * FROM band WHERE email = "${email}" AND band_isdeleted = 0`;
    connection.query(sql, (err, result) => {
      if (err) throw err;
      console.log("*********RESULT*********", result);
      if (result.length == 1) {
        //comparar si la password es ok
        let hash = result[0].password;
        bcrypt.compare(password, hash, (errBycript, resultCompare) => {
          if (errBycript) throw errBycript;
          console.log("******COMPARE******", resultCompare);
          if (resultCompare) {
            res.redirect(`/bands/oneBand/${result[0].band_id}`);
          } else {
            res.render("formLogin", {
              message: "Data entered is incorrect",
            });
          }
        });
      } else {
        //email es incorrecto
        res.render("formLogin", { message: "Data entered is incorrect" });
      }
    });
  };


}

module.exports = new IndexControllers();
