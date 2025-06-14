<?php

namespace App\Models\Drivings;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DrivingLicence extends Model
{
    use HasFactory;

    protected $table = 'schoolbus_driving_licenses'; // Modelin hangi tabloyla ilişkili olduğunu belirtir.

    // Eğer tablonuzda created_at veya updated_at gibi timestamp alanları yoksa aşağıdaki satırı ekleyin:
    public $timestamps = false;

    // Modelin hangi alanlarının doldurulabileceğini belirten dizi.
    protected $fillable = [
        'first_name', 'last_name', 'phone', 'licence_class', 'licence_date', 'status', 'src', 'src_file_path'
    ];
}