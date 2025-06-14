<?php

namespace App\Models\Stations;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Station extends Model
{
    use HasFactory;

    protected $table = 'schoolbus_stations';

    protected $fillable = ['station_name', 'latitude', 'longitude'];
}
