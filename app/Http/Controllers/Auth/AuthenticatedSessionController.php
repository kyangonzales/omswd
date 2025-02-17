<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    // public function store(LoginRequest $request): RedirectResponse
    // {
    //     $request->authenticate();

    //     $request->session()->regenerate();

    //     return redirect()->intended(route('dashboard', absolute: false));
    // }
    public function store(LoginRequest $request): RedirectResponse
{
    $request->authenticate();
    $request->session()->regenerate();

    $user = Auth::user();

    return match ($user->role) {
        'admin' => redirect()->intended(route('dashboard')),
        'lydo_admin' => redirect()->intended(route('lydo.dashboard')),
        'aics_admin' => redirect()->intended(route('aics.dashboard')),
        'osca_admin' => redirect()->intended(route('osca.dashboard')),
        'pdao_admin' => redirect()->intended(route('pdao.dashboard')),
        'lydo_aics_admin' => redirect()->intended(route('lydo.dashboard')),
        'receptionist' => redirect()->intended(route('receptionist.dashboard')),
        // default => redirect()->intended(route('dashboard')),
    };
}


    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
