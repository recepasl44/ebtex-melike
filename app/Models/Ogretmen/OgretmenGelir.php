<?php 
namespace App\Models\Ogretmen;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OgretmenGelir extends Model
{
    use HasFactory;

    protected $table = 'ogretmen_gelir';

    protected $fillable = [
        'tip',
        'miktar',
        'tarih'
    ];
}
