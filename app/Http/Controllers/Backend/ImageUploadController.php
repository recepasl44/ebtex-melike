<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImageUploadController extends Controller
{
    public function upload(Request $request)
    {
        // Gelen dosyayı ve dosya türünü doğrulayın
        $request->validate([
            'file' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'file_type' => 'required|string',
        ]);

        // Dosyayı yükleyin
        $file = $request->file('file');
        $fileType = $request->input('file_type');
        $path = $file->store('images', 'public');

        // Yükleme başarılı olduğunda, dosya yolunu ve türünü JSON olarak döndürün
        return response()->json([
//            'location' => "/storage/$path",
            'location' => Storage::disk('public')->url($path),
            'file_type' => $fileType
        ]);
    }
}
