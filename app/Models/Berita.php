<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Berita extends Model
{
    use HasFactory;

    // Nama tabel (opsional, kalau sesuai Laravel convention tidak perlu)
    protected $table = 'news';

    // Kolom yang bisa diisi mass assignment
    protected $fillable = [
        'title',
        'excerpt',
        'content',
        'image',
        'author',
        'date',
        'featured',
    ];

    // Konversi otomatis tipe data
    protected $casts = [
        'date' => 'date',
        'featured' => 'boolean',
        'views' => 'integer',
    ];

}
