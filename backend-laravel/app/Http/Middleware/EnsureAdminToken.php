<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class EnsureAdminToken
{
    const ADMIN_TOKEN = 'lumina_rent_secret_admin_token_2026';

    public function handle(Request $request, Closure $next)
    {
        $authorization = $request->header('Authorization');

        if (!$authorization) {
            return response()->json(['detail' => 'Missing Authorization header'], 401);
        }

        $parts = explode(' ', $authorization);
        if (count($parts) !== 2 || strtolower($parts[0]) !== 'bearer') {
            return response()->json(['detail' => 'Authorization header must be Bearer <token>'], 401);
        }

        $token = $parts[1];
        if ($token !== self::ADMIN_TOKEN) {
            return response()->json(['detail' => 'Invalid or expired admin token'], 403);
        }

        return $next($request);
    }
}
