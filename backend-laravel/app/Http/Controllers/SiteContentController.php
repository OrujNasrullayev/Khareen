<?php

namespace App\Http\Controllers;

use App\Models\SiteContent;
use Illuminate\Http\Request;

class SiteContentController extends Controller
{
    public function index(Request $request)
    {
        $query = SiteContent::query();

        $page = $request->query('page', 'all');
        $cacheKey = "site_content_{$page}";

        $content = \Illuminate\Support\Facades\Cache::remember($cacheKey, 86400, function () use ($query, $request) {
            if ($request->has('page')) {
                $query->where('page', $request->query('page'));
            }
            return $query->orderBy('id')->get();
        });

        return response()->json($content);
    }

    public function update(Request $request, $key)
    {
        $item = SiteContent::where('key', $key)->first();

        if (!$item) {
            return response()->json(['detail' => "Content key '{$key}' not found"], 404);
        }

        $data = $request->validate([
            'value' => 'required|string',
        ]);

        $item->update($data);
        \Illuminate\Support\Facades\Cache::flush(); // Invalidate cache
        return response()->json($item);
    }
}
