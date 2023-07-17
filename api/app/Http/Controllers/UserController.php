<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRegisterRequest;
use App\Services\UserService;
use App\Http\Resources\UserResource;

class UserController extends Controller
{
    public function register(UserRegisterRequest $request, UserService $userService) 
    {
        return new UserResource($userService->register($request->all())); 
    }
}
