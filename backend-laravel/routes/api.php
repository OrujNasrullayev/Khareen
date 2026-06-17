<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\SiteContentController;
use App\Http\Middleware\EnsureAdminToken;

Route::post('/auth/login', [AuthController::class, 'login']);

Route::get('/items', [ItemController::class, 'index']);
Route::post('/contact', [ContactController::class, 'store']);
Route::get('/site-content', [SiteContentController::class, 'index']);

// Protected routes
Route::middleware([EnsureAdminToken::class])->group(function () {
    Route::post('/items', [ItemController::class, 'store']);
    Route::put('/items/{id}', [ItemController::class, 'update']);
    Route::delete('/items/{id}', [ItemController::class, 'destroy']);
    Route::post('/items/upload', [ItemController::class, 'upload']);
    
    Route::get('/contact', [ContactController::class, 'index']);
    Route::delete('/contact/{id}', [ContactController::class, 'destroy']);
    
    Route::put('/site-content/{key}', [SiteContentController::class, 'update']);
});
