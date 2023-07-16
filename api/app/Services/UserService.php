<?php

namespace App\Services;

use App\Models\User;

final class UserService
{
    private $model = User::class;

    public function register(array $data)
    {
        return $this->model::create($data);
    }
}