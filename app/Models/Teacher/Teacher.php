<?php

namespace App\Models\Teacher;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    use HasFactory;

    protected $table = 'teachers';

    protected $fillable = [
        'personel_id',
        'name_surname',
        'short_name',
        'branch',
        'class_teacher_id',
        'social_club',
        'email',
    ];

    /**
     * Personel ilişkisi.
     * Listeleme ve detay API’sinde personel_id’ye bağlı olarak personeller tablosundaki
     * ilgili kayıt gösterilecektir.
     */
    public function personel()
    {
        return $this->belongsTo(\App\Models\Personel\Personel::class, 'personel_id', 'id');
    }

    /**
     * Derslik ilişkisi.
     * class_teacher_id üzerinden lesson_classes tablosundaki ilgili kayıt gösterilecektir.
     */
    public function lessonClass()
    {
        return $this->belongsTo(\App\Models\LessonClass\LessonClass::class, 'class_teacher_id', 'id');
    }
}
