<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\LaporanDistribusi;

class LaporanDistribusiController extends Controller
{
    public function index()
    {
        $laporan = LaporanDistribusi::latest()->get();

        return inertia('admin/laporan/Index', [
            'laporan' => $laporan
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/laporan/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'penerima' => 'required|string|max:255',
            'alamat' => 'required|string|max:255',
            'jenis_bantuan' => 'required|string|max:255',
            'dana_keluar' => 'required|string|max:255',
            'tanggal' => 'required|string|max:255',
        ]);

        laporandistribusi::create($request->all());

        return redirect()->route('zakat.index')->with('success', 'Data berhasil disimpan');
    }
}
