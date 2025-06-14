<?php

namespace App\Models\Books\Traits;

use App\Models\Answers\Answer;
use App\Models\BookPackages\BookPackage;
use App\Models\BookPayments\BookPayment;
use App\Models\BookProductions\BookProduction;
use App\Models\BookQuestions\BookQuestion;
use App\Models\Books\Book;
use App\Models\ClassRooms\ClassRoom;
use App\Models\ExamRelevances\ExamRelevance;
use App\Models\Groups\Group;
use App\Models\Institutions\Institution;
use App\Models\InstitutionTypes\InstitutionType;
use App\Models\Levels\Level;
use App\Models\Payments\Payment;
use App\Models\Periods\Period;
use App\Models\Programs\Program;
use App\Models\Questions\Question;
use App\Models\Quizzes\Quiz;
use App\Models\Students\Student;

/**
 * Class BookRelationship
 */
trait BookRelationship
{
    public function institution_type(){
        return $this->belongsTo(InstitutionType::class);
    }
    public function institution(){
        return $this->belongsTo(Institution::class,);
    }
    public function institutions(){
        return $this->hasMany(Institution::class, 'institution_id');
    }
    public function book_package(){
        return $this->belongsTo(BookPackage::class, 'book_package_id');
    }
    public function period(){
        return $this->belongsTo(Period::class, 'period_id');
    }
    public function classroom(){
        return $this->belongsTo(Classroom::class, 'classroom_id');
    }
    public function book_questions(){
        return $this->hasMany(BookQuestion::class, 'book_id');
    }
    public function books(){
        return $this->hasMany(Book::class, 'book_id');
    }
    public function questions(){
        return $this->belongsToMany(Question::class, 'bookquestions', 'book_id', 'question_id', );
    }
    public function program(){
        return $this->belongsTo(Program::class, 'program_id');
    }
    public function level(){
        return $this->belongsTo(Level::class, 'level_id');
    }
    public function relevance(){
        return $this->belongsTo(ExamRelevance::class);
    }
    public function group(){
        return $this->belongsTo(Group::class, 'group_id');
    }

    public function quizzes(){
        return $this->belongsToMany(Quiz::class, 'bookquizzes', 'book_id', 'quiz_id' );
    }
    public function students(){
        return $this->belongsToMany(Student::class, 'bookstudents', 'book_id', 'student_id' );
    }

    public function book_payments(){
        return $this->hasMany(BookPayment::class );
    }
    public function book_productions(){
        return $this->hasMany(BookProduction::class );
    }



}
