<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LaporanDistribusi extends Model
{
    protected $table = 'laporan_distribusi'; // penting, supaya gak salah lagi
    protected $fillable = [
        'penerima',
        'alamat',
        'jenis_bantuan',
        'dana_keluar',
        'tanggal',
    ];
}
