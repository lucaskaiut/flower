<?php

namespace App\Services;

use App\Contracts\ServiceContract;
use App\Models\Bill;
use App\Traits\CoreService;

class BillService implements ServiceContract
{
    use CoreService;

    protected string $model = Bill::class;
}