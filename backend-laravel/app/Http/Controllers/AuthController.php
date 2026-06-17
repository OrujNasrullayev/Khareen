<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    const ADMIN_TOKEN = 'lumina_rent_secret_admin_token_2026';

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        if ($credentials['username'] === 'admin' && $credentials['password'] === 'Khareen2026') {
            return response()->json(['token' => self::ADMIN_TOKEN]);
        }

        return response()->json(['detail' => 'Incorrect username or password'], 401);
    }
}
