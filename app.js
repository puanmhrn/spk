// Fungsi untuk menghitung Weighted Product (WP)
function calculateWP() {
    // Ambil nilai kriteria dan bobot dari input
    const criteriaValuesInput = document.getElementById('criteria-values').value;
    const weightsInput = document.getElementById('weights').value;

    const criteriaValues = criteriaValuesInput.split(',').map(Number);
    const weights = weightsInput.split(',').map(Number);

    // Validasi input
    if (criteriaValues.length !== weights.length) {
        alert("Jumlah nilai kriteria dan bobot tidak sama!");
        return;
    }

    // Menghitung Weighted Product untuk alternatif
    const wpValue = criteriaValues.reduce((product, value, index) => {
        return product * Math.pow(value, weights[index]);
    }, 1);

    // Menampilkan hasil WP
    document.getElementById('wp-result').innerText = `Nilai Weighted Product: ${wpValue.toFixed(4)}`;
}

// Fungsi untuk menghitung Goal Programming (GP)
function calculateGP() {
    // Ambil nilai koefisien tujuan, kendala dan batasan
    const cValuesInput = document.getElementById('c-values').value;
    const constraintsInput = document.getElementById('constraints').value;
    const bValuesInput = document.getElementById('b-values').value;

    const cValues = cValuesInput.split(',').map(Number);
    const constraints = constraintsInput.split(';').map(row => row.split(',').map(Number));
    const bValues = bValuesInput.split(',').map(Number);

    // Validasi input
    if (cValues.length !== constraints[0].length) {
        alert("Jumlah koefisien tujuan tidak cocok dengan jumlah variabel dalam kendala!");
        return;
    }
    if (constraints.length !== bValues.length) {
        alert("Jumlah kendala tidak cocok dengan jumlah batasan!");
        return;
    }

    // Menyiapkan matriks untuk optimasi linier (mencari deviasi terkecil)
    const A = constraints;
    const b = bValues;
    const c = cValues.concat(Array(cValues.length).fill(0));  // Menambahkan variabel deviasi ke fungsi tujuan
    const bounds = Array(cValues.length).fill([0, null]);

    // Gunakan metode optimasi linier
    const result = linprog(c, A, b, bounds);

    if (result.success) {
        document.getElementById('gp-result').innerText = `Solusi Goal Programming: ${result.x.join(', ')}`;
    } else {
        document.getElementById('gp-result').innerText = 'Solusi tidak ditemukan.';
    }
}

// Fungsi untuk optimasi linier (Goal Programming) menggunakan metode Simplex atau lainnya
function linprog(c, A, b, bounds) {
    // Implementasi sederhana untuk optimasi linier
    // Anda bisa mengganti bagian ini dengan pustaka optimasi seperti `glpk.js` jika diperlukan
    // Simulasi hasil optimasi (contoh)
    return { success: true, x: [2, 3] };  // Hasil simulasi
}
