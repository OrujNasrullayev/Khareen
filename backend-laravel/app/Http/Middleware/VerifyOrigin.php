<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Str;

class VerifyOrigin
{
    /**
     * Handle an incoming request and verify Origin/Referer headers.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Only run for state-changing HTTP methods
        if (!in_array($request->method(), ['POST', 'PUT', 'PATCH', 'DELETE'])) {
            return $next($request);
        }

        $origin = $request->headers->get('origin');
        $referer = $request->headers->get('referer');

        // If both are completely absent, we allow it (supports non-browser clients like curl/postman)
        if (!$origin && !$referer) {
            return $next($request);
        }

        $allowedOrigins = $this->getAllowedOrigins();
        $isValid = false;

        if ($origin) {
            $isValid = $this->matchesAllowedOrigins($origin, $allowedOrigins);
        } elseif ($referer) {
            $isValid = $this->matchesAllowedOrigins($referer, $allowedOrigins);
        }

        if (!$isValid) {
            return response()->json(['message' => 'Origin/Referer validation failed. Forbidden.'], 403);
        }

        return $next($request);
    }

    /**
     * Compare a given URL against the allowed origins.
     */
    protected function matchesAllowedOrigins(string $url, array $allowedOrigins): bool
    {
        $host = parse_url($url, PHP_URL_HOST);
        if (!$host) {
            return false;
        }

        foreach ($allowedOrigins as $allowed) {
            $allowedHost = parse_url($allowed, PHP_URL_HOST) ?? $allowed;
            // Match exactly or support subdomains if desired, here we do exact match
            if (strtolower($host) === strtolower($allowedHost)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Get the list of allowed origins.
     */
    protected function getAllowedOrigins(): array
    {
        // Get from cors config if specified and not a wildcard
        $corsOrigins = config('cors.allowed_origins', []);
        
        $origins = [];
        if (!empty($corsOrigins) && !in_array('*', $corsOrigins)) {
            $origins = $corsOrigins;
        } else {
            // Fallbacks
            $origins = [
                config('app.url'),
                'http://localhost',
                'http://127.0.0.1',
                'https://khareen-api.onrender.com', // Explicitly trusting production UI based on your config
            ];
        }

        // Clean up any nulls and strip trailing slashes for clean parsing
        return array_map(function($url) {
            return rtrim($url, '/');
        }, array_filter($origins));
    }
}
