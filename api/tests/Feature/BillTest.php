<?php

namespace Tests\Feature;

use App\Models\Bill;
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
            'description' => 'teste',
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
            uri: route('bill.index', ['description' => 'teste']), 
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
            'additional' => [
                'totals' => [
                    'in',
                    'out',
                    'status',
                ],
            ],
        ]);
    }

    public function test_show_a_bill()
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

        $bill = $this->post(
            uri: route('bill.store'), 
            data: $payload, 
            headers: ['Authorization' => 'Bearer ' . $token,]
        )->json();

        $response = $this->get(
            uri: route('bill.show', ['bill' => $bill['data']['id']]), 
            headers: ['Authorization' => 'Bearer ' . $token,]
        );

        $response->assertOk();
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

    public function test_update_a_bill()
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

        $bill = $this->post(
            uri: route('bill.store'), 
            data: $payload, 
            headers: ['Authorization' => 'Bearer ' . $token,]
        )->json()['data'];

        $response = $this->put(
            uri: route('bill.update', ['bill' => $bill['id']]),
            data: ['description' => 'Conta de teste - Updated'],
            headers: ['Authorization' => 'Bearer ' . $token,]
        );

        $response->assertOk();
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
        
        $bill = Bill::find($bill['id']);

        $this->assertTrue($bill->description == 'Conta de teste - Updated');
    }

    public function test_delete_a_bill()
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

        $bill = $this->post(
            uri: route('bill.store'), 
            data: $payload, 
            headers: ['Authorization' => 'Bearer ' . $token,]
        )->json()['data'];

        $response = $this->delete(
            uri: route('bill.destroy', ['bill' => $bill['id']]),
            headers: ['Authorization' => 'Bearer ' . $token,]
        );

        $response->assertOk();

        $this->assertNull(Bill::find($bill['id']));
    }

    public function test_guest_cant_create_bill()
    {
        $response = $this->post(route('bill.store'), [], ['Accept' => 'application/json']);
        $response->assertStatus(401);
    }

    public function test_guest_cant_list_bills()
    {
        $response = $this->get(route('bill.index'), ['Accept' => 'application/json']);
        $response->assertStatus(401);
    }

    public function test_guest_cant_see_a_bill()
    {
        $response = $this->get(route('bill.show', ['bill' => 1]), ['Accept' => 'application/json']);
        $response->assertStatus(401);
    }

    public function test_guest_cant_update_a_bill()
    {
        $response = $this->put(route('bill.update', ['bill' => 1]), [], ['Accept' => 'application/json']);
        $response->assertStatus(401);
    }

    public function test_guest_cant_delete_a_bill()
    {
        $response = $this->delete(route('bill.destroy', ['bill' => 1]), [], ['Accept' => 'application/json']);
        $response->assertStatus(401);
    }

    public function test_filter_bills()
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

        $bills = [
            [
                'description' => 'Conta de teste',
                'reference_date' => Carbon::now()->format('Y-m-d'),
                'due_at' => Carbon::now()->addMonth()->format('Y-m-d'),
                'is_paid' => false,
                'category_id' => $category->id,
                'amount' => 24.97,
            ],
            [
                'description' => 'conta',
                'reference_date' => Carbon::now()->format('Y-m-d'),
                'due_at' => Carbon::now()->addMonth()->format('Y-m-d'),
                'is_paid' => false,
                'category_id' => $category->id,
                'amount' => 24.97,
            ]
        ];

        $token = $user->createToken('auth')->plainTextToken;

        foreach ($bills as $payload) {
            $this->post(
                uri: route('bill.store'), 
                data: $payload, 
                headers: ['Authorization' => 'Bearer ' . $token,]
            );
        }
        
        $response = $this->get(
            uri: route('bill.index', ['description' => 'teste']), 
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
            'additional' => [
                'totals' => [
                    'in',
                    'out',
                    'status',
                ],
            ],
        ]);

        $body = $response->json()['data'];

        $this->assertTrue(sizeof($body) == 1);
    }
}
