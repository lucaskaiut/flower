<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BillUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'description' => 'sometimes|min:3|max:128',
            'category_id' => 'sometimes',
            'amount' => 'sometimes|numeric',
            'due_at' => 'sometimes|date',
            'reference_date' => 'sometimes|date',
            'is_paid' => 'sometimes|boolean',
        ];
    }
}
