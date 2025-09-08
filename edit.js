const nameEdit = document.getElementById("name-edit");
const pelanggaranEdit = document.getElementById("pelanggaran-edit");
const editBtn = document.getElementById("edit-btn");

// mengambil URL
const urlParams = new URLSearchParams(window.location.search);
const pelanggaranId = parseInt(urlParams.get("id"));

// menganbil semua pelanggarann dari local storage
let pelanggaran = JSON.parse(localStorage.getItem("pelanggaran")) || [];

// 4. Cari pelanggaran yang mau diedit dan tampilkan di input
const pelanggaranToEdit = pelanggaran.find((item) => item.id === pelanggaranId);
console.log(pelanggaranToEdit);
if (pelanggaranToEdit) {
  nameEdit.value = pelanggaranToEdit.name;
  pelanggaranEdit.value = pelanggaranToEdit.pelanggaran;
} else {
  alert("Pelanggaran tidak ditemukan");
  window.location.href = "index.html";
}

// 5. Tambahkan event listener untuk tombol Simpan
editBtn.addEventListener("click", function () {
  const newName = nameEdit.value.trim();
  const newPelanggaran = pelanggaranEdit.value.trim();

  if (newName !== "") {
    pelanggaranToEdit.name = newName;
    pelanggaranToEdit.pelanggaran = newPelanggaran;

    localStorage.setItem("pelanggaran", JSON.stringify(pelanggaran));

    Swal.fire({
      icon: "success",
      title: "Berhasil!",
      text: "Data berhasil diperbarui",
      showConfirmButton: false,
      timer: 1000,


    }).then(() => {
      window.location.href = "index.html";
    });
  }
});
