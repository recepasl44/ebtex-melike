<?php

namespace App\Models\Questions\Traits;

use App\Models\ExamRelevances\ExamRelevance;
use App\Models\Levels\Level;
use App\Models\PagePositions\PagePosition;
use App\Models\PageTypes\PageType;
use App\Models\Programs\Program;
use App\Models\QuestionCurriculums\QuestionCurriculum;
use App\Models\QuestionDifficults\QuestionDifficult;
use App\Models\QuestionPdfs\QuestionPdf;
use App\Models\QuestionTypes\QuestionType;
use App\Models\Writers\Writer;

/**
 * Class QuestionRelationship
 */
trait QuestionRelationship
{
    public function writer(){
        return $this->belongsTo(Writer::class);
    }
    public function program(){
        return $this->belongsTo(Program::class);
    }
    public function level(){
        return $this->belongsTo(Level::class);
    }
    public function question_type(){
        return $this->belongsTo(QuestionType::class);
    }
//    public function question_category(){
//        return $this->belongsTo(QuestionCategory::class);
//    }
    public function question_difficulty(){
        return $this->belongsTo(QuestionDifficult::class, 'question_difficulty_id');
    }
    public function page_type(){
        return $this->belongsTo(PageType::class);
    }
    public function page_position(){
        return $this->belongsTo(PagePosition::class);
    }
    public function relevance(){
        return $this->belongsTo(ExamRelevance::class, 'relevance_id');
    }
    public function pdf(){
        return $this->belongsTo(QuestionPdf::class);
    }

    public function question_curriculums(){
        return $this->hasMany(QuestionCurriculum::class);
    }







}
