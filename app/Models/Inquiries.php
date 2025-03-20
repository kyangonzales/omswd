<?php

namespace App\Models;

use App\Models\FamilyMember;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Inquiries extends Model
{
    use HasFactory;

    protected $fillable = [
        'fullname',
        'unit_concern',
        'house_number',
        'purok',
        'barangay',
        'contact_number',
        'birthdate',
        'religion',
        'civil_status',
        'educ_attain',
        'occupation',
        'sex',
        'income',
        'remarks',
        'status',
        'is_patient',
        'problem_presented'
    ];

    public function familyMembers()
    {
        return $this->hasMany(FamilyMember::class, 'inquiry_id');
    }
}
