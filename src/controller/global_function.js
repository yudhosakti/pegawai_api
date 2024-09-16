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
function formatTanggal(tanggal) {
    // Lakukan pemformatan tanggal di sini, contoh:
    const date = new Date(tanggal);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

module.exports = {
    hapusGambar,
    formatTanggal
}