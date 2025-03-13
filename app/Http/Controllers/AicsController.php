<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Inquiries;
use Illuminate\Http\Request;

class AicsController extends Controller
{
    public function index()
    {
        $recent = Inquiries::where('unit_concern', 'Aid to Individual in Crisis (AICS)')
            ->latest()
            ->take(10)
            ->get();

        return Inertia::render('AICS/Dashboard', [
            'recentInquiries' => $recent
        ]);
    }
}
