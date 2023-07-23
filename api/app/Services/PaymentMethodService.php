<?php

namespace App\Services;

use App\Models\PaymentMethod;
use App\Traits\CoreService;

class PaymentMethodService
{
    use CoreService;

    protected string $model = PaymentMethod::class;
}