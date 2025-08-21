<?php

use Inertia\Inertia;
use App\Http\Controllers\GalleryController;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\MustahikController;
use App\Http\Controllers\LaporanDistribusiController;

Route::get('/', function () {
    return Inertia::render('Dashboard', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/admin', [AdminController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('admin');

// Dashboard
Route::get('/dashboard', fn() => Inertia::render('Dashboard'))
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

// User pages
Route::get('/informasi', fn() => Inertia::render('user/informasi/index'))
    ->middleware(['auth', 'verified'])
    ->name('informasi');

Route::get('/kontak', fn() => Inertia::render('user/kontak/index'))
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
    Route::get('/create', fn() => Inertia::render('admin/mustahik/Create'))->name('create');
    Route::post('/', [MustahikController::class, 'store'])->name('store');
    Route::get('/{id}/edit', fn($id) => Inertia::render('admin/mustahik/Edit', [
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
    Route::get('/{id}/edit', [LaporanDistribusiController::class, 'edit'])->name('edit');
    Route::put('/{id}', [LaporanDistribusiController::class, 'update'])->name('update');
    Route::delete('/{id}', [LaporanDistribusiController::class, 'destroy'])->name('destroy');
});

// Gallery routes
Route::middleware(['auth'])->group(function () {
    Route::get('/admin/gallery', [GalleryController::class, 'index'])->name('admin.gallery.index');
    Route::post('/admin/gallery', [GalleryController::class, 'store'])->name('admin.gallery.store');
    Route::delete('/admin/gallery/{id}', [GalleryController::class, 'destroy'])->name('admin.gallery.destroy');
});

require __DIR__ . '/auth.php';
