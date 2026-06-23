<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\File;

Route::get('{any}', function ($any = 'index.html') {
    // Determine path based on container mapping or local fallback
    $path = is_dir('/frontend') ? '/frontend/' . $any : base_path('../frontend/' . $any);
    
    // Fallback to index.html for SPA if file doesn't exist
    if (!File::exists($path)) {
        $path = is_dir('/frontend') ? '/frontend/index.html' : base_path('../frontend/index.html');
    }
    
    if (!File::exists($path)) {
        return response('File not found', 404);
    }
    
    $mime = mime_content_type($path) ?: 'text/html';
    
    $ext = pathinfo($path, PATHINFO_EXTENSION);
    if ($ext === 'css') $mime = 'text/css';
    if ($ext === 'js') $mime = 'application/javascript';
    if ($ext === 'svg') $mime = 'image/svg+xml';
    if ($ext === 'html') $mime = 'text/html';
    
    return response()->file($path, ['Content-Type' => $mime]);
})->where('any', '^(?!items|auth|contact|site-content).*$');
