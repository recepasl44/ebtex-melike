<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SchoolBusRequest extends FormRequest
{
    public function authorize()
    {
        // Yetkilendirme kontrolü
        return access()->allow('manage-schoolbus');
    }

    public function rules()
    {
        return [
            'brand' => 'required|max:50',
            'model' => 'required|max:50',
            'year' => 'required|max:10',
            'plate' => 'required|max:20',
            'chassis_number' => 'required|max:30',
            'inspection_date' => 'required|date',
            'seats' => 'required|max:5'
        ];
    }
}