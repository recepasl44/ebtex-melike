<?php

namespace App\Models\SupplierNote;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SupplierNote extends Model
{
    use HasFactory;

    protected $table = 'supplier_notes';

    protected $fillable = [
        'supplier_id',
        'note',
    ];

    public function supplier()
    {
        return $this->belongsTo(Supplier::class, 'supplier_id');
    }
}
