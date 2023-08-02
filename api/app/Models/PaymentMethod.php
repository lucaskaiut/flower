<?php

namespace App\Models;

use App\Traits\HasFilter;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PaymentMethod extends Model
{
    use HasFactory, HasFilter;

    protected $guarded = [];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
