<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryStoreRequest;
use App\Http\Requests\CategoryUpdateRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use App\Services\CategoryService;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(CategoryService $categoryService)
    {
        return $categoryService->paginate(request()->perPage ?? 15, request()->page ?? 1);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CategoryStoreRequest $request, CategoryService $categoryService)
    {
        $data = $request->all();
        $data['user_id'] = auth()->user()->id;
        return new CategoryResource($categoryService->store($data));
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CategoryUpdateRequest $request, Category $category)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        //
    }
}