<?php

namespace App\Services;

use App\Contracts\ServiceContract;
use App\Models\PaymentMethod;
use App\Traits\CoreService;

class PaymentMethodService implements ServiceContract
{
    use CoreService;

    protected string $model = PaymentMethod::class;
}