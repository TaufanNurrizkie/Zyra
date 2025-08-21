<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Mustahik;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function index()
    {
        $mustahik = Mustahik::latest()->get();

        return Inertia::render('admin/index', [
            'mustahik' => $mustahik,
        ]);
    }
}
