<?php

namespace App\Services;

use App\Contracts\ServiceContract;
use App\Models\Category;
use App\Traits\CoreService;

class CategoryService implements ServiceContract
{
    use CoreService;

    protected string $model = Category::class;
}