<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\Auth;

use App\Actions\Fortify\CreateNewUser;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;

final class RegisteredUserController extends Controller
{
    public function store(Request $request)
    {
        $user = (new CreateNewUser())->create($request->all());

        Auth::login($user);

        $expires_at = Carbon::now()->addMinutes(config('sanctum.expiration'));
        $token = $user->createToken('org-hnd-api', ['*'], $expires_at);

        return response()->json([
            'access_token' => $token->plainTextToken,
            'expires_at' => $token->accessToken->expires_at->format('Y-m-d H:i:s'),
            'id' => $user->id,
        ]);
    }
}
