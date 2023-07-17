<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRegisterRequest extends FormRequest
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
            'name' => [
                'required',
                'min:3',
                'max:64',
            ],
            'email' => [
                'required',
                'email',
                'unique:App\Models\User,email'
            ],
            'password' => [
                'required',
                'min:4',
                'max:64',
            ],
            'avatar' => [
                'sometimes',
            ],
        ];
    }
}
