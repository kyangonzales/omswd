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
        Schema::create('family_members', function (Blueprint $table) {
            $table->id();
            $table->foreignId('inquiry_id')->constrained('inquiries')->onDelete('cascade');
            $table->string('fullname');
            $table->string('birthdate');
            $table->string('sex');
            $table->string('civil_status');
            $table->string('relation_to_client');
            $table->string('educ_attain')->nullable();
            $table->string('occupation')->nullable();
            $table->string('income')->nullable();
            $table->boolean('is_patient')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('family_members');
    }
};
