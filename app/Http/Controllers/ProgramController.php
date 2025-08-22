<?php

namespace App\Http\Controllers;

use App\Models\Program;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class ProgramController extends Controller
{
    /**
     * Tampilkan semua program
     */
    public function index()
    {
        $programs = Program::latest()->get();

        return Inertia::render('admin/programs/Index', [
            'programs' => $programs,
        ]);
    }

    /**
     * Form tambah program
     */
    public function create()
    {
        return Inertia::render('admin/programs/Create');
    }

    /**
     * Simpan program baru
     */
    public function store(Request $request)
    {
        $request->validate([
            'judul' => 'required|string|max:255',
            'isi' => 'required|string',
            'jenis' => 'required|string|max:100',
            'daerah' => 'required|string|max:100',
            'status' => 'required|string|in:segera,berjalan,selesai',
            'foto' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $foto = null;
        if ($request->hasFile('foto')) {
            $foto = $request->file('foto')->store('programs', 'public');
        }

        Program::create([
            'judul' => $request->judul,
            'isi' => $request->isi,
            'jenis' => $request->jenis,
            'daerah' => $request->daerah,
            'status' => $request->status,
            'foto' => $foto,
        ]);

        return redirect()->route('programs.index')->with('success', 'Program berhasil ditambahkan.');
    }

    /**
     * Tampilkan detail program
     */
    public function show(Program $program)
    {
        return Inertia::render('admin/programs/Show', [
            'program' => $program,
        ]);
    }

    /**
     * Form edit program
     */
    public function edit(Program $program)
    {
        return Inertia::render('admin/programs/Edit', [
            'program' => $program,
        ]);
    }

    /**
     * Update program
     */
    public function update(Request $request, Program $program)
    {
        $request->validate([
            'judul' => 'required|string|max:255',
            'isi' => 'required|string',
            'jenis' => 'required|string|max:100',
            'daerah' => 'required|string|max:100',
            'status' => 'required|string|in:segera,berjalan,selesai',
            'foto' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $foto = $program->foto;
        if ($request->hasFile('foto')) {
            if ($foto) {
                Storage::disk('public')->delete($foto);
            }
            $foto = $request->file('foto')->store('programs', 'public');
        }

        $program->update([
            'judul' => $request->judul,
            'isi' => $request->isi,
            'jenis' => $request->jenis,
            'daerah' => $request->daerah,
            'status' => $request->status,
            'foto' => $foto,
        ]);

        return redirect()->route('programs.index')->with('success', 'Program berhasil diperbarui.');
    }

    /**
     * Hapus program
     */
    public function destroy(Program $program)
    {
        if ($program->foto) {
            Storage::disk('public')->delete($program->foto);
        }

        $program->delete();

        return redirect()->route('programs.index')->with('success', 'Program berhasil dihapus.');
    }
}
