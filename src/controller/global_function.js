const hapusGambar = (fs, pathNew) => {
    let path = pathNew
    fs.unlink(path,(err) => {
     if (err) {
         console.log(err)
         }else{
         console.log("Berhasil Hapus")
         }
         })
}

module.exports = {
    hapusGambar
}