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

        $response = $this->post(route('payment_method.store'), $payload, [
            'Authorization' => 'Bearer ' . $token,
        ]);

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

        $response = $this->get(route('payment_method.index'), [
            'Authorization' => 'Bearer ' . $token,
        ]);

        $response->assertOk();
        $response->assertJsonStructure([
            'current_page',
            'data' => [
                [
                    'id',
                    'name',
                    'fee',
                    'created_at',
                    'updated_at',
                ],
            ],
            'first_page_url',
            'from',
            'last_page',
            'last_page_url',
            'links' => [
                [
                    'url',
                    'label',
                    'active',
                ],
            ],
            'next_page_url',
            'path',
            'per_page',
            'prev_page_url',
            'to',
            'total',
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

        $response = $this->get(route('payment_method.show', ['payment_method' => $paymentMethod->id]), [
            'Authorization' => 'Bearer ' . $token,
        ]);

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

        $response = $this->put(route('payment_method.update', ['payment_method' => $paymentMethod->id], [
            'name' => 'Dinheiro - Updated'
        ]), [
            'Authorization' => 'Bearer ' . $token,
        ]);

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
        $response = $this->delete(route('payment_method.destroy', ['payment_method' => $paymentMethod->id]), [
            'Authorization' => 'Bearer ' . $token,
        ]);

        $response->assertOk();
        
        $this->assertNull(PaymentMethod::find($paymentMethodId));
    }
}
