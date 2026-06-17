<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('items', function (Blueprint $table) {
            $table->id();
            $table->string('name_az')->index();
            $table->string('name_en')->index();
            $table->text('description_az')->nullable();
            $table->text('description_en')->nullable();
            $table->string('image_url')->nullable();
            $table->double('price');
            $table->text('images')->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('items');
    }
};
