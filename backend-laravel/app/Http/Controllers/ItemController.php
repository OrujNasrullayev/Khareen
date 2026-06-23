<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ItemController extends Controller
{
    public function index(Request $request)
    {
        $skip = $request->query('skip', 0);
        $limit = $request->query('limit', 100);

        $cacheKey = "items_{$skip}_{$limit}";
        $items = \Illuminate\Support\Facades\Cache::remember($cacheKey, 86400, function () use ($skip, $limit) {
            return Item::skip($skip)->take($limit)->get();
        });

        return response()->json($items);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name_az' => 'required|string',
            'name_en' => 'required|string',
            'description_az' => 'nullable|string',
            'description_en' => 'nullable|string',
            'image_url' => 'nullable|string',
            'price' => 'required|numeric',
            'images' => 'nullable|string',
        ]);

        $item = Item::create($data);
        \Illuminate\Support\Facades\Cache::flush(); // Invalidate cache
        return response()->json($item, 200); // 200 to match python
    }

    public function update(Request $request, $id)
    {
        $item = Item::find($id);
        if (!$item) {
            return response()->json(['detail' => 'Item not found'], 404);
        }

        $data = $request->validate([
            'name_az' => 'required|string',
            'name_en' => 'required|string',
            'description_az' => 'nullable|string',
            'description_en' => 'nullable|string',
            'image_url' => 'nullable|string',
            'price' => 'required|numeric',
            'images' => 'nullable|string',
        ]);

        $item->update($data);
        \Illuminate\Support\Facades\Cache::flush(); // Invalidate cache
        return response()->json($item);
    }

    public function destroy($id)
    {
        $item = Item::find($id);
        if (!$item) {
            return response()->json(['detail' => 'Item not found'], 404);
        }

        $item->delete();
        \Illuminate\Support\Facades\Cache::flush(); // Invalidate cache
        return response()->json(['message' => "Item {$id} successfully deleted"]);
    }

    public function upload(Request $request)
    {
        $request->validate([
            'files' => 'required',
        ]);

        $files = $request->file('files');
        $debug = [
            'type' => gettype($files),
            'is_array' => is_array($files),
            'count' => is_array($files) ? count($files) : 1
        ];

        if (!$files) {
            return response()->json(['detail' => 'No valid files provided'], 422);
        }

        if (!is_array($files)) {
            $files = [$files];
        }

        // Laravel public_path() points to 'public' by default, 
        // but we are using docker volume mapping to write into the frontend/uploads directory.
        // We mapped ../frontend/uploads to /frontend/uploads in docker-compose.
        $uploadDir = '/frontend/uploads';
        
        // If not running in docker, fallback to base path
        if (!is_dir($uploadDir)) {
            $baseDir = dirname(dirname(dirname(dirname(__DIR__))));
            $uploadDir = $baseDir . DIRECTORY_SEPARATOR . 'frontend' . DIRECTORY_SEPARATOR . 'uploads';
        }
        
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }

        $urls = [];
        foreach ($files as $file) {
            if ($file && $file->isValid()) {
                $uniqueFilename = (string) Str::uuid() . '.' . $file->getClientOriginalExtension();
                $file->move($uploadDir, $uniqueFilename);
                $urls[] = "/uploads/{$uniqueFilename}";
            }
        }

        if (empty($urls)) {
            return response()->json(['error' => 'No valid files to process', 'debug' => $debug], 422);
        }

        return response()->json(['urls' => $urls]);
    }
}
