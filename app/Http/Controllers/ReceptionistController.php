<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Inquiries;
use Illuminate\Http\Request;

class ReceptionistController extends Controller
{
    public function index(){
        $recent = Inquiries::latest()->take(10)->get();
    
        return Inertia::render('RECEPTIONIST/Dashboard', [
            'recentInquiries' => $recent
        ]);
    }

}
