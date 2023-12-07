<?php

declare(strict_types=1);

namespace App\UseCases\Auth;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

final class LoginAction
{
    /**
     * Handle the incoming request.
     */
    public function __invoke($validated): User
    {
        $user = User::whereEmail($validated['email'])->first();
        if (!$user || !Hash::check($validated['password'], $user->password)) {
            abort(401, 'Unauthenticated');
        }

        return $user;
    }
}
