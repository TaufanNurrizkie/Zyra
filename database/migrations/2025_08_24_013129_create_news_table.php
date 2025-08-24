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
        Schema::create('news', function (Blueprint $table) {
            $table->id();
             $table->string('title');              // judul berita
            $table->text('excerpt');              // ringkasan singkat
            $table->longText('content');          // isi lengkap berita
            $table->string('image')->nullable();  // path/URL gambar
            $table->string('author')->nullable(); // nama penulis
            $table->date('date');                 // tanggal publikasi
            $table->boolean('featured')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('news');
    }
};
