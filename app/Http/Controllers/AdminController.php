<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Mustahik;
use App\Models\Zakat;
use App\Models\LaporanDistribusi;
use App\Models\Program;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function index()
    {
        $mustahik = Mustahik::latest()->get();
        $totalMustahik = Mustahik::count();
        $relawanAktif = Zakat::distinct('user_id')->count('user_id');
        $laporan = LaporanDistribusi::count();
        $totalPenerima = LaporanDistribusi::count();
        $Program = Program::count();

        $persen = 0;
        if ($totalMustahik > 0) {
            $persen = ($laporan / $totalMustahik) * 100;
        }


        $distribution = Mustahik::select('golongan', DB::raw('count(*) as total'))
            ->where('status', 'sudah_dibantu')
            ->groupBy('golongan')
            ->get();

        $monthlyBantuan = LaporanDistribusi::select(
            DB::raw("MONTH(tanggal) as bulan"),
            DB::raw("COUNT(*) as bantuan")
        )
            ->groupBy('bulan')
            ->orderBy('bulan')
            ->get();

        $monthlyMustahik = Mustahik::select(
            DB::raw("MONTH(created_at) as bulan"),
            DB::raw("COUNT(*) as mustahik")
        )
            ->groupBy('bulan')
            ->orderBy('bulan')
            ->get();

        // gabung jadi satu array
        $monthlyData = collect(range(1, 12))->map(function ($bulan) use ($monthlyBantuan, $monthlyMustahik) {
            $bantuan = $monthlyBantuan->firstWhere('bulan', $bulan)->bantuan ?? 0;
            $mustahik = $monthlyMustahik->firstWhere('bulan', $bulan)->mustahik ?? 0;
            return [
                'month' => date('M', mktime(0, 0, 0, $bulan, 1)),
                'bantuan' => $bantuan,
                'mustahik' => $mustahik,
            ];
        });

        // PERBAIKAN: Weekly data untuk bulan ini saja (minggu 1-4)
        $currentMonth = date('m');
        $currentYear = date('Y');

        $weeklyBantuan = LaporanDistribusi::select(
            DB::raw("WEEK(tanggal, 1) - WEEK(DATE_SUB(tanggal, INTERVAL DAYOFMONTH(tanggal)-1 DAY), 1) + 1 as minggu_bulan"),
            DB::raw("COUNT(*) as bantuan")
        )
            ->whereMonth('tanggal', $currentMonth)
            ->whereYear('tanggal', $currentYear)
            ->groupBy('minggu_bulan')
            ->orderBy('minggu_bulan')
            ->get();

        $weeklyMustahik = Mustahik::select(
            DB::raw("WEEK(created_at, 1) - WEEK(DATE_SUB(created_at, INTERVAL DAYOFMONTH(created_at)-1 DAY), 1) + 1 as minggu_bulan"),
            DB::raw("COUNT(*) as mustahik")
        )
            ->whereMonth('created_at', $currentMonth)
            ->whereYear('created_at', $currentYear)
            ->groupBy('minggu_bulan')
            ->orderBy('minggu_bulan')
            ->get();

        // ambil minggu 1-4 untuk bulan ini
        $weeklyData = collect(range(1, 4))->map(function ($minggu) use ($weeklyBantuan, $weeklyMustahik) {
            $bantuan = $weeklyBantuan->firstWhere('minggu_bulan', $minggu)->bantuan ?? 0;
            $mustahik = $weeklyMustahik->firstWhere('minggu_bulan', $minggu)->mustahik ?? 0;
            return [
                'week' => "Minggu " . $minggu,
                'bantuan' => $bantuan,
                'mustahik' => $mustahik,
            ];
        });

        $categoryData = LaporanDistribusi::select(
            'jenis_bantuan',
            DB::raw('COUNT(*) as jumlah')
        )
            ->groupBy('jenis_bantuan')
            ->get();

        return Inertia::render('admin/index', [
            'mustahik' => $mustahik,
            'relawanAktif' => $relawanAktif,
            'laporan' => $laporan,
            'distribution' => $distribution,
            'monthlyData' => $monthlyData,
            'categoryData' => $categoryData,
            'weeklyData' => $weeklyData,
            'totalPenerima' => $totalPenerima,
            'Program' => $Program,
            'persen' => round($persen, 2),
        ]);
    }
}
