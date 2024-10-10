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

  
function getDateTimeNow(tanggal) {
const timeNow = new Date(tanggal);
  
  const year = timeNow.getFullYear();
  const month = String(timeNow.getMonth() + 1).padStart(2, '0'); 
  const day = String(timeNow.getDate()).padStart(2, '0'); 
  const hours = String(timeNow.getHours()).padStart(2, '0');
  const minutes = String(timeNow.getMinutes()).padStart(2, '0');
  const seconds = String(timeNow.getSeconds()).padStart(2, '0');
  const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return formattedDateTime;
  }

module.exports = {
    hapusGambar,
    formatTanggal,
    getDateTimeNow
}