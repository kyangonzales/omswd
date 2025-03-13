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
            $table->string('contact_number');
            $table->string('birthdate');
            $table->string('sex');
            $table->string('religion');
            $table->string('civil_status');
            $table->string('educ_attain');
            $table->string('occupation');
            $table->string('income');
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
