<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Mustahik extends Model
{
    protected $table = 'mustahik'; // kasih tahu nama tabel yang sebenarnya

    protected $fillable = [
        'nama', 'alamat', 'golongan', 'kontak',
        'latitude', 'longitude', 'rangeGaji', 'status'
    ];
}
