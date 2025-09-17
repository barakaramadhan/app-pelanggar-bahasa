const nameEdit = document.getElementById("name-edit");
const pelanggaranEdit = document.getElementById("pelanggaran-edit");
const poinEdit = document.getElementById("poin-edit"); // ambil input poin
const editBtn = document.getElementById("edit-btn");

// mengambil URL
const urlParams = new URLSearchParams(window.location.search);
const pelanggaranId = parseInt(urlParams.get("id"));

// mengambil semua pelanggaran dari local storage
let pelanggaran = JSON.parse(localStorage.getItem("pelanggaran")) || [];

// Cari pelanggaran yang mau diedit dan tampilkan di input
const pelanggaranToEdit = pelanggaran.find((item) => item.id === pelanggaranId);
console.log(pelanggaranToEdit);

if (pelanggaranToEdit) {
  nameEdit.value = pelanggaranToEdit.name;
  pelanggaranEdit.value = pelanggaranToEdit.pelanggaran;
  poinEdit.value = pelanggaranToEdit.poin || ""; // tampilkan poin kalau ada
} else {
  alert("Pelanggaran tidak ditemukan");
  window.location.href = "index.html";
}

// Tambahkan event listener untuk tombol Simpan
editBtn.addEventListener("click", function () {
  const newName = nameEdit.value.trim();
  const newPelanggaran = pelanggaranEdit.value.trim();
  let newPoin = parseInt(poinEdit.value.trim());

  // Jika kosong, kasih default 0
  if (isNaN(newPoin)) {
    newPoin = 0;
  }

  // Validasi biar poin minimal 0
  if (newPoin < 0) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Poin tidak boleh negatif!",
    });
    return;
  }

  if (newName !== "") {
    pelanggaranToEdit.name = newName;
    pelanggaranToEdit.pelanggaran = newPelanggaran;
    pelanggaranToEdit.poin = newPoin; // update poin juga

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
