<?php

use App\Models\User;
use Inertia\Inertia;

use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ChatController;
use Illuminate\Support\Facades\Broadcast;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\InquiriesController;
use App\Http\Controllers\Auth\RegisteredUserController;

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

Route::middleware('auth', )->group(function () {



    Route::get('/messengers', [ChatController::class, 'index'])->name('messages');
    Route::post('/sendMessage', [ChatController::class, 'store'])->name('/sendMessage');


    // Route::post('send-message', [ChatController::class, 'sendMessage']);
    Route::get('getUser', [RegisteredUserController::class, 'users'])->name('getUser');

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

    Route::get('request', function () {
        return Inertia::render('Admin/Request');
    })->name('request');

    Route::get('messages', function () {
        return Inertia::render('Admin/Messages');
    })->name('messages');

    Route::post('createUser', [RegisteredUserController::class, 'createUser'])->name('createUser');
    Route::delete('deleteUser/{id}', [RegisteredUserController::class, 'deleteUser'])->name('deleteUser');


    Route::get('messages', function () {
        return Inertia::render('Admin/Messages');
    })->name('messages');

    Route::post('createUser', [RegisteredUserController::class, 'createUser'])->name('createUser');
    Route::delete('deleteUser/{id}', [RegisteredUserController::class, 'deleteUser'])->name('deleteUser');
    Route::get('/inquireLists', [InquiriesController::class, 'index'])->name('inquireLists');


});



Route::middleware(['auth', 'role:receptionist'])->group(function () {
    Route::get('receptionist/dashboard', function () {
        return Inertia::render('RECEPTIONIST/Dashboard');
    })->name('receptionist.dashboard');


    Route::get('receptionist/messages', function () {
        return Inertia::render('RECEPTIONIST/Messages');
    })->name('receptionist.messages');

    Route::get('receptionist/request', function () {
        return Inertia::render('RECEPTIONIST/Request');
    })->name('receptionist.request');


    Route::post('inquire', [InquiriesController::class, 'store'])->name('inquire');
    Route::get('/inquireList', [InquiriesController::class, 'index'])->name('inquireList');

});


// Route::middleware(['auth', 'role:lydo_admin'])->get('/lydo/dashboard', function () {
//     return Inertia::render('LYDO/Dashboard');
// })->name('lydo.dashboard');


Route::middleware(['auth', 'role:lydo_aics_admin'])->group(function () {

    Route::get('lydo/dashboard', function () {
        return Inertia::render('LYDO/Dashboard');
    })->name('lydo.dashboard');

    Route::get('lydo/request', function () {
        return Inertia::render('LYDO/Request');
    })->name('lydo.request');



    // Route::get('/oscaList', [InquiriesController::class, 'selectOsca'])->name('oscaList');

});

Route::middleware(['auth', 'role:aics_admin'])->get('/aics/dashboard', function () {
    return Inertia::render('AICS/Dashboard');
})->name('aics.dashboard');


Route::middleware(['auth', 'role:osca_admin'])->group(function () {
    Route::get('osca/dashboard', function () {
        return Inertia::render('OSCA/Dashboard');
    })->name('osca.dashboard');

    Route::get('osca/request', function () {
        return Inertia::render('OSCA/Request');
    })->name('osca.request');

    Route::get('osca/messages', function () {
        return Inertia::render('OSCA/Messages');
    })->name('osca.messages');

    Route::get('/oscaList', [InquiriesController::class, 'selectOsca'])->name('oscaList');

});

Route::middleware(['auth', 'role:pdao_admin'])->get('/pdao/dashboard', function () {
    return Inertia::render('PDAO/Dashboard');
})->name('pdao.dashboard');




Route::middleware(['auth', 'role:lydo_admin'])->group(function () {

    Route::get('lydo/dashboard', function () {
        return Inertia::render('LYDO/Dashboard');
    })->name('lydo.dashboard');

    Route::get('lydo/request', function () {
        return Inertia::render('LYDO/Request');
    })->name('lydo.request');



    // Route::get('/oscaList', [InquiriesController::class, 'selectOsca'])->name('oscaList');

});



require __DIR__ . '/auth.php';