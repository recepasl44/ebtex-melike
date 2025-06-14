<?php

namespace App\Http\Requests\Backend\Stations;

use Illuminate\Foundation\Http\FormRequest;

class StationRequest extends FormRequest
{
    public function authorize()
    {
        // Yetkilendirme kontrolü
        return access()->allow('manage-stations');
    }

    public function rules()
    {
        return [
            'station_name' => 'required|max:150',
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric'
        ];
    }
}
