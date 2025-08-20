<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\MustahikController;
use App\Http\Controllers\LaporanDistribusiController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Dashboard', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Dashboard
Route::get('/dashboard', fn () => Inertia::render('Dashboard'))
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

// Admin dashboard
Route::get('/admin', fn () => Inertia::render('admin/index'))
    ->middleware(['auth', 'verified'])
    ->name('admin');

// User pages
Route::get('/informasi', fn () => Inertia::render('user/informasi/index'))
    ->middleware(['auth', 'verified'])
    ->name('informasi');

Route::get('/kontak', fn () => Inertia::render('user/kontak/index'))
    ->name('user.kontak');

// Profile
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Mustahik routes
Route::middleware(['auth', 'verified'])->prefix('mustahik')->name('mustahik.')->group(function () {
    Route::get('/', [MustahikController::class, 'index'])->name('index');
    Route::get('/create', fn () => Inertia::render('admin/mustahik/Create'))->name('create');
    Route::post('/', [MustahikController::class, 'store'])->name('store');
    Route::get('/{id}/edit', fn ($id) => Inertia::render('admin/mustahik/Edit', [
        'mustahik' => \App\Models\Mustahik::findOrFail($id)
    ]))->name('edit');
    Route::put('/{id}', [MustahikController::class, 'update'])->name('update');
    Route::delete('/{id}', [MustahikController::class, 'destroy'])->name('destroy');
    Route::post('/import', [MustahikController::class, 'import'])->name('import');
});

// Laporan distribusi routes
Route::middleware(['auth', 'verified'])->prefix('laporan')->name('laporan.')->group(function () {
    Route::get('/', [LaporanDistribusiController::class, 'index'])->name('index');
    Route::get('/create', [LaporanDistribusiController::class, 'create'])->name('create');
    Route::post('/', [LaporanDistribusiController::class, 'store'])->name('store');
});

require __DIR__ . '/auth.php';
