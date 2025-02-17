<?php

namespace App\Models;

use App\Models\FamilyMember;
use Illuminate\Database\Eloquent\Model;

class Inquiries extends Model
{
    use HasFactory;

    protected $fillable = [
        'fullname',
        'unit_concern',
        'address',
        'contact_number',
        'birthdate',
        'religion',
        'civil_status',
        'educ_attain',
        'occupation',
        'sex',
        'income',
        'remarks'
    ];

    public function familyMembers()
    {
        return $this->hasMany(FamilyMember::class, 'inquiry_id');
    }
}
