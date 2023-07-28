<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\PaymentMethod;
use App\Models\User;

class PaymentMethodTest extends TestCase
{
    use RefreshDatabase;

    public function test_create_payment_method()
    {
        $token = User::create([
            'name' => 'Lucas Kaiut - Test Create Category',
            'email' => 'lucas.kaiut_test_create_category@gmail.com',
            'password' => '1815Kaiut!@'
        ])->createToken('auth')->plainTextToken;

        $payload = [
            'name' => 'Dinheiro',
            'fee' => 0
        ];

        $response = $this->post(
            uri: route('payment_method.store'),
            data: $payload,
            headers: ['Authorization' => 'Bearer ' . $token,]
        );

        $response->assertCreated();
        $response->assertJsonStructure([
            'data' => [
                'id',
                'name',
                'fee',
                'created_at',
                'updated_at',
            ],
        ]);
    }

    public function test_list_payment_method()
    {
        $user = User::create([
            'name' => 'Lucas Kaiut - Test Create Category',
            'email' => 'lucas.kaiut_test_create_category@gmail.com',
            'password' => '1815Kaiut!@'
        ]);

        $token = $user->createToken('auth')->plainTextToken;

        PaymentMethod::create(['name' => 'Dinheiro', 'fee' => 0, 'user_id' => $user->id]);

        $response = $this->get(
            uri: route('payment_method.index'),
            headers: ['Authorization' => 'Bearer ' . $token,]
        );

        $response->assertOk();
        $response->assertJsonStructure([
            'data' => [
                [
                    'id',
                    'name',
                    'fee',
                    'created_at',
                    'updated_at',
                ],
            ],
            'links' => [
                'first',
                'last',
                'prev',
                'next',
            ],
            'meta' => [
                'current_page',
                'from',
                'last_page',
                'links' => [
                    [
                        'url',
                        'label',
                        'active',
                    ],
                ],
                'path',
                'per_page',
                'to',
                'total',
            ],
        ]);
    }

    public function test_read_payment_method()
    {
        $user = User::create([
            'name' => 'Lucas Kaiut - Test Create Category',
            'email' => 'lucas.kaiut_test_create_category@gmail.com',
            'password' => '1815Kaiut!@'
        ]);

        $token = $user->createToken('auth')->plainTextToken;

        $paymentMethod = PaymentMethod::create(['name' => 'Dinheiro', 'fee' => 0, 'user_id' => $user->id]);

        $response = $this->get(
            uri: route('payment_method.show', ['payment_method' => $paymentMethod->id]),
            headers: ['Authorization' => 'Bearer ' . $token,]
        );

        $response->assertOk();
        $response->assertJsonStructure([
            'data' => [
                'id',
                'name',
                'fee',
                'created_at',
                'updated_at',
            ],
        ]);
    }

    public function test_update_payment_method()
    {
        $user = User::create([
            'name' => 'Lucas Kaiut - Test Create Category',
            'email' => 'lucas.kaiut_test_create_category@gmail.com',
            'password' => '1815Kaiut!@'
        ]);

        $token = $user->createToken('auth')->plainTextToken;

        $paymentMethod = PaymentMethod::create(['name' => 'Dinheiro', 'fee' => 0, 'user_id' => $user->id]);

        $response = $this->put(
            uri: route('payment_method.update', ['payment_method' => $paymentMethod->id]),
            data: ['name' => 'Dinheiro - Updated'],
            headers: ['Authorization' => 'Bearer ' . $token,]
        );

        $response->assertOk();
        $response->assertJsonStructure([
            'data' => [
                'id',
                'name',
                'fee',
                'created_at',
                'updated_at',
            ],
        ]);
        $paymentMethod->refresh();
        $this->assertTrue($paymentMethod->name == 'Dinheiro - Updated');
        $response->assertOk();
        $response->assertJsonStructure([
            'data' => [
                'id',
                'name',
                'fee',
                'created_at',
                'updated_at',
            ],
        ]);
    }

    public function test_delete_a_payment_method()
    {
        $user = User::create([
            'name' => 'Lucas Kaiut - Test Create Category',
            'email' => 'lucas.kaiut_test_create_category@gmail.com',
            'password' => '1815Kaiut!@'
        ]);

        $token = $user->createToken('auth')->plainTextToken;
        $paymentMethod = PaymentMethod::create(['name' => 'Dinheiro', 'fee' => 0, 'user_id' => $user->id]);
        $paymentMethodId = $paymentMethod->id;
        $response = $this->delete(
            uri: route('payment_method.destroy', ['payment_method' => $paymentMethod->id]),
            data: [],
            headers: ['Authorization' => 'Bearer ' . $token,]
        );

        $response->assertOk();

        $this->assertNull(PaymentMethod::find($paymentMethodId));
    }
}
