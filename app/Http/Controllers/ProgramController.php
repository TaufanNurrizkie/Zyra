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
        return Inertia::render('admin/programs/Detail', [
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
        // Hapus dd() untuk debugging - ini yang menyebabkan proses terhenti
        // dd($request->all());

        $validated = $request->validate([
            'judul' => 'required|string|max:255',
            'isi' => 'required|string',
            'jenis' => 'required|string|max:100',
            'daerah' => 'required|string|max:100',
            'status' => 'required|string|in:segera,berjalan,selesai',
            'foto' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        // Ambil foto lama
        $foto = $program->foto;

        // Jika ada foto baru yang diupload
        if ($request->hasFile('foto')) {
            // Hapus foto lama jika ada
            if ($foto && Storage::disk('public')->exists($foto)) {
                Storage::disk('public')->delete($foto);
            }
            // Simpan foto baru
            $foto = $request->file('foto')->store('programs', 'public');
        }

        // Update program
        $program->update([
            'judul' => $validated['judul'],
            'isi' => $validated['isi'],
            'jenis' => $validated['jenis'],
            'daerah' => $validated['daerah'],
            'status' => $validated['status'],
            'foto' => $foto,
        ]);

        return redirect()->route('programs.index')->with('success', 'Program berhasil diperbarui.');
    }

    /**
     * Hapus program
     */
    public function destroy(Program $program)
    {
        if ($program->foto && Storage::disk('public')->exists($program->foto)) {
            Storage::disk('public')->delete($program->foto);
        }

        $program->delete();

        return redirect()->route('programs.index')->with('success', 'Program berhasil dihapus.');
    }
}
