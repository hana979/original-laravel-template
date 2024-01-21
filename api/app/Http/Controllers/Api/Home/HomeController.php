<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api\Home;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

final class HomeController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        return response()->json([
            'new_arrival_topics' => [
                [
                    'id' => 3,
                    'title' => '新着トピック',
                    'summary' => '新着トピックの概要',
                    'category' => 'お知らせ',
                    'created_at' => '2023-12-01 00:00:00',
                    'updated_at' => '2023-12-01 00:00:00',
                ],
                [
                    'id' => 2,
                    'title' => '新着トピック',
                    'summary' => '新着トピックの概要',
                    'category' => '災害情報',
                    'created_at' => '2023-11-01 00:00:00',
                    'updated_at' => '2023-11-01 00:00:00',
                ],
                [
                    'id' => 1,
                    'title' => '新着トピック',
                    'summary' => '新着トピックの概要',
                    'category' => '生活情報',
                    'created_at' => '2023-10-01 00:00:00',
                    'updated_at' => '2023-10-01 00:00:00',
                ],
            ],
        ]);
    }
}
