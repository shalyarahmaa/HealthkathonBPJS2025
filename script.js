// script.js
document.addEventListener('DOMContentLoaded', function() {
    // 1. Definisikan Fungsi untuk Menarik Data Simulasi (Mock-up API Call)
    function fetchRisKesData() {
        // Menggunakan Fetch API untuk membaca file JSON lokal
        fetch('data_riskes.json')
            .then(response => {
                // Pastikan file ditemukan
                if (!response.ok) {
                    throw new Error('Gagal memuat data simulasi. Status: ' + response.status);
                }
                // Ubah data menjadi format JSON
                return response.json();
            })
            .then(data => {
                // 2. Terapkan Logika Pemrosesan (Inovasi RISKES JKN!)
                // Data diterima, panggil fungsi untuk menampilkan dan memprosesnya
                renderSummary(data);
            })
            .catch(error => {
                console.error('Error saat memproses data:', error);
                document.getElementById('content-summary').innerHTML = '<p class="error">Gagal menampilkan ringkasan data. Pastikan file data_riskes.json ada dan formatnya benar.</p>';
            });
    }

    // 3. Fungsi untuk Menampilkan Data ke HTML
    function renderSummary(data) {
        // --- Bagian Data Peserta ---
        document.getElementById('nama-peserta').textContent = data.nama_peserta;
        document.getElementById('nik-peserta').textContent = data.nik;
        document.getElementById('tanggal-update').textContent = `Data diupdate: ${data.status_update}`;

        // --- Bagian Diagnosa Kronis ---
        const diagnosaContainer = document.getElementById('diagnosa-list');
        diagnosaContainer.innerHTML = '';
        if (data.diagnosa_kronis && data.diagnosa_kronis.length > 0) {
            data.diagnosa_kronis.forEach(item => {
                diagnosaContainer.innerHTML += `
                    <div class="riwayat-entry">
                        <strong>${item.diagnosa}</strong>
                        <p class="tanggal">Sejak: ${item.tanggal_awal} (${item.faskes})</p>
                    </div>
                `;
            });
        } else {
            diagnosaContainer.innerHTML = '<p style="color: green; font-style: italic;">Tidak ada riwayat penyakit kronis yang tercatat.</p>';
        }

        // --- Bagian Obat Rutin (Memperbarui logika untuk objek obat) ---
        const obatContainer = document.getElementById('obat-list');
        obatContainer.innerHTML = '';
        if (data.riwayat_obat_rutin && data.riwayat_obat_rutin.length > 0) {
            data.riwayat_obat_rutin.forEach(obat => {
                // Logika menampilkan Nama Obat dan Detail Dosis/Frekuensi
                obatContainer.innerHTML += `
                    <div class="obat-entry">
                        <strong>${obat.nama}</strong>
                        <p style="font-size: 10px; margin: 0; color: #f0f0f0;">${obat.detail}</p>
                    </div>
                `;
            });
        } else {
            obatContainer.innerHTML = '<p style="font-style: italic; color: #555;">Tidak ada riwayat obat rutin/kronis yang tercatat.</p>';
        }

        // --- Bagian Rawat Inap ---
        const inapContainer = document.getElementById('inap-list');
        inapContainer.innerHTML = '';
        if (data.riwayat_rawat_inap && data.riwayat_rawat_inap.length > 0) {
            data.riwayat_rawat_inap.forEach(item => {
                inapContainer.innerHTML += `
                    <div class="riwayat-entry">
                        <strong>${item.rumah_sakit}</strong>
                        <p class="tanggal">Tanggal: ${item.tanggal} (${item.diagnosa})</p>
                    </div>
                `;
            });
        } else {
            inapContainer.innerHTML = '<p style="font-style: italic; color: #555;">Tidak ada riwayat rawat inap yang signifikan.</p>';
        }
    }

    // Panggil fungsi saat halaman dimuat
    fetchRisKesData();
});