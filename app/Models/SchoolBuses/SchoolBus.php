<?php

namespace App\Models\SchoolBuses;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SchoolBus extends Model
{
    use HasFactory;

    protected $table = 'schoolbus_infos';

    protected $fillable = [
        'brand', 
        'model', 
        'year', 
        'plate', 
        'chassis_number', 
        'inspection_date', 
        'seats'
    ];

    protected $dates = [
        'inspection_date'
    ];
}
