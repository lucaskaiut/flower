<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Builder;

trait HasFilter
{
    public function filter(array $filters)
    {
        return $this->where(function (Builder $builder) use ($filters) {
            collect($filters)->map(function ($key, $filter) use ($builder) {
                $function = $filter . 'Filter';
                if (!method_exists($this, $function)) {
                    return;
                }
                $this->$function($key, $builder);
            });
        });
    }
}