<?php

namespace App\Models;

use App\Traits\HasFilter;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Bill extends Model
{
    use HasFactory, HasFilter;

    protected $guarded = [];

    public function user() 
    {
        return $this->belongsTo(User::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    private function descriptionFilter($value, Builder $builder)
    {
        $builder->where('description', 'like', '%' . $value . '%');
    }
}
