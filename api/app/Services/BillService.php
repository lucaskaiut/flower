<?php

namespace App\Services;

use App\Models\Bill;
use App\Traits\CoreService;

class BillService
{
    use CoreService;

    protected string $model = Bill::class;
}