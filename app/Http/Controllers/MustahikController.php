<?php

namespace App\Http\Controllers;

use App\Models\Mustahik;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Redirect; // ⬅️ penting untuk Inertia redirect
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\MustahikImport;

class MustahikController extends Controller
{
    /**
     * Tampilkan semua data Mustahik
     */
    public function index(): Response
    {
        $mustahik = Mustahik::latest()->get();

        return Inertia::render('admin/mustahik/Index', [
            'mustahik' => $mustahik,
        ]);
    }

    /**
     * Import data dari Excel
     */
    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:xlsx,csv,xls',
        ]);

        Excel::import(new MustahikImport, $request->file('file'));

        // ✅ pakai Inertia Redirect, bukan redirect() biasa
        return Redirect::route('mustahik.index')
            ->with('success', 'Data berhasil diimport!');
    }

    public function store(Request $request)
    {
        Mustahik::create($request->all());
        return redirect()->route('mustahik.index')
            ->with('success', 'Mustahik berhasil ditambahkan!');
    }

    public function update(Request $request, $id)
    {
        $mustahik = Mustahik::findOrFail($id);
        $mustahik->update($request->all());
        return redirect()->route('mustahik.index')
            ->with('success', 'Mustahik berhasil diupdate!');
    }

    public function destroy($id)
    {
        Mustahik::destroy($id);
        return redirect()->back()->with('success', 'Data berhasil dihapus!');
    }
}
