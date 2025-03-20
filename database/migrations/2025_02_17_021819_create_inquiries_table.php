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
        Schema::create('inquiries', function (Blueprint $table) {
            $table->id();
            $table->string('fullname');
            $table->string('unit_concern');
            $table->string('house_number')->nullable();
            $table->string('purok');
            $table->string('barangay');
            $table->string('contact_number')->nullable();
            $table->string('birthdate');
            $table->string('sex');
            $table->string('religion')->nullable();
            $table->string('civil_status');
            $table->string('problem_presented')->nullable();
            $table->boolean('is_patient')->nullable();
            $table->string('educ_attain')->nullable();
            $table->string('occupation')->nullable();
            $table->string('income')->nullable();
            $table->string('status');
            $table->text('remarks')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inquiries');
    }
};
