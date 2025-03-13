<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Inquiries;
use Illuminate\Http\Request;

class OscaController extends Controller
{
    public function index()
    {
        $recent = Inquiries::where("unit_concern", "Senior Citizen's Affairs (OSCA)")
            ->latest()
            ->take(10)
            ->get();

        return Inertia::render('OSCA/Dashboard', [
            'recentInquiries' => $recent
        ]);
    }
}
