<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PDFController extends Controller
{
    public function index()
    {
        return view('upload'); // Upload form view
    }

    public function upload(Request $request)
    {
        $request->validate([
            'pdf' => 'required|mimes:pdf|max:2048',
        ]);

        $path = $request->file('pdf')->store('pdfs');

        return response()->json(['path' => $path]);
    }
}
