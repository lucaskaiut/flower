<?php

namespace App\Services;

use App\Models\Category;
use App\Traits\CoreService;

class CategoryService
{
    use CoreService;

    protected string $model = Category::class;
}