<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CategoryTest extends TestCase
{
    use RefreshDatabase;
    
    public function test_create_category()
    {
        $payload = [
            'name' => 'Categoria Teste',
            'type' => 'in'
        ];

        $token = User::create([
            'name' => 'Lucas Kaiut - Test Create Category',
            'email' => 'lucas.kaiut_test_create_category@gmail.com',
            'password' => '1815Kaiut!@'
        ])->createToken('auth')->plainTextToken;

        $response = $this->post(route('category.store'), $payload, [
            'Authorization' => 'Bearer ' . $token,
        ]);
        $response->assertCreated();
        $response->assertJsonStructure([
            'data' => [
                'id',
                'name',
                'type',
                'created_at',
                'updated_at',
            ],
        ]);
    }

    public function test_list_categories()
    {
        $token = User::create([
            'name' => 'Lucas Kaiut - Test List Categories',
            'email' => 'lucas.kaiut_test_list_categories@gmail.com',
            'password' => '1815Kaiut!@'
        ])->createToken('auth')->plainTextToken;

        $response = $this->get(route('category.index'), [
            'Authorization' => 'Bearer ' . $token, 
        ]);

        $response->assertOk();

        $response->assertJsonStructure([
            'current_page',
            'data' => [
                [
                    'id',
                    'user_id',
                    'name',
                    'type',
                    'created_at',
                    'updated_at'
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

    public function test_can_read_a_category() 
    {
        $user = User::create([
            'name' => 'Lucas Kaiut - Test Read Category',
            'email' => 'lucas.kaiut_test_read_category@gmail.com',
            'password' => '1815Kaiut!@'
        ]);

        $category = Category::create(['name' => 'Category Test', 'type' => 'in', 'user_id' => $user->id]);

        $response = $this->get(route('category.show', ['category' => $category->id]), [
            'Authorization' => 'Bearer ' . $user->createToken('auth')->plainTextToken,
        ]);

        $response->assertOk();
        $response->assertJsonStructure([
            'data' => [
                'id',
                'name',
                'type',
                'created_at',
                'updated_at',
            ],
        ]);
    }

    public function test_can_update_a_category()
    {
        $user = User::create([
            'name' => 'Lucas Kaiut - Test Update Category',
            'email' => 'lucas.kaiut_test_update_category@gmail.com',
            'password' => '1815Kaiut!@'
        ]);

        $category = Category::create(['name' => 'Category Test', 'type' => 'in', 'user_id' => $user->id]);

        $response = $this->put(route('category.update', ['category' => $category->id]), [
            'name' => 'Category Test - Updated',
        ], [
            'Authorization' => 'Bearer ' . $user->createToken('auth')->plainTextToken,
        ]);

        $response->assertOk();
        
        $category->refresh();

        $this->assertTrue($category->name == 'Category Test - Updated');
    }

    public function test_delete_a_category()
    {
        $user = User::create([
            'name' => 'Lucas Kaiut - Test Delete Category',
            'email' => 'lucas.kaiut_test_delete_category@gmail.com',
            'password' => '1815Kaiut!@'
        ]);

        $category = Category::create(['name' => 'Category Test', 'type' => 'in', 'user_id' => $user->id]);

        $categoryId = $category->id;

        $response = $this->delete(route('category.destroy', ['category' => $category->id]), [], [
            'Authorization' => 'Bearer ' . $user->createToken('auth')->plainTextToken,
        ]);

        $response->assertOk();
        $this->assertNull(Category::find($categoryId));
    }
}
