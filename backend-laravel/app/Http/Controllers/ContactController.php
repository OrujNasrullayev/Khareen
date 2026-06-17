<?php

namespace App\Http\Controllers;

use App\Models\ContactForm;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'whatsapp_number' => 'required|string',
            'event_date' => 'nullable|string',
            'occasion' => 'nullable|string',
            'size' => 'nullable|string',
            'message' => 'nullable|string',
        ]);

        $form = ContactForm::create($data);
        return response()->json($form, 200); // 200 to match python
    }

    public function index(Request $request)
    {
        $skip = $request->query('skip', 0);
        $limit = $request->query('limit', 100);

        return response()->json(ContactForm::skip($skip)->take($limit)->get());
    }

    public function destroy($id)
    {
        $form = ContactForm::find($id);
        if (!$form) {
            return response()->json(['detail' => 'Contact submission not found'], 404);
        }

        $form->delete();
        return response()->json(['message' => "Contact form submission {$id} successfully deleted"]);
    }
}
