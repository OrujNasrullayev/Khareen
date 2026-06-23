<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CompressResponse
{
    /**
     * Handle an incoming request and compress the response if applicable.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // 1. Check if client accepts gzip encoding
        $encodings = $request->getEncodings();
        if (!in_array('gzip', $encodings)) {
            return $response;
        }

        // 2. Check if the response is already compressed
        if ($response->headers->has('Content-Encoding')) {
            return $response;
        }

        // 3. Only compress JSON or text responses
        $contentType = $response->headers->get('Content-Type');
        if (!$contentType || !preg_match('/(text|json|xml)/i', $contentType)) {
            return $response;
        }

        // Get the response content
        $content = $response->getContent();

        // 4. Threshold check (e.g., avoid compressing tiny payloads under 1024 bytes)
        if (strlen($content) < 1024) {
            return $response;
        }

        // 5. Compress the content
        $compressed = gzencode($content, 9);
        
        if ($compressed) {
            $response->setContent($compressed);
            $response->headers->set('Content-Encoding', 'gzip');
            $response->headers->set('Vary', 'Accept-Encoding');
            $response->headers->set('Content-Length', strlen($compressed));
        }

        return $response;
    }
}
