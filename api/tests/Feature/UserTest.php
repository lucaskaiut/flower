<?php

namespace Tests\Feature;

use App\Models\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserTest extends TestCase
{
    use RefreshDatabase;

    public function test_the_user_register_endpoint()
    {
        $payload = [
            'name' => 'Lucas Kaiut Test',
            'email' => 'lucas.kaiut+test@gmail.com',
            'password' => '1815Kaiut!@',
            'avatar' => 'https://yt3.googleusercontent.com/-CFTJHU7fEWb7BYEb6Jh9gm1EpetvVGQqtof0Rbh-VQRIznYYKJxCaqv_9HeBcmJmIsp2vOO9JU=s900-c-k-c0x00ffffff-no-rj',
        ];

        $response = $this->post(route('user.register'), $payload, [
            'Accept' => 'application/json',
        ]);

        $response->assertCreated();
        $response->assertJsonStructure([
            'user' => [
                'id',
                'name',
                'email',
                'avatar',
                'created_at',
                'updated_at',
            ],
        ]);
    }

    public function test_the_user_login_endpoint()
    {
        User::create([
            'name' => 'Lucas Kaiut Test',
            'email' => 'lucas.kaiut+test@gmail.com',
            'password' => '1815Kaiut!@',
            'avatar' => 'https://yt3.googleusercontent.com/-CFTJHU7fEWb7BYEb6Jh9gm1EpetvVGQqtof0Rbh-VQRIznYYKJxCaqv_9HeBcmJmIsp2vOO9JU=s900-c-k-c0x00ffffff-no-rj',
        ]);
    
        $response = $this->post(route('user.login'), [
            'email' => 'lucas.kaiut+test@gmail.com',
            'password' => '1815Kaiut!@',
        ], [
            'Accept' => 'application/json',
        ]);

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data' => [
                'token',
                'user' => [
                    'id',
                    'name',
                    'email',
                    'avatar',
                    'created_at',
                    'updated_at',
                ],
            ],
        ]);
    }

    public function test_the_user_me_endpoint() {
        User::create([
            'name' => 'Lucas Kaiut Test',
            'email' => 'lucas.kaiut+test@gmail.com',
            'password' => '1815Kaiut!@',
            'avatar' => 'https://yt3.googleusercontent.com/-CFTJHU7fEWb7BYEb6Jh9gm1EpetvVGQqtof0Rbh-VQRIznYYKJxCaqv_9HeBcmJmIsp2vOO9JU=s900-c-k-c0x00ffffff-no-rj',
        ]);

        $loginRequest = $this->post(route('user.login'), [
            'email' => 'lucas.kaiut+test@gmail.com',
            'password' => '1815Kaiut!@',
        ], [
            'Accept' => 'application/json',
        ]);

        $loginResponse = $loginRequest->json();

        $token = $loginResponse['data']['token'];

        $response = $this->get(route('user.me'), [
            'Authorization' => 'Bearer ' . $token,
        ]);

        $response->assertOk();
        $response->assertJsonStructure([
            'user' => [
                'id',
                'name',
                'email',
                'avatar',
                'created_at',
                'updated_at',
            ],
        ]);
    }
}