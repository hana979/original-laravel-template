<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\UseCases\Auth\LoginAction;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpKernel\Exception\HttpException;
use UnexpectedValueException;

final class LoginController extends Controller
{
    public function login(LoginRequest $request, LoginAction $loginAction): JsonResponse
    {
        $validated = $request->validated();
        $user = null;

        try {
            $user = $loginAction($validated);
        } catch (UnexpectedValueException $ex) {
            Log::error($ex->getMessage());
            return response()->json(['message' => $ex->getMessage()], 400);
        } catch (HttpException $ex) {
            Log::debug($ex->getMessage());
            $code = $ex->getStatusCode();
            if ($code === 400 || $code === 401) {
                return response()->json(['message' => $ex->getMessage()], $code);
            } else {
                throw $ex;
            }
        }

        $expiresAt = Carbon::now()->addMinutes(config('sanctum.expiration'));
        $token = $user->createToken('org-hnd-api', ['*'], $expiresAt);

        return response()->json([
            'access_token' => $token->plainTextToken,
            'expires_at' => $token->accessToken->expires_at->format('Y-m-d H:i:s'),
            'id' => $user->id,
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        $user = $request->user();
        if (!$user) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        $user->tokens()->delete();

        return response()->json([
            'message' => 'Successfully logged out',
        ]);
    }

    public function me(Request $request): JsonResponse
    {
        return response()->json($request->user());
    }
}
