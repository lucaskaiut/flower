<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Model;
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

    public function show(int $id): ?Model
    {
        return $this->model::find($id);
    }

    public function findOrFail(int $id): Model
    {
        return $this->model::findOrFail($id);
    }

    public function store(array $data)
    {
        return $this->model::create($data);
    }

    public function update(Model $model, array $data): Model
    {
        $model->update($data);

        return $model;
    }

    public function delete(Model $model)
    {
        $model->delete();
    }
}