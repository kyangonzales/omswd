<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('password'), 
            'role' => 'admin'
        ]);
        User::create([
            'name' => 'Francis Mark R. Factor',
            'email' => 'francis@gmail.com',
            'password' => Hash::make('password'), 
            'role' => 'lydo_aics_admin'
        ]);
        User::create([
            'name' => 'Lorie',
            'email' => 'lorie@gmail.com',
            'password' => Hash::make('password'), 
            'role' => 'aics_admin'
        ]);
        User::create([
            'name' => 'Receptionist',
            'email' => 'recep@gmail.com',
            'password' => Hash::make('password'), 
            'role' => 'receptionist'
        ]);
        User::create([
            'name' => 'Sir Dimple',
            'email' => 'dimple@gmail.com',
            'password' => Hash::make('password'), 
            'role' => 'osca_admin'
        ]);
    }
}
