<?php

namespace App\Http\Controllers;

use App\Models\SiteContent;
use Illuminate\Http\Request;

class SiteContentController extends Controller
{
    public function index(Request $request)
    {
        $query = SiteContent::query();

        if ($request->has('page')) {
            $query->where('page', $request->query('page'));
        }

        return response()->json($query->orderBy('id')->get());
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
        return response()->json($item);
    }
}
