<?php

namespace App\Observers;

use App\Models\Bill;

class BillObserver
{
    public function creating(Bill $bill): void
    {
        if (!auth()->user()) {
            return;
        }

        $bill->user_id = auth()->id();
    }
}
