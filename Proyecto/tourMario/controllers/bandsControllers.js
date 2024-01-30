//const bcrypt = require("bcrypt");
const connection = require("../config/db");


class BandsControllers{

  showOneBand = (req, res) => {

    const {id} = req.params;
    console.log("SHOWONEBAND", req.params);

    let sqlBand = `SELECT * FROM band WHERE band_id = ${id} AND band_isdeleted = 0`;
    let sqlConcert = `SELECT * FROM concert WHERE band_id = ${id} AND concert_isdeleted = 0`;

    connection.query(sqlBand, (err, resultBand) => {
      if (err) throw err;
      console.log("********resultBand****", resultBand);


      connection.query(sqlConcert, (errConcerts, resultConcerts)=>{
        if(errConcerts) throw errConcerts;

        console.log("********resultConcerts****", resultConcerts);

        res.render("oneBand", { band: resultBand[0], concerts: resultConcerts });


      });

    });
    
  };


  showEditBand = (req, res) => {
    
    const {id} = req.params;
    let sql  = `SELECT * FROM band WHERE band_id = ${id} AND band_isdeleted = 0`;
    connection.query(sql, (err, result)=>{

      if(err) throw err;
      res.render('editBand', {band: result[0]});
    });
  };


  editBand = (req, res) =>{


    const{id} = req.params;
    const { band_name, style, description, phone_number } =
    req.body;

    let sql = `UPDATE band SET band_name = "${band_name}", style = "${style}", description = "${description}", phone_number = "${phone_number}" 
    WHERE band_id = ${id}`;

    if(req.file != undefined){
      let img = req.file.filename;
      sql = `UPDATE band SET band_name = "${band_name}", style = "${style}", description = "${description}", phone_number = "${phone_number}", photo = "${img}" 
      WHERE band_id = ${id}`;
    }

    connection.query(sql, (err, result)=>{

      if(err) throw err;
      res.redirect(`/bands/oneBand/${id}`)

    })


  };


  delBand = (req, res) =>{

    const {id} = req.params;
    let sql = `DELETE FROM band WHERE band_id = ${id}`
    connection.query(sql, (err, result)=>{
      if(err) throw err;
      res.redirect("/");
    });
  };

  delLogicBand = (req,res) =>{


    const {id} = req.params;

    let sql = `UPDATE band LEFT JOIN concert ON 
        band.band_id = concert.band_id
        SET
        band.band_isdeleted = 1, concert.concert_isdeleted = 1
        WHERE 
        band.band_id = ${id}
        `

        connection.query(sql, (err, result)=>{

          if(err) throw err;
          res.redirect("/");


        });




  };






}

module.exports = new BandsControllers();
