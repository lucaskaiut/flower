<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\UserService;
use App\Http\Resources\UserResource;

class UserController extends Controller
{
    public function register(Request $request, UserService $userService) 
    {
        return new UserResource($userService->register($request->all())); 
    }
}
