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
        Schema::table('inquiries', function (Blueprint $table) {
            $table->string('contact_number')->nullable()->change();
            $table->string('religion')->nullable()->change();
            $table->string('educ_attain')->nullable()->change();
            $table->string('occupation')->nullable()->change();
            $table->string('income')->nullable()->change();
            $table->text('remarks')->nullable()->change();


            $table->boolean('is_patient')->nullable()->after('civil_status');
            
            // Add 'problem_presented' column if it doesn't exist and make it nullable
            $table->string('problem_presented')->nullable()->after('is_patient');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('inquiries', function (Blueprint $table) {
            // If rolling back, make columns non-nullable again
            $table->string('contact_number')->nullable(false)->change();
            $table->string('religion')->nullable(false)->change();
            $table->string('educ_attain')->nullable(false)->change();
            $table->string('occupation')->nullable(false)->change();
            $table->string('income')->nullable(false)->change();
            $table->text('remarks')->nullable(false)->change();

            $table->dropColumn('is_patient');
            $table->dropColumn('problem_presented');
        });
    }
};
