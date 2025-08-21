<?php

// app/Http/Controllers/GalleryController.php
namespace App\Http\Controllers;

use App\Models\Gallery;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GalleryController extends Controller
{
    public function index()
    {
        $galleries = Gallery::latest()->get();
        return Inertia::render('admin/gallery/Index', [
            'galleries' => $galleries,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'foto' => 'required|image|max:2048',
            'title' => 'nullable|string|max:255',
        ]);

        $path = $request->file('foto')->store('gallery', 'public');

        Gallery::create([
            'title' => $request->title,
            'foto' => $path,
        ]);

        return redirect()->back();
    }

    public function destroy($id)
    {
        $gallery = Gallery::findOrFail($id);
        $gallery->delete();
        return redirect()->back();
    }
}

