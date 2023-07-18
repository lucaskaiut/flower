<?php

use App\Http\Controllers\CategoryController;
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

Route::group(['controller' => CategoryController::class, 'prefix' => 'category', 'middleware' => 'auth:sanctum'], function () {
    Route::post('', 'store')->name('category.store');
    Route::get('', 'index')->name('category.index');
    Route::get('{category}', 'show')->name('category.show');
    Route::put('{category}', 'update')->name('category.update');
    Route::delete('{category}', 'destroy')->name('category.destroy');
});