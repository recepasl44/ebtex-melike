<?php

namespace App\Models\Quizzes\Traits;

use App\Models\Branches\Branche;
use App\Models\Levels\Level;
use App\Models\Periods\Period;
use App\Models\PointTypes\PointType;
use App\Models\QuestionTypes\QuestionType;
use App\Models\QuizResults\QuizResult;
use App\Models\QuizTypes\QuizType;
use App\Models\Quizzes\Quiz;
use App\Models\Sources\Source;
use App\Models\SourceTypes\SourceType;
use App\Models\Platforms\Platform;
use App\Models\Students\Student;

/**
 * Class QuizRelationship
 */
trait QuizRelationship
{
    public function level(){
        return $this->belongsTo(Level::class);
    }
    public function period(){
        return $this->belongsTo(Period::class);
    }

    public function question_type(){
        return $this->belongsTo(QuestionType::class);
    }
    public function source_type(){
        return $this->belongsTo(SourceType::class);
    }
    public function quiz_type(){
        return $this->belongsTo(QuizType::class);
    }
    public function point_type(){
        return $this->belongsTo(PointType::class);
    }
    public function branche(){
        return $this->belongsTo(Branche::class);
    }
    public function quiz(){
        return $this->belongsTo(Quiz::class);
    }
    public function source(){
        return $this->belongsTo(Source::class);
    }
    public function students(){
        return $this->belongsToMany(Student::class, 'quizstudents')->withPivot('booklet_id');
    }
    public function quizzes(){
        return $this->hasMany(Quiz::class, 'parent_id');
    }
    public function parent(){
        return $this->belongsTo(Quiz::class, 'parent_id');
    }
    public function results(){
        return $this->hasMany(QuizResult::class);
    }
    public function platform(){
        return $this->belongsTo(Platform::class, 'platform_id');
    }

}
