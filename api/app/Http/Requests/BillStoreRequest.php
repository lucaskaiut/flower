<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BillStoreRequest extends FormRequest
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
            'description' => 'required|min:3|max:128',
            'category_id' => 'required',
            'amount' => 'required|numeric',
            'due_at' => 'required|date',
            'reference_date' => 'required|date',
            'is_paid' => 'required|boolean',
        ];
    }
}
