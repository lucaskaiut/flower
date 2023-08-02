<?php

namespace App\Services;

use App\Contracts\ServiceContract;
use App\Models\Bill;
use App\Traits\CoreService;
use Illuminate\Pagination\Paginator;

class BillService implements ServiceContract
{
    use CoreService;

    protected string $model = Bill::class;

    public function paginate(int $perPage = 15, int $page = 1, array $filters = [])
    {
        Paginator::currentPageResolver(function () use ($page) {
            return $page;
        });

        return (new $this->model)->filter($filters)->paginate($perPage);
    }
}