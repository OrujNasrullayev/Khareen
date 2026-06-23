<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\SiteContentController;
use App\Http\Middleware\EnsureAdminToken;

function addRoute($method, $uri, $action, $middleware = null) {
    $r1 = Route::$method($uri, $action);
    $r2 = Route::$method($uri . '/', $action);
    if ($middleware) {
        $r1->middleware($middleware);
        $r2->middleware($middleware);
    }
}

addRoute('post', '/auth/login', [AuthController::class, 'login']);

addRoute('get', '/items', [ItemController::class, 'index']);
addRoute('post', '/contact', [ContactController::class, 'store']);
addRoute('get', '/site-content', [SiteContentController::class, 'index']);

// Protected routes
Route::middleware([EnsureAdminToken::class])->group(function () {
    addRoute('post', '/items', [ItemController::class, 'store']);
    addRoute('put', '/items/{id}', [ItemController::class, 'update']);
    addRoute('delete', '/items/{id}', [ItemController::class, 'destroy']);
    addRoute('post', '/items/upload', [ItemController::class, 'upload']);
    
    addRoute('get', '/contact', [ContactController::class, 'index']);
    addRoute('delete', '/contact/{id}', [ContactController::class, 'destroy']);
    
    addRoute('put', '/site-content/{key}', [SiteContentController::class, 'update']);
});
