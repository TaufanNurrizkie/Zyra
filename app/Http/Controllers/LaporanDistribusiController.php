<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\LaporanDistribusi;

class LaporanDistribusiController extends Controller
{
    public function index()
    {
        $laporanDistribusi = LaporanDistribusi::latest()->get();

        return inertia('admin/laporan/Index', [
            'laporanDistribusi' => $laporanDistribusi
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

        LaporanDistribusi::create($request->all());

        return redirect()->route('laporan.index')->with('success', 'Data berhasil disimpan');
    }
    public function edit($id)
    {
        $laporan = LaporanDistribusi::findOrFail($id);

        return Inertia::render('admin/laporan/Edit', [
            'laporan' => $laporan
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'penerima' => 'required|string|max:255',
            'alamat' => 'required|string|max:255',
            'jenis_bantuan' => 'required|string|max:255',
            'dana_keluar' => 'required|string|max:255',
            'tanggal' => 'required|string|max:255',
        ]);

        $laporan = LaporanDistribusi::findOrFail($id);
        $laporan->update($request->all());

        return redirect()->route('laporan.index')->with('success', 'Data berhasil diperbarui');
    }

    public function destroy($id)
    {
        $laporan = LaporanDistribusi::findOrFail($id);
        $laporan->delete();

        return redirect()->route('laporan.index')->with('success', 'Data berhasil dihapus');
    }
}
