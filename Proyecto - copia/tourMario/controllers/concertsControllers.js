const connection = require("../config/db");
class ConcertControllers {
  showCreateConcert = (req, res) => {
    const { band_id } = req.params;
    res.render("createConcert", { band_id });
  };

  createConcert = (req, res) => {
    const { band_id } = req.params;
    const { city, address, date, schedule } = req.body;

    let sql = `INSERT INTO concert (city, address, date, schedule, band_id) VALUES ("${city}", "${address}", "${date}", "${schedule}", "${band_id}")`;

    if (req.file != undefined) {
      let img = req.file.filename;
      sql = `INSERT INTO concert (city, address, date, schedule, band_id, image) VALUES ("${city}", "${address}", "${date}", "${schedule}", "${band_id}" , "${img}" )`;
    }

    connection.query(sql, (err, result) => {
      if (err) throw err;

      console.log("****RESULT****", result);

      res.redirect(`/bands/oneBand/${band_id}`);
    });
  };

  showOneConcert = (req, res) => {
    const { id } = req.params;
    let sql = `SELECT * FROM concert WHERE concert_id = ${id} AND concert_isdeleted = 0`;

    connection.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.render("oneConcert", { result: result[0] });
    });
  };

  showEditConcert = (req, res) => {
    const { id } = req.params;
    let sql = `SELECT * FROM concert WHERE concert_id = ${id} AND concert_isdeleted = 0`;
    connection.query(sql, (err, result) => {
      if (err) throw err;

      console.log("****EDIT CONCERT****", result);

      res.render("editConcert", { result: result[0] });
    });
  };

  editConcert = (req, res) => {
    console.log(req.file);

    const { id } = req.params;
    const { city, address, date, schedule } = req.body;

    let sql = `UPDATE concert SET city = "${city}", address = "${address}", date = "${date}",schedule = "${schedule}" 
    WHERE concert_id = ${id}`;

    if (req.file != undefined) {
      let img = req.file.filename;

      sql = `UPDATE concert SET city = "${city}", address = "${address}", date = "${date}",schedule = "${schedule}", image = "${img}"
      WHERE concert_id = ${id}`;
    }

    connection.query(sql, (err, result) => {
      if (err) throw err;

      res.redirect(`/concerts/showOneConcert/${id}`);
    });
  };

  delConcert = (req, res) => {

    const {concert_id, band_id} = req.params;
    let sql = `DELETE FROM concert WHERE concert_id = ${concert_id}`
    connection.query(sql, (err, result)=>{
      if(err) throw err;

      res.redirect(`/bands/oneBand/${band_id}`)
    });


  }

  delLogicConcert = (req, res) => {

    const {concert_id, band_id} = req.params;

    let sql = `UPDATE concert SET concert_isdeleted = 1 WHERE concert_id = ${concert_id}`
    connection.query(sql, (err, result)=>{
      if(err) throw err;

      res.redirect(`/bands/oneBand/${band_id}`)
    });


  }



 







}

module.exports = new ConcertControllers();
