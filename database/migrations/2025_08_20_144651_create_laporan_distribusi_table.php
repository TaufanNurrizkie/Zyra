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
        Schema::create('laporan_distribusi', function (Blueprint $table) {
            $table->id();
            $table->string('penerima');
            $table->string('alamat');
            $table->string('jenis_bantuan');
            $table->string('dana_keluar');
            $table->string('tanggal');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('laporan_distribusi');
    }
};
