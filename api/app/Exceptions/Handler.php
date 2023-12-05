<?php

namespace App\Exceptions;

use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = ['current_password', 'password', 'password_confirmation'];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    public function render($request, Throwable $e)
    {
        if ($e instanceof ModelNotFoundException) {
            return response()->json(['message' => 'Model not found'], 404);
        } elseif ($e instanceof NotFoundHttpException) {
            return response()->json(['message' => 'Not found'], 404);
        } elseif ($e instanceof AuthenticationException) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        } elseif ($e instanceof HttpException) {
            return response()->json(['message' => $e->getMessage()], $e->getStatusCode());
        } elseif ($e instanceof ValidationException) {
            return response()->json(
                [
                    'message' => 'Validation error',
                    'errors' => $e->errors(),
                ],
                422
            );
        } else {
            // return parent::render($request, $e);
            logger(__METHOD__ . ': ' . print_r($e, true));
            $result = [
                'message' => 'Internal server error',
            ];
            if (config('app.debug')) {
                $result['error'] = $e->getMessage();
            }

            return response()->json($result, 500);
        }
    }
}
