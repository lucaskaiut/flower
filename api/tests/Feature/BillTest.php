<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BillTest extends TestCase
{
    use RefreshDatabase;

    public function test_create_a_bill()
    {
        $user = User::create([
            'name' => 'Lucas Kaiut - Test Create Category',
            'email' => 'lucas.kaiut_test_create_category@gmail.com',
            'password' => '1815Kaiut!@'
        ]);

        $category = Category::create([
            'name' => 'Categoria Teste',
            'type' => 'in',
            'user_id' => $user->id,
        ]);

        $payload = [
            'description' => 'Conta de teste',
            'reference_date' => Carbon::now()->format('Y-m-d'),
            'due_at' => Carbon::now()->addMonth()->format('Y-m-d'),
            'is_paid' => false,
            'category_id' => $category->id,
            'amount' => 24.97,
        ];

        $token = $user->createToken('auth')->plainTextToken;

        $response = $this->post(
            uri: route('bill.store'), 
            data: $payload, 
            headers: ['Authorization' => 'Bearer ' . $token,]
        );

        $response->assertCreated();
        $response->assertJsonStructure([
            'data' => [
                'id',
                'description',
                'reference_date',
                'due_at',
                'is_paid',
                'category_id',
                'category',
                'user',
                'amount',
                'created_at',
                'updated_at',
            ],
        ]);
    }

    public function test_list_bills()
    {
        $user = User::create([
            'name' => 'Lucas Kaiut - Test Create Category',
            'email' => 'lucas.kaiut_test_create_category@gmail.com',
            'password' => '1815Kaiut!@'
        ]);

        $category = Category::create([
            'name' => 'Categoria Teste',
            'type' => 'in',
            'user_id' => $user->id,
        ]);

        $payload = [
            'description' => 'Conta de teste',
            'reference_date' => Carbon::now()->format('Y-m-d'),
            'due_at' => Carbon::now()->addMonth()->format('Y-m-d'),
            'is_paid' => false,
            'category_id' => $category->id,
            'amount' => 24.97,
        ];

        $token = $user->createToken('auth')->plainTextToken;

        $this->post(
            uri: route('bill.store'), 
            data: $payload, 
            headers: ['Authorization' => 'Bearer ' . $token,]
        );

        $response = $this->get(
            uri: route('bill.index'), 
            headers: ['Authorization' => 'Bearer ' . $token,]
        );

        $response->assertOk();
        $response->assertJsonStructure([
            'data' => [
                [
                    'id',
                    'description',
                    'reference_date',
                    'due_at',
                    'is_paid',
                    'category_id',
                    'category',
                    'user',
                    'amount',
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
}
