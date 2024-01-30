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





}

module.exports = new BandsControllers();
