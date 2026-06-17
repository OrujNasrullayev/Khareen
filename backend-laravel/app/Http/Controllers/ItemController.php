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

        return response()->json(Item::skip($skip)->take($limit)->get());
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
        return response()->json($item);
    }

    public function destroy($id)
    {
        $item = Item::find($id);
        if (!$item) {
            return response()->json(['detail' => 'Item not found'], 404);
        }

        $item->delete();
        return response()->json(['message' => "Item {$id} successfully deleted"]);
    }

    public function upload(Request $request)
    {
        $request->validate([
            'files' => 'required|array',
            'files.*' => 'file'
        ]);

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
        foreach ($request->file('files') as $file) {
            $uniqueFilename = (string) Str::uuid() . '.' . $file->getClientOriginalExtension();
            $file->move($uploadDir, $uniqueFilename);
            $urls[] = "/uploads/{$uniqueFilename}";
        }

        return response()->json(['urls' => $urls]);
    }
}
