<?php

use App\Http\Controllers\Api\RegisteredUserController;
use Laravel\Fortify\Http\Controllers\NewPasswordController;
use Laravel\Fortify\Http\Controllers\PasswordResetLinkController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::post('/register', [RegisteredUserController::class, 'store']);

    Route::post('/forgot-password', [PasswordResetLinkController::class, 'store'])->middleware(['guest']);

    Route::post('/reset-password', [NewPasswordController::class, 'store'])->middleware(['guest']);
});
