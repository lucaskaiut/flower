<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::group(['controller' => UserController::class, 'prefix' => 'user'], function () {
    Route::post('register', 'register')->name('user.register');
    Route::post('login', 'login')->name('user.login');

    Route::group(['middleware' => 'auth:sanctum'], function () {
        Route::get('me', 'me')->name('user.me');
    });
});