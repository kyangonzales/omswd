<?php

use App\Models\User;
use Inertia\Inertia;

use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\AicsController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\LydoController;
use App\Http\Controllers\OscaController;
use App\Http\Controllers\PdaoController;
use Illuminate\Support\Facades\Broadcast;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\InquiriesController;
use App\Http\Controllers\ReceptionistController;
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

// Route::middleware(['auth', 'role:admin,receptionist'])->group(function () {

//     Route::post('/updateInquire/{inquiry}', [InquiriesController::class, 'update']);

// });

Route::middleware('auth', )->group(function () {

    Route::post('/updateInquire/{inquiry}', [InquiriesController::class, 'update']);
    Route::get('/inquireList', [InquiriesController::class, 'index'])->name('inquireList');


    Route::get('/messages/{id}', [ChatController::class, 'index']);
    Route::post('/sendMessage', [ChatController::class, 'store'])->name('/sendMessage');

    Route::post('/markAsComplete/{id}', [InquiriesController::class, 'markAsComplete']);
    


    // Route::post('send-message', [ChatController::class, 'sendMessage']);
    Route::get('getUser', [RegisteredUserController::class, 'users'])->name('getUser');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::post('/profile', [ProfileController::class, 'updateProfilePicture'])->name('profile.updatePicture');

    Route::get('/notificationCount', [ChatController::class, 'notificationCount'])->name('notificationCount');
    
    
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

    Route::get('settings', function () {
        return Inertia::render('Admin/Settings');
    })->name('settings');

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
    Route::get('receptionist/dashboard',[ReceptionistController::class, 'index'])->name('receptionist.dashboard');


    Route::get('receptionist/messages', function () {
        return Inertia::render('RECEPTIONIST/Messages');
    })->name('receptionist.messages');

    Route::get('receptionist/request', function () {
        return Inertia::render('RECEPTIONIST/Request');
    })->name('receptionist.request');


    Route::post('inquire', [InquiriesController::class, 'store'])->name('inquire');

    Route::get('receptionist/settings', function () {
        return Inertia::render('RECEPTIONIST/Settings');
    })->name('receptionist.settings');
   
    // Route::get('/inquireList', [InquiriesController::class, 'index'])->name('inquireList');

});


// Route::middleware(['auth', 'role:lydo_admin'])->get('/lydo/dashboard', function () {
//     return Inertia::render('LYDO/Dashboard');
// })->name('lydo.dashboard');


Route::middleware(['auth', 'role:lydo_aics_admin'])->group(function () {

    Route::get('lydo_acis/dashboard',[LydoController::class, 'index'])->name('lydo_acis.dashboard');

    Route::get('lydo_acis/request', function () {
        return Inertia::render('LYDO/Request');
    })->name('lydo_acis.request');

    
    Route::get('lydo_acis/messages', function () {
        return Inertia::render('LYDO/Messages');
    })->name('lydo_acis.messages');

      
    Route::get('lydo_acis/settings', function () {
        return Inertia::render('LYDO/Settings');
    })->name('lydo_acis.settings');

});

// Route::middleware(['auth', 'role:aics_admin'])->get('/aics/dashboard', function () {
//     return Inertia::render('AICS/Dashboard');
// })->name('aics.dashboard');

Route::middleware(['auth', 'role:aics_admin'])->group(function () {
    Route::get('/aics/dashboard', [AicsController::class, 'index']);
    
    Route::get('aics/request', function () {
        return Inertia::render('AICS/Request');
    })->name('aics.request');

    Route::get('aics/messages', function () {
        return Inertia::render('AICS/Messages');
    })->name('aics.messages');

    Route::get('aics/settings', function () {
        return Inertia::render('AICS/Settings');
    })->name('aics.settings');
});

Route::middleware(['auth', 'role:osca_admin'])->group(function () {
    Route::get('osca/dashboard',[OscaController::class, 'index'])->name('osca.dashboard');

    Route::get('osca/request', function () {
        return Inertia::render('OSCA/Request');
    })->name('osca.request');

    Route::get('osca/messages', function () {
        return Inertia::render('OSCA/Messages');
    })->name('osca.messages');

    Route::get('/oscaList', [InquiriesController::class, 'selectOsca'])->name('oscaList');

    Route::get('osca/settings', function () {
        return Inertia::render('OSCA/Settings');
    })->name('osca.settings');

});

// Route::middleware(['auth', 'role:pdao_admin'])->get('/pdao/dashboard', function () {
//     return Inertia::render('PDAO/Dashboard');
// })->name('pdao.dashboard');




Route::middleware(['auth', 'role:pdao_admin'])->group(function () {

    Route::get('pdao/dashboard', [PdaoController::class, 'index'])->name('pdao.dashboard');

    Route::get('pdao/settings', function () {
        return Inertia::render('PDAO/Settings');
    })->name('pdao.settings');

    
    Route::get('pdao/messages', function () {
        return Inertia::render('PDAO/Messages');
    })->name('pdao.messages');

    
    Route::get('pdao/request', function () {
        return Inertia::render('PDAO/Request');
    })->name('pdao.request');

});

Route::middleware(['auth', 'role:lydo_admin'])->group(function () {

    Route::get('lydo/dashboard',[LydoController::class, 'index'])->name('lydo.dashboard');

    Route::get('lydo/request', function () {
        return Inertia::render('LYDO/Request');
    })->name('lydo.request');

    
    Route::get('lydo/messages', function () {
        return Inertia::render('LYDO/Messages');
    })->name('lydo.messages');

    
    Route::get('lydo/settings', function () {
        return Inertia::render('LYDO/Settings');
    })->name('lydo.settings');


    // Route::get('/oscaList', [InquiriesController::class, 'selectOsca'])->name('oscaList');

});



Route::get('storage/sounds/{filename}', function ($filename) {
    $path = storage_path("app/public/sounds/{$filename}");

    if (!file_exists($path)) {
        abort(404);
    }

    return response()->file($path);
});



require __DIR__ . '/auth.php';