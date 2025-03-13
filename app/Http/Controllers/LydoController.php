<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Inquiries;
use Illuminate\Http\Request;

class LydoController extends Controller
{
    public function index()
    {
        $recent = Inquiries::where("unit_concern", "Local Youth Development Office (LYDO)")
            ->latest()
            ->take(10)
            ->get();

        return Inertia::render('LYDO/Dashboard', [
            'recentInquiries' => $recent
        ]);
    }
}
