<?php

namespace App\Http\Controllers\News;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class NewsController extends Controller
{
    public function index(): Response
    {
        $model = [];

        return Inertia::render('News/Index', $model);
    }

    public function create(): Response
    {
        $model = [];

        return Inertia::render('News/Create', $model);
    }

    public function edit($newsId): Response
    {
        $model = [
            'newsId' => $newsId,
        ];

        return Inertia::render('News/Edit', $model);
    }

}
