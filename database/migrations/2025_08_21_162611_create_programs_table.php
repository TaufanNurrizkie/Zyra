<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('programs', function (Blueprint $table) {
            $table->id();
            $table->string('judul'); // judul program
            $table->text('isi'); // isi program
            $table->string('jenis'); // nama program
            $table->string('daerah'); // nama program
            $table->string('foto')->nullable(); // foto program
            $table->string('status')->default("segera"); // status program, default true
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('programs');
    }
};
