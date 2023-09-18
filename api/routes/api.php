<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;

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

// ログインしてアクセストークンを取得する。
route::post('/login', [AuthController::class, 'login'])->name('login');
// 新規登録
Route::post('/register', [AuthController::class, 'register'])->name('register');

Route::middleware('auth:sanctum')->group(function () {
    // ログアウトする。
    Route::post('/logout', [AuthController::class, 'logout']);
    // 自身のユーザ情報を取得する。
    Route::get('/me', [AuthController::class, 'me']);
});
