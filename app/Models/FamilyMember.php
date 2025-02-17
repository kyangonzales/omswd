<?php

namespace App\Models;

use App\Models\Inquiries;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class FamilyMember extends Model
{
    use HasFactory;

    protected $fillable = [
        'inquiry_id',
        'fullname',
        'birthdate',
        'sex',
        'civil_status',
        'relation_to_client',
        'educ_attain',
        'occupation',
        'income'
    ];

    public function inquiry()
    {
        return $this->belongsTo(Inquiries::class);
    }
}
