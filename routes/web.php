<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth',)->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('Admin/Dashboard');
    })->name('dashboard');

    Route::get('manage-user', function () {
        return Inertia::render('Admin/ManageUser');
    })->name('manage-user');

    // Route::get('settings', function () {
    //     return Inertia::render('Admin/Settings');
    // })->name('settings');
});


Route::middleware(['auth', 'role:lydo_admin'])->get('/lydo/dashboard', function () {
    return Inertia::render('LYDO/Dashboard');
})->name('lydo.dashboard');

Route::middleware(['auth', 'role:aics_admin'])->get('/aics/dashboard', function () {
    return Inertia::render('AICS/Dashboard');
})->name('aics.dashboard');

Route::middleware(['auth', 'role:osca_admin'])->get('/osca/dashboard', function () {
    return Inertia::render('OSCA/Dashboard');
})->name('osca.dashboard');

Route::middleware(['auth', 'role:pdao_admin'])->get('/pdao/dashboard', function () {
    return Inertia::render('PDAO/Dashboard');
})->name('pdao.dashboard');

Route::middleware(['auth', 'role:lydo_aics_admin'])->get('/lydo/dashboard', function () {
    return Inertia::render('LYDO/Dashboard');
})->name('lydo.dashboard');

Route::middleware(['auth', 'role:receptionist'])->get('/receptionist/dashboard', function () {
    return Inertia::render('RECEPTIONIST/Dashboard');
})->name('receptionist.dashboard');


require __DIR__.'/auth.php';
