<?php

namespace App\Observers;

use App\Models\Category;

class CategoryObserver
{
    /**
     * Handle to the category "creating" event.
     *
     * @param  \App\Category $category
     * @return void
     */
    public function creating(Category $category)
    {
        if (!auth()->user()) {
            return;
        }
        
        $category->user_id = auth()->id();
    }
}
