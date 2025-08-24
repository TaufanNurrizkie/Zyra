<?php

namespace App\Http\Controllers;

use App\Models\Gallery;
use App\Models\LaporanDistribusi;
use App\Models\Mustahik;
use App\Models\Program;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LandingPage extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard', [
            'mustahik' => Mustahik::count(),
            // 'donatur' => Donatur::count(),
            'program' => Program::count(),
            'dana' => LaporanDistribusi::sum('dana_keluar'),
            'gallery' => Gallery::latest()->take(8)->get(),
        ]);
    }
}
