<?php

namespace App\Http\Controllers;

use App\Models\Berita;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class BeritaController extends Controller
{
    /**
     * Tampilkan semua berita
     */
    public function index()
    {
        $berita = Berita::latest()->get();
        return Inertia::render('admin/berita/Index', [
            'berita' => $berita,
        ]);
    }

    /**
     * Form tambah berita
     */
    public function create()
    {
        return Inertia::render('admin/berita/Create');
    }

    /**
     * Simpan berita baru
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'excerpt' => 'required|string|max:500',
            'content' => 'required|string',
            'author' => 'required|string|max:100',
            'date' => 'required|date',
            'featured' => 'boolean',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $image = null;
        if ($request->hasFile('image')) {
            $image = $request->file('image')->store('news', 'public');
        }

        Berita::create([
            'title' => $request->title,
            'excerpt' => $request->excerpt,
            'content' => $request->content,
            'author' => $request->author,
            'date' => $request->date,
            'featured' => $request->featured ?? false,
            'image' => $image,
        ]);

        return redirect()->route('berita.index')->with('success', 'Berita berhasil ditambahkan.');
    }

    /**
     * Tampilkan detail berita
     */
    public function show(Berita $berita)
    {
        return Inertia::render('admin/berita/Detail', [
            'berita' => $berita,
        ]);
    }

    /**
     * Form edit berita
     */
    public function edit(Berita $berita)
    {
        return Inertia::render('admin/berita/Edit', [
            'berita' => $berita,
        ]);
    }

    /**
     * Update berita
     */
    public function update(Request $request, Berita $berita)
    {
        // Log untuk debugging
        Log::info('Update request received', [
            'berita_id' => $berita->id,
            'request_data' => $request->all(),
            'has_image' => $request->hasFile('image')
        ]);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'excerpt' => 'required|string|max:500',
            'content' => 'required|string',
            'author' => 'required|string|max:100',
            'date' => 'required|date',
            'featured' => 'sometimes|boolean',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        // Ambil image lama
        $image = $berita->image;

        // Jika ada image baru yang diupload
        if ($request->hasFile('image')) {
            // Hapus image lama jika ada
            if ($image && Storage::disk('public')->exists($image)) {
                Storage::disk('public')->delete($image);
                Log::info('Old image deleted', ['image' => $image]);
            }
            // Simpan image baru
            $image = $request->file('image')->store('news', 'public');
            Log::info('New image uploaded', ['image' => $image]);
        }

        // Handle featured field - pastikan boolean
        $featured = $request->has('featured') ? (bool) $request->input('featured') : false;

        try {
            // Update berita
            $berita->update([
                'title' => $validated['title'],
                'excerpt' => $validated['excerpt'],
                'content' => $validated['content'],
                'author' => $validated['author'],
                'date' => $validated['date'],
                'featured' => $featured,
                'image' => $image,
            ]);

            Log::info('Berita updated successfully', ['berita_id' => $berita->id]);

            return redirect()->route('berita.index')
                ->with('success', 'Berita berhasil diperbarui.');

        } catch (\Exception $e) {
            Log::error('Error updating berita', [
                'berita_id' => $berita->id,
                'error' => $e->getMessage()
            ]);

            return back()
                ->withErrors(['error' => 'Terjadi kesalahan saat memperbarui berita.'])
                ->withInput();
        }
    }

    /**
     * Hapus berita
     */
    public function destroy(Berita $berita)
    {
        if ($berita->image && Storage::disk('public')->exists($berita->image)) {
            Storage::disk('public')->delete($berita->image);
        }

        $berita->delete();

        return redirect()->route('berita.index')->with('success', 'Berita berhasil dihapus.');
    }
}
