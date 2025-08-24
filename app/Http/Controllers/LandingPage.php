<?php

namespace App\Http\Controllers;

use App\Models\Gallery;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LandingPage extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard', [
            // 'about' => About::first(), // misalnya cuma 1
            // 'programs' => Program::all(),
            // 'news' => News::latest()->take(5)->get(),
            'gallery' => Gallery::latest()->take(8)->get(),
            // 'information' => Information::all(),
        ]);
    }
}
