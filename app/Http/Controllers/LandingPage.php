<?php

namespace App\Http\Controllers;

use App\Models\Berita;
use App\Models\Gallery;
use App\Models\LaporanDistribusi;
use App\Models\Mustahik;
use App\Models\Program;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Inertia\Inertia;

class LandingPage extends Controller
{
    public function index()
    {
        $programs = Program::where('status', 'berjalan')
            ->orderBy('created_at', 'desc')
            ->take(3)
            ->get();

        // Count mustahik (beneficiaries)
        $mustahikCount = Mustahik::count();

        // Count programs
        $programCount = Program::count();

        // Count donors (users with role 'user')
        $donaturCount = User::where('role', 'user')->count();

        // Calculate distributed funds
        $danaTersalurkan = LaporanDistribusi::sum('dana_keluar');

        // Dana tersalurkan hari ini
        $danaHariIni = LaporanDistribusi::whereDate('created_at', Carbon::today())->sum('dana_keluar');

        //  Ambil berita dari database
        $berita = Berita::orderBy('featured', 'desc') // featured dulu
            ->orderBy('date', 'desc')
            ->get()
            ->map(function ($b) {
                return [
                    'id' => $b->id,
                    'title' => $b->title,
                    'excerpt' => $b->excerpt,
                    'image' => $b->image ? asset('storage/' . $b->image) : '/placeholder.svg', // jika pakai storage
                    'author' => $b->author,
                    'date' => $b->date->format('d M Y'),
                    'featured' => $b->featured,
                ];
            });

        return Inertia::render('Dashboard', [
            'mustahik' => $mustahikCount,
            'program' => $programCount,
            'donatur' => $donaturCount,
            'dana' => $danaTersalurkan,
            'danaHariIni' => $danaHariIni, // ← Kirim ke frontend
            'gallery' => Gallery::latest()->take(8)->get(),
            'programData' => $programs->map(function ($p) {
                return [
                    'id' => $p->id,
                    'judul' => $p->judul,
                    'isi' => $p->isi,
                    'jenis' => $p->jenis,
                    'status' => $p->status,
                    'daerah' => $p->daerah,
                    'foto' => $p->foto ? asset('storage/' . $p->foto) : null,
                ];
            }),
            'berita' => $berita,
        ]);
    }
}
