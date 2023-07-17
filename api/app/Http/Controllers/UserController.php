<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRegisterRequest;
use App\Http\Requests\UserLoginRequest;
use App\Http\Resources\UserLoginResource;
use App\Services\UserService;
use App\Http\Resources\UserResource;

class UserController extends Controller
{
    public function register(UserRegisterRequest $request, UserService $userService) 
    {
        return new UserResource($userService->register($request->all())); 
    }

    public function login(UserLoginRequest $request, UserService $userService)
    {
        return new UserLoginResource($userService->login($request->all()));
    }

    public function me()
    {
        return new UserResource(auth()->user());
    }
}
