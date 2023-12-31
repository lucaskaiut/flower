<?php

namespace App\Services;

use App\Contracts\ServiceContract;
use App\Models\User;
use App\Traits\CoreService;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Hash;

final class UserService implements ServiceContract
{
    use CoreService;
    
    private $model = User::class;

    public function register(array $data)
    {
        return $this->model::create($data);
    }

    public function login(array $data)
    {
        $user = $this->model::where('email', $data['email'])->first();

        $userLogged = $user && Hash::check($data['password'], $user->password);

        throw_if(!$userLogged, new ModelNotFoundException("Usuário ou senha inválido"));

        return [
            'user' => $user,
            'token' => $user->createToken('auth')->plainTextToken,
        ];
    }
}