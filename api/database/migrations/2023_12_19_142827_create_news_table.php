<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('news', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('category')->comment('カテゴリ');
            $table->dateTime('published_at')->comment('公開日時');
            $table->dateTime('unpublished_at')->comment('公開終了日時');
            $table->string('title', 60)->comment('タイトル');
            $table->text('body')->comment('本文');
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
