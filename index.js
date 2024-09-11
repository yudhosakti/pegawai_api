const express  = require('express')
const  cors = require('cors')
const multer = require('multer')
const path = require('path')
const middleware = require('./src/middleware/log')
const adminRoutes = require('./src/routes/admin')
const pegawaiRoutes = require('./src/routes/pegawai')
const sifatRoutes = require('./src/routes/sifat')
const sertifikatRoutes = require('./src/routes/sertifikat')

const fileStorage = multer.diskStorage({
    destination: (req,res,cb) => {
        cb(null,'images/');
    },
    filename: (req,res,cb) => {
       cb(null,new Date().getTime() + '-' + res.originalname)
    }
})
const app = express();
const fileFilter = (req,res,cb) => {
    if (res.mimetype == 'image/png' || res.mimetype == 'image/jpg' || res.mimetype == 'image/jpeg') {
        cb(null,true)
    }else{
        cb(null,false)
    }
}


let port  = 4000;

app.use(middleware.logRequest);
app.use('/images',express.static(path.join(__dirname,'images')))
app.use(multer({storage: fileStorage,fileFilter:fileFilter}).single('image'))
app.use(express.json())



app.use('/admin',adminRoutes)

app.use('/pegawai',pegawaiRoutes)

app.use('/trait',sifatRoutes)

app.use('/certificate',sertifikatRoutes)

app.listen(port, () => {
    console.log(`Server started on port`,port);
});
