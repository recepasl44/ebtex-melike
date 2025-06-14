<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Exception;

class UploadService
{
    public function upload(UploadedFile $file, $path)
    {
        // Güvenlik kontrolleri, dosya türü ve boyutu kontrolü
        $allowedExtensions = ['jpeg', 'png', 'pdf'];
        if (!in_array($file->getClientOriginalExtension(), $allowedExtensions)) {
            throw new Exception('Yalnızca jpeg, png veya pdf dosyaları yüklenebilir.');
        }

        if ($file->getSize() > 2048000) { // Maksimum 2MB
            throw new Exception('Dosya boyutu 2MB\'ı geçemez.');
        }

        // Dosya yükleme işlemi
        return $file->store($path, 'public');
    }
}
