<?php

declare(strict_types=1);

use App\Http\Controllers\Api\Auth\LoginController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::prefix('v1')->group(function () {
    // ログインしてアクセストークンを取得する。
    Route::post('/login', [LoginController::class, 'login'])->name('login');
    Route::middleware('auth:sanctum')->group(function () {
        // ログアウトする。
        Route::post('/logout', [LoginController::class, 'logout']);
        // 自身のユーザ情報を取得する。
        Route::get('/me', [LoginController::class, 'me']);
    });
});
