<?php

namespace App\Imports;

use App\Models\Mustahik;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class MustahikImport implements ToModel, WithHeadingRow
{
    public function model(array $row)
    {
        return new Mustahik([
            'nama'      => $row['nama'],
            'alamat'    => $row['alamat'],
            'golongan'     => $row['golongan'],
            'kontak'    => $row['kontak'],
            'latitude'  => $row['latitude'],
            'longitude' => $row['longitude'],
            'rangeGaji' => $row['rangegaji'],
            'status'    => $row['status'] ?? 'belum_dibantu',

        ]);
    }
}
