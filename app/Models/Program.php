<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Program extends Model
{
    protected $table = 'programs';
    protected $fillable = [
        'judul',
        'isi',
        'jenis',
        'daerah',
        'foto',
        'status'
    ];
}
