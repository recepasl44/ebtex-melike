<?php

namespace App\Http\Requests\Backend\Drivings;

use Illuminate\Foundation\Http\FormRequest;

class DrivingRequest extends FormRequest
{
    public function authorize()
    {
        // Burada kullanıcı yetkilendirme kontrollerini yapın
        return access()->allow('manage-driving');  // Kullanıcının ilgili yetkiye sahip olup olmadığını kontrol ediyoruz.
    }

    public function rules()
    {
        return [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'phone' => 'required|string|max:15',
            'licence_class' => 'required|string|max:5',
            'licence_date' => 'required|date',
            'status' => 'required|in:active,inactive,pending',
            'src_file' => 'nullable|file|mimes:jpeg,png,pdf|max:2048'
        ];
    }
}