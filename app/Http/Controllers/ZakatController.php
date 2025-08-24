<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Zakat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ZakatController extends Controller
{
    public function index()
    {
        $zakat = Zakat::with('user')->latest()->get();

        return Inertia::render('user/Zakat', [
            'zakat' => $zakat
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'jenis' => 'required|string',
            'total' => 'required|string',
        ]);

        Zakat::create([
            'user_id' => Auth::id(),
            'jenis' => $request->jenis,
            'total' => $request->total,
        ]);

        return redirect()->route('zakat')->with('success', 'Pembayaran zakat berhasil dicatat.');
    }
}
