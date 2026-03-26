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
        Schema::create('customers', function (Blueprint $table): void {
            $table->id();
            $table->string('first_name', 100);
            $table->string('last_name', 100);
            $table->string('full_name')->nullable();
            $table->string('email')->nullable()->unique();
            $table->string('phone', 30)->nullable()->index();
            $table->string('document_type', 50)->nullable();
            $table->string('document_number', 50)->nullable()->unique();
            $table->date('birth_date')->nullable();
            $table->string('gender', 20)->nullable();
            $table->string('company_name')->nullable();
            $table->string('tax_id', 50)->nullable()->unique();
            $table->string('country', 80)->nullable();
            $table->string('state', 80)->nullable();
            $table->string('city', 80)->nullable();
            $table->string('address')->nullable();
            $table->string('postal_code', 20)->nullable();
            $table->text('notes')->nullable();
            $table->boolean('is_active')->default(true)->index();
            $table->timestamp('last_contacted_at')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};
