<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BillResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at->format('Y-m-d H:i:s'),
            'reference_date' => $this->reference_date,
            'due_at' => $this->due_at,
            'is_paid' => $this->is_paid,
            'user' => new UserResource($this->user()->first()),
            'category' => new CategoryResource($this->category()->first()),
            'category_id' => $this->category_id,
            'description' => $this->description,
            'amount' => $this->amount,
        ];
    }
}
