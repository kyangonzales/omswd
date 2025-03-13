<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }


    public function updateProfilePicture(Request $request)
    {
        $user = auth()->user();
    
        $request->validate([
            'profile_picture' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);        
    
        if ($request->hasFile('profile_picture')) {
            // Tanggalin ang lumang file kung mayroon
            if ($user->profile && Storage::disk('public')->exists(str_replace('storage/', '', $user->profile))) {
                Storage::disk('public')->delete(str_replace('storage/', '', $user->profile));
            }
    
            // Mag-assign ng bagong filename (e.g., user_5_1710151234.jpg)
            $file = $request->file('profile_picture');
            $filename = 'user_' . $user->id . '_' . time() . '.' . $file->getClientOriginalExtension();
            
            // I-save ang file sa "public/profile_pictures/"
            $path = $file->storeAs('profile_pictures', $filename, 'public');
    
            // I-update ang path sa database (ginamit natin ang "storage/" para ma-access sa browser)
            $user->profile = "storage/" . $path;
            $user->save();
        }
    
        return back()->with('success', 'Profile updated successfully!');
    }
    
    
    

}
