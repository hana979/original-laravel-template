<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use UnexpectedValueException;

class AuthController extends Controller
{
    // ログイン
    public function login(Request $request)
    {
        logger('$request');
        logger($request);

        try {
            $validated = $request->validate([
                'email' => 'required',
                'password' => 'required',
            ]);
        } catch (ValidationException $ex) {
            return response()->json(
                [
                    'message' => 'Validation error',
                    'errors' => $ex->errors(),
                ],
                422
            );
        }

        $user = null;
        try {
            $user = $this->loginByCreadential($validated);
        } catch (UnexpectedValueException $ex) {
            logger()->error($ex->getMessage());
            return response()->json(['message' => $ex->getMessage()], 400);
        } catch (HttpException $ex) {
            logger()->error($ex->getMessage());
            $code = $ex->getStatusCode();
            if ($code === 400 || $code === 401) {
                return response()->json(['message' => $ex->getMessage()], $code);
            } else {
                throw $ex;
            }
        }

        $expires_at = Carbon::now()->addMinutes(config('sanctum.expiration'));
        $token = $user->createToken('org-hnd-api', ['*'], $expires_at);

        return response()->json([
            'access_token' => $token->plainTextToken,
            'expires_at' => $token->accessToken->expires_at->format('Y-m-d H:i:s'),
            'id' => $user->id,
        ]);
    }

    // Email・Passwordでログインする
    protected function loginByCreadential($validated)
    {
        $user = User::whereEmail($validated['email'])->first();
        if (!$user || !Hash::check($validated['password'], $user->password)) {
            abort(401, 'Unauthenticated');
        }

        return $user;
    }

    // ログアウト
    public function logout()
    {
        $user = auth()->user();
        if (!$user) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        $user->tokens()->delete();

        return response()->json([
            'message' => 'Successfully logged out',
        ]);
    }

    // 自身のユーザ情報を取得する。
    public function me()
    {
        return response()->json(auth()->user());
    }
}
