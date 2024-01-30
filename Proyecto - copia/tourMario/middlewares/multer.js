const multer = require('multer');

let uploadImage = (nombre_carpeta) =>{
    const storage = multer.diskStorage({
        destination: `public/images/${nombre_carpeta}`,
        filename: function(req, file, cb){
            console.log("fillll2eeeee", file);
            let originalName = file.originalname;
            const finalName = Date.now()+"-" + originalName;
            cb(null, finalName)
        }
    })
   const upload = multer({ storage: storage}).single("img")
   return upload;
}

module.exports = uploadImage;