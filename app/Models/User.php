<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'profile'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function isAdmin()
    {
        return $this->role === 'admin';
    }

    public function isLydoAdmin()
    {
        return $this->role === 'lydo_admin';
    }
    
    public function isAicsAdmin()
    {
        return $this->role === 'aics_admin';
    }

    public function isOscaAdmin()
    {
        return $this->role === 'osca_admin';
    }

    public function isPdaoAdmin()
    {
        return $this->role === 'pdao_admin';
    }
    public function isLydoAicsAdmin()
    {
        return $this->role === 'lydo_aics_admin';
    }
    public function isReceptionist()
    {
        return $this->role === 'receptionist';
    }
}
