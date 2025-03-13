<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Inquiries;
use Illuminate\Http\Request;

class PdaoController extends Controller
{
    public function index()
    {
        $recent = Inquiries::where("unit_concern", "Person with Disability (PWD)")
            ->latest()
            ->take(10)
            ->get();

        return Inertia::render('PDAO/Dashboard', [
            'recentInquiries' => $recent
        ]);
    }
}
