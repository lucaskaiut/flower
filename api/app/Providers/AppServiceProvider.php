<?php

namespace App\Providers;

use App\Models\Category;
use App\Models\PaymentMethod;
use App\Observers\CategoryObserver;
use App\Observers\PaymentMethodObserver;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Category::observe(CategoryObserver::class);
        PaymentMethod::observe(PaymentMethodObserver::class);
    }
}
