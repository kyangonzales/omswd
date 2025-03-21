<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Inquiries;
use App\Events\RequestSent;
use App\Models\FamilyMember;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class InquiriesController extends Controller
{
    public function index(Request $request)
    {
        $query = Inquiries::with('familyMembers')->orderBy('created_at', 'desc');
    
        // Apply search filter if provided
        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where('fullname', 'like', "%$search%");
        }
    
        // Apply date range filter
        if ($request->has('from')) {
            $query->whereDate('created_at', '>=', $request->input('from'));
        }
        if ($request->has('to')) {
            $query->whereDate('created_at', '<=', $request->input('to'));
        }
    
        // Apply unit concern filter
        if ($request->has('unit_concern')) {
            $query->where('unit_concern', $request->input('unit_concern'));
        }
    
        // Get rows per page from request (default to 10 if not provided)
        $perPage = $request->input('per_page', 10);
    
        // Paginate the results dynamically
        $data = $query->paginate($perPage);
    
        return response()->json([
            'payload' => $data
        ], 200);
    }

    public function selectOsca()
    {
        $data = Inquiries::where('unit_concern', "Senior Citizen's Affairs (OSCA)")->get();
        $data->load('familyMembers');
        return response()->json([
            'payload' => $data
        ], 200);
    }

    public function selectLydo()
    {
        $data = Inquiries::where('unit_concern', "Senior Citizen's Affairs (OSCA)")->get();
        $data->load('familyMembers');
        return response()->json([
            'payload' => $data
        ], 200);
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
        $unit_concern = $request->unit_concern;
        $data = Inquiries::create([
            'fullname' => $request->fullname,
            'unit_concern' => $request->unit_concern,
            'house_number' => $request->house_number,
            'purok' => $request->purok,
            'barangay' => $request->barangay,
            'contact_number' => $request->contact_number,
            'birthdate' => $request->birthdate,
            'sex' => $request->sex,
            'religion' => $request->religion,
            'civil_status' => $request->civil_status,
            'educ_attain' => $request->educ_attain,
            'occupation' => $request->occupation,
            'income' => $request->income,
            'remarks' => $request->remarks,
            'status' => "pending",
            'problem_presented' => $request->problem_presented,
            'is_patient' => $request->is_patient,

        ]);

        $inquiry_id = $data->id;

        if ($request->has('family_members') && is_array($request->family_members)) {
            foreach ($request->family_members as $member) {
                if (!empty($member['fullname']) && !empty($member['birthdate']) && 
                    !empty($member['sex']) && !empty($member['civil_status']) && 
                    !empty($member['relation_to_client'])) {
                    FamilyMember::create([
                        'inquiry_id' => $inquiry_id, 
                        'fullname' => $member['fullname'],
                        'birthdate' => $member['birthdate'],
                        'sex' => $member['sex'],
                        'civil_status' => $member['civil_status'],
                        'relation_to_client' => $member['relation_to_client'],
                        'educ_attain' => $member['educ_attain'] ?? null,
                        'occupation' => $member['occupation'] ?? null,
                        'income' => $member['income'] ?? null,
                        'is_patient' =>  $member['is_patient'] ?? null,
                    ]);
                }
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

        $role = $roleMapping[$unit_concern] ?? null;

        if ($role) {
            $users = User::whereIn('role', [$role, 'admin'])->get();
            $userIds = $users->pluck('id')->toArray();
        }

        broadcast(new RequestSent($data, $userIds))->toOthers();

        return response()->json(['message' => 'Inquiry saved successfully', 'payload' => $data], 201);
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
    public function update(Request $request, Inquiries $inquiry)
    {
        $inquiry->update($request->only([
            'uni_concern', 'fullname', 'birthdate', 'contact_number', 'house_number',
            'purok', 'barangay', 'educ_attain', 'sex', 'civil_status',
            'religion', 'occupation', 'income', 'remarks', 'is_patient'
        ]));

        $newFamilyMembers = [];
        if ($request->has('family_members') && count($request->family_members) > 0 ) {
            foreach ($request->family_members as $member) {
                if ($member['id'] != null || $member['id'] != "") {
                  
                    FamilyMember::where('id', $member['id'])->update([
                        'fullname' => $member['fullname'],
                        'relation_to_client' => $member['relation_to_client'],
                        'birthdate' => $member['birthdate'],
                        'sex' => $member['sex'],
                        'civil_status' => $member['civil_status'],
                        'educ_attain' => $member['educ_attain'],
                        'occupation' => $member['occupation'],
                        'income' => $member['income'],
                        'is_patient' =>  $member['is_patient']
                    ]);
                } else {
                    $newFamilyMembers[] = $inquiry->familyMembers()->create([
                        'fullname' => $member['fullname'],
                        'relation_to_client' => $member['relation_to_client'],
                        'birthdate' => $member['birthdate'],
                        'sex' => $member['sex'],
                        'civil_status' => $member['civil_status'],
                        'educ_attain' => $member['educ_attain'],
                        'occupation' => $member['occupation'],
                        'income' => $member['income'],
                        'is_patient' =>  $member['is_patient']
                    ]);
                    
                }
            }
        } else {}
    
        $deletedIds = [];

        if (!empty($request->deleted_family_members) && count($request->deleted_family_members) > 0) {
            $deletedIds = collect($request->deleted_family_members)->pluck('id')->filter()->all();
            foreach ($deletedIds as $id) {
                FamilyMember::where('id', $id)->delete();
            }
        }
        return response()->json([
            'message' => 'Inquiry updated successfully. Family members updated, added, and deleted as needed.',
            'inquiry' => $inquiry->load('familyMembers'),
            'new_family_members' => $newFamilyMembers, // Return newly added members
        ]);
    }
    
    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $inquiry = Inquiries::findOrFail($id);
            $inquiry->delete();

            return response()->json(['message' => 'Inquiry deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete inquiry'], 500);
        }
    }

    public function markAsComplete($id)
    {
        try {
            $data = Inquiries::findOrFail($id);
            $data->status = 'printed'; 
            $data->update(); 
    
            return response()->json($data, 200);
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()], 500); 
        }
    }
    
}