<?php
namespace App\Models\CustomerOther;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CustomerOther extends Model
{
    use HasFactory;

    protected $table = 'customers';

    protected $fillable = [
        'name',
        'email',
        'phone',
        'fax',
        'iban',
        'city',
        'district',
        'neighborhood',
        'address',
        'tax_number',
        'tax_office',
        'is_legal_entity',
    ];


}
