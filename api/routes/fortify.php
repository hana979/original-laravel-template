<?php

declare(strict_types=1);

use App\Http\Controllers\Api\Auth\RegisteredUserController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Http\Controllers\NewPasswordController;
use Laravel\Fortify\Http\Controllers\PasswordResetLinkController;

Route::prefix('v1')->group(function () {
    Route::post('/register', [RegisteredUserController::class, 'store']);

    Route::post('/forgot-password', [PasswordResetLinkController::class, 'store'])->middleware(['guest']);

    Route::post('/reset-password', [NewPasswordController::class, 'store'])->middleware(['guest']);
});
