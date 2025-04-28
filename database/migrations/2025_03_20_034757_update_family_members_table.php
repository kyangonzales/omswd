<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('family_members', function (Blueprint $table) {
            // Add 'is_patient' column if it doesn't exist, and make it nullable
            $table->boolean('is_patient')->nullable()->after('income');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('family_members', function (Blueprint $table) {
            // Remove the 'is_patient' column if rolling back
            $table->dropColumn('is_patient');
        });
    }
};
