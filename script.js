// Ambil elemen
const nameInput = document.getElementById("name-input");
const pelanggaranInput = document.getElementById("pelanggaran-input");
const poinInput = document.getElementById("poin-input"); // input baru untuk poin
const addBtn = document.getElementById("add-btn");
const listPelanggaran = document.getElementById("pelanggaran-list");

// Ambil data dari localStorage
let pelanggaran = JSON.parse(localStorage.getItem("pelanggaran")) || [];

// Simpan data ke localStorage
function simpanData() {
  localStorage.setItem("pelanggaran", JSON.stringify(pelanggaran));
}

// Render tabel pelanggaran
function renderPelanggaran() {
  listPelanggaran.innerHTML = "";
  pelanggaran.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.pelanggaran}</td>
      <td>${item.poin}</td>
      <td>
        <button class="action-btn edit-btn" data-id="${item.id}">Edit</button>
        <button class="action-btn delete-btn" data-id="${item.id}">Hapus</button>
      </td>
    `;
    listPelanggaran.appendChild(row);
  });
}

renderPelanggaran();

// Hitung total poin per nama
function hitungTotalPoin(nama) {
  return pelanggaran
    .filter((p) => p.name === nama)
    .reduce((total, p) => total + p.poin, 0);
}

// tombol add(tambah)
addBtn.addEventListener("click", function () {
  const namaPelanggar = nameInput.value.trim();
  const jenisPelanggaran = pelanggaranInput.value.trim();
  const poin = parseInt(poinInput.value) || 0;

  if (namaPelanggar !== "" && jenisPelanggaran !== "" && poin > 0) {
    const newPelanggaran = {
      id: Date.now(),
      name: namaPelanggar,
      pelanggaran: jenisPelanggaran,
      poin: poin,
    };

    pelanggaran.push(newPelanggaran);

    Swal.fire({
      icon: "success",
      title: "Berhasil!",
      text: "Data berhasil ditambahkan",
      showConfirmButton: false,
      timer: 2000,
    });

    renderPelanggaran();
    simpanData();

    // Cek total poin
    const totalPoin = hitungTotalPoin(namaPelanggar);
    if (totalPoin >= 1000) {
      Swal.fire({
        icon: "warning",
        title: "Peringatan!",
        text: `${namaPelanggar} sudah mencapai ${totalPoin} poin! Harus dipanggil pembina.`,
      });
    }

    // reset input
    nameInput.value = "";
    pelanggaranInput.value = "";
    poinInput.value = "";
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops!",
      text: "Semua field harus diisi dan poin lebih dari 0",
    });
  }
});

// tombol hapus & edit
listPelanggaran.addEventListener("click", function (event) {
  const target = event.target;

  // logika hapus
  if (target.classList.contains("delete-btn")) {
    const id = target.dataset.id;

    Swal.fire({
      title: "Apakah anda yakin?",
      text: "Data ini akan dihapus secara permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Tidak",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // jika pengguna pilih YA
        pelanggaran = pelanggaran.filter((item) => item.id !== parseInt(id));
        simpanData();
        renderPelanggaran();

        Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: "Data berhasil dihapus",
          timer: 2000,
          showConfirmButton: false,
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // jika pengguna pilih TIDAK
        Swal.fire({
          icon: "info",
          title: "Dibatalkan",
          text: "Data tidak jadi dihapus",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    });
  }

  // logika edit
  if (target.classList.contains("edit-btn")) {
    const id = parseInt(target.getAttribute("data-id"));

    // tampilkan loading
    Swal.fire({
      title: "Memuat...",
      text: "Sedang membuka halaman edit",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    // kasih delay biar loading kelihatan
    setTimeout(() => {
      window.location.href = `edit.html?id=${id}`;
    }, 700);
  }
});
