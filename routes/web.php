<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\MustahikController;
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
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/admin', function () {
    return Inertia::render('admin/index');
})->middleware(['auth', 'verified'])->name('admin');

Route::get('/informasi', function () {
    return Inertia::render('user/informasi/index');
})->middleware(['auth', 'verified'])->name('informasi');

Route::get('/kontak', function () {
    return Inertia::render('user/kontak/index');
})->name('user.kontak');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Route Mustahik
Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/mustahik', [MustahikController::class, 'index'])
        ->name('mustahik.index');


    Route::get('/mustahik/create', function () {
        return Inertia::render('admin/mustahik/Create');
    });

    Route::post('/mustahik', [MustahikController::class, 'store'])
        ->name('mustahik.store');
    Route::get('/mustahik/{id}/edit', function ($id) {
        return Inertia::render('admin/mustahik/Edit', [
            'mustahik' => \App\Models\Mustahik::findOrFail($id)
        ]);
    })->name('mustahik.edit');
    // Update
    Route::put('/mustahik/{id}', [MustahikController::class, 'update'])
        ->name('mustahik.update');

    // Delete
    Route::delete('/mustahik/{id}', [MustahikController::class, 'destroy'])
        ->name('mustahik.destroy');

    // Import
    Route::post('/mustahik/import', [MustahikController::class, 'import'])
    ->name('mustahik.import');
});

require __DIR__ . '/auth.php';
