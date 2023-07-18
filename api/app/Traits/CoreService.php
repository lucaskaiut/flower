<?php

namespace App\Traits;

use Illuminate\Pagination\Paginator;

trait CoreService
{
    public function paginate(int $perPage = 15, int $page = 1)
    {
        Paginator::currentPageResolver(function () use ($page) {
            return $page;
        });

        return $this->model::paginate($perPage);
    }

    public function store(array $data)
    {
        return $this->model::create($data);
    }
}