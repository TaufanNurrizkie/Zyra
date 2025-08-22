<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Zakat;
use Inertia\Inertia;

class ZakatController extends Controller
{
    public function index()
    {
        $zakat = Zakat::with('user')->latest()->get();

        return Inertia::render('user/zakat/Index', [
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
            'user_id' => auth()->id(),
            'jenis' => $request->jenis,
            'total' => $request->total,
        ]);

        return redirect()->route('zakat.index')->with('success', 'Pembayaran zakat berhasil dicatat.');
    }
}
