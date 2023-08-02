<?php 

namespace App\Contracts;

use Illuminate\Database\Eloquent\Model;

interface ServiceContract
{
    /**
     * @param int $perPage
     * @param int $page
     * @return Model[]
     */
    public function paginate(int $perPage = 15, int $page = 1, array $filters = []);

    /**
     * @param int $id
     * @return ?Model
     */
    public function show(int $id): ?Model;

    /**
     * @param int $id
     * @return Model
     */
    public function findOrFail(int $id): Model;
    
    /**
     * @param array $data
     * @return Model
     */
    public function store(array $data): Model;

    /**
     * @param Model $model
     * @param array $data
     * @return Model
     */
    public function update(Model $model, array $data): Model;

    /**
     * @param Model $model
     */
    public function delete(Model $model);
}