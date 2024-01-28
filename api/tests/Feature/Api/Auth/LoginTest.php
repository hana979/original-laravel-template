<?php

namespace Tests\Feature\Api\Auth;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class LoginTest extends TestCase
{

    public function setUp(): void
    {
        parent::setUp();
    }

    /**
     * ログインパリデーション失敗：全て未指定
     */
    public function testLoginValidationRedAllUnspecified(): void
    {
        $data = [];

        $response = $this->post(route('login', $data));

        $response->assertStatus(422)
            ->assertJsonFragment([
                'message' => 'Validation error',
                'errors' => [
                    'email' => [
                        'validation.required'
                    ],
                    'password' => [
                        'validation.required'
                    ]
                ],
            ]);
    }

    /**
     * ログインパリデーション失敗：Emailが未指定
     */
    public function testLoginValidationRedEmailUnspecified(): void
    {
        $data = [
            'password' => 'password',
        ];
        $response = $this->post(route('login', $data));

        $response->assertStatus(422)
            ->assertJsonFragment([
                'message' => 'Validation error',
                'errors' => [
                    'email' => [
                        'validation.required'
                    ]
                ],
            ]);
    }

    /**
     * ログインパリデーション失敗：Passwordが未指定
     */
    public function testLoginValidationRedPasswordUnspecified(): void
    {
        $data = [
            'email' => 'hanada@example.com',
        ];

        $response = $this->post(route('login', $data));

        $response->assertStatus(422)
            ->assertJsonFragment([
                'message' => 'Validation error',
                'errors' => [
                    'password' => [
                        'validation.required'
                    ]
                ],
            ]);
    }

    /**
     * ログインパリデーション失敗：Email形式ではない
     */
    public function testLoginValidationRedEmailFormat(): void
    {
        $data = [
            'email' => 'hanada@example',
            'password' => 'password'
        ];

        $response = $this->post(route('login', $data));

        $response->assertStatus(401)
            ->assertJsonFragment([
                'message' => 'Unauthenticated',
            ]);
    }

    /**
     * ログインパリデーション失敗：Emailが無効
     */
    public function testLoginValidationRedEmailInvalid(): void
    {
        $data = [
            'email' => 'xxxhanada@example.com',
            'password' => 'password'
        ];

        $response = $this->post(route('login', $data));

        $response->assertStatus(401)
            ->assertJsonFragment([
                'message' => 'Unauthenticated',
            ]);
    }

    /**
     * ログインパリデーション失敗：Passwordが無効
     */
    public function testLoginValidationRedPasswordInvalid(): void
    {
        $data = [
            'email' => 'hanada@example.com',
            'password' => 'invalid_password'
        ];

        $response = $this->post(route('login', $data));

        $response->assertStatus(401)
            ->assertJsonFragment([
                'message' => 'Unauthenticated',
            ]);
    }

    /**
     * ログインパリデーション成功
     */
    public function testLoginValidationGreen(): void
    {
        $data = [
            'email' => 'hanada@example.com',
            'password' => 'password'
        ];

        $response = $this->post(route('login', $data));

        $response->assertOk();
    }
}
