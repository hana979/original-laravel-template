<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    // ユーザー登録 TODO: Fortifyを使う
    public function register(Request $request)
    {
        try {
            $user = new User();
            $user->name = $request->name;
            $user->email = $request->email;
            $user->password = Hash::make($request->password);
            $user->save();
        } catch (Exception $ex) {
            return response()->json(
                [
                    'message' => '登録失敗',
                    'errors' => $ex->getMessage(),
                ],
                500
            );
        }

        $json = [
            'data' => $user,
        ];

        return response()->json($json, Response::HTTP_OK);
    }

    // ログイン
    public function login(Request $request)
    {
        logger('$request');
        logger($request);
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = User::whereEmail($request->email)->first();
            $user->tokens()->delete();
            $token = $user->createToken("login:user{$user->id}")->plainTextToken;
            //ログインが成功した場合はトークンを返す
            return response()->json(['token' => $token], Response::HTTP_OK);
        }
        return response()->json('Can Not Login.', Response::HTTP_INTERNAL_SERVER_ERROR);
    }

    // ログアウト
    public function logout()
    {
        auth()
            ->user()
            ->tokens()
            ->delete();
        return response()->json([
            'message' => 'Successfully logged out',
        ]);
    }

    // TODO: ログインチェック用のAPIを作る

    // 自身のユーザ情報を取得する。
    public function me()
    {
        return response()->json(auth()->user());
    }
}
