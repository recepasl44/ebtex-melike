<?php

namespace App\Models\FinanceNotes;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FinanceNote extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'installment_id',
        'note',
        'promise_date',
        'user_id',
    ];

    public function student()
    {
        return $this->belongsTo(\App\Models\Students\Student::class);
    }

    public function installment()
    {
        return $this->belongsTo(\App\Models\Installments\Installment::class);
    }

    public function user()
    {
        return $this->belongsTo(\App\Models\Access\User\User::class);
    }
}
