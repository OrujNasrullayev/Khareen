<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('contact_forms', function (Blueprint $table) {
            $table->id();
            $table->string('name')->index();
            $table->string('whatsapp_number');
            $table->string('event_date')->nullable();
            $table->string('occasion')->nullable();
            $table->string('size')->nullable();
            $table->text('message')->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('contact_forms');
    }
};
