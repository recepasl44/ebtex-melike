<?php
namespace App\Models\Parent;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ParentModel extends Model
{
    use HasFactory;

    protected $table = 'parents';

    protected $fillable = [
        'student_id',
        'name',
        'phone',
    ];

    public function student()
    {
        return $this->belongsTo(\App\Models\Students\Student::class, 'student_id');
    }
}
