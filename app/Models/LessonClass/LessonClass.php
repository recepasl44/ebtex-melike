<?php

namespace App\Models\LessonClass;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LessonClass extends Model
{
    use HasFactory;

    protected $table = 'lesson_classes';

    protected $fillable = [
        'classroom_id',
        'name',
        'ordered',
    ];

    /**
     * Sınıfa ait classroom ilişkisi.
     */
    public function classroom()
    {
        // Burada Classroom modelinizin doğru namespace'ini kullandığınızdan emin olun.
        return $this->belongsTo(\App\Models\Classrooms\Classroom::class, 'classroom_id', 'id');
    }
}
