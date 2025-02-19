<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Inquiries;
use App\Events\RequestSent;
use App\Models\FamilyMember;
use Illuminate\Http\Request;

class InquiriesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Inquiries::all()->load('familyMembers');
        return response()->json([
            'payload' => $data
        ],200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $unit_concern = $request->unitConcern;
        // Create the inquiry entry
        $data = Inquiries::create([
            'fullname' => $request->name,
            'unit_concern' => $request->unitConcern,
            'address' => $request->houseNumber . " " . $request->purok . " " . $request->barangay,
            'contact_number' => $request->contactNumber,
            'birthdate' => $request->bday,
            'sex' => $request->sex,
            'religion' => $request->religion,
            'civil_status' => $request->civilStatus,
            'educ_attain' => $request->education,
            'occupation' => $request->occupation,
            'income' => $request->income,
            'remarks' => $request->remarks,
        ]);
    
        // Get the generated inquiry ID
        $inquiry_id = $data->id;
    
        // Check if familyMembers is provided and is an array
        if ($request->has('familyMembers') && is_array($request->familyMembers)) {
            foreach ($request->familyMembers as $member) {
                FamilyMember::create([
                    'inquiry_id' => $inquiry_id, // Assuming there's a foreign key in FamilyMember
                    'fullname' => $member['name'] ?? null,
                    'birthdate' => $member['birthdate'] ?? null,
                    'sex' => $member['sex'] ?? null,
                    'civil_status' => $member['civilStatus'] ?? null,
                    'relation_to_client' => $member['relationship'] ?? null,
                    'educ_attain' => $member['education'] ?? null,
                    'occupation' => $member['occupation'] ?? null,
                    'income' => $member['income'] ?? null,
                ]);
            }
        }


        $data->load('familyMembers');
        $userIds = [];

        $roleMapping = [
            "Case Study Report" => "osca_admin",
            "Aid to Individual in Crisis (AICS)" => "aics_admin",
            "Special Cases" => "osca_admin",
            "Person with Disability (PWD)" => "pdao_admin",
            "Solo Parent" => "lydo_admin",
            "Local Youth Development Office (LYDO)" => "lydo_admin",
            "Senior Citizen's Affairs (OSCA)" => "osca_admin",
            "Referral (Indigency, Ambulance, Philhealth, LCR, PAO)" => "lydo_admin",
        ];
        
        // Get the role for the given unit_concern
        $role = $roleMapping[$unit_concern] ?? null;
        
        if ($role) {
            $users = User::whereIn('role', [$role, 'admin'])->get();
            $userIds = $users->pluck('id')->toArray();
        }        

        broadcast(new RequestSent($data,$userIds))->toOthers();
    
        return response()->json(['message' => 'Inquiry saved successfully', 'payload' => $data ], 201);
    }
    

    /**
     * Display the specified resource.
     */
    public function show(Inquiries $inquiries)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Inquiries $inquiries)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Inquiries $inquiries)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Inquiries $inquiries)
    {
        //
    }
}
