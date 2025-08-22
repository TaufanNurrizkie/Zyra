<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\LaporanDistribusi;
use App\Models\Zakat;

class LaporanDistribusiController extends Controller
{
    public function index()
    {
        $laporanDistribusi = LaporanDistribusi::latest()->get();

        // hitung total dana masuk dari tabel zakat
        $danaMasuk = Zakat::sum('total');

        // hitung total dana keluar dari tabel laporan_distribusi
        $danaKeluar = LaporanDistribusi::sum('dana_keluar');

        // hitung sisa dana
        $sisaDana = $danaMasuk - $danaKeluar;

        return Inertia::render('admin/laporan/Index', [
            'laporanDistribusi' => $laporanDistribusi,
            'danaMasuk' => $danaMasuk,
            'danaKeluar' => $danaKeluar,
            'sisaDana' => $sisaDana,
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
