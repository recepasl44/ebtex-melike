<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;
use App\Models\Booklets\Booklet;
use App\Models\BookletTypes\BookletType;
use App\Models\Core\Platform;
use App\Models\Points\Point;
use App\Models\QuizStudents\QuizStudent;
use App\Platform\Platform as P;
use Illuminate\Support\Facades\DB;

class QuizResultOrderedResource extends MainResources
{

    function getAllQuizIds($quiz)
    {
        $ids = [$quiz->id];

        foreach ($quiz->quizzes as $subquiz) {
            $ids = array_merge($ids, $this->getAllQuizIds($subquiz));
        }

        return $ids;
    }

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     *
     * @return array
     */
    public function fields($request)
    {
        $mainQuiz = $this->quiz;
        if($mainQuiz->parent){
            $mainQuiz = $mainQuiz->parent;
        }

        $quizIds = $this->getAllQuizIds($mainQuiz);

        $lessonStats = [];
        $pointStats = [];
        $avgStats = [];


        $results =   DB::table('quizresults')->where('quiz_id', $this->quiz_id)->get();
        // $quiz = $this->quiz;

        // $generalNetRaw = DB::table('quizresults')
        //     ->select(
        //         'quiz_id',
        //         'lesson_id',
        //         DB::raw('AVG(nets) as average_net')
        //     )
        //     ->groupBy('quiz_id', 'lesson_id')
        //     ->get();

        // $branchAverageNetsRaw = DB::table('quizresults')
        //     ->select(
        //         'quiz_id',
        //         'lesson_id',
        //         'branche_id',
        //         DB::raw('AVG(nets) as average_net')
        //     )
        //     ->groupBy('quiz_id', 'lesson_id', 'branche_id')
        //     ->get();

        // $classAverageNetRaw = DB::table('quizresults')
        //     ->select(
        //         'quiz_id',
        //         'lesson_id',
        //         'level_id',
        //         DB::raw('AVG(nets) as average_net')
        //     )
        //     ->groupBy('quiz_id', 'lesson_id', 'level_id')
        //     ->get();


        // $branchAverageNets = $branchAverageNetsRaw
        //     // Önce quiz_id’ye göre grupla
        //     ->groupBy('quiz_id')
        //     ->map(function($quizGroup){
        //         // Her quiz_id grubu içindeki satırları lesson_id’ye göre grupla
        //         return $quizGroup
        //             ->groupBy('lesson_id')
        //             ->map(function($lessonGroup){
        //                 // Her lesson_id grubu içindeki satırları branche_id => ortalama_net şeklinde
        //                 return $lessonGroup
        //                     ->pluck('average_net', 'branche_id')
        //                     // İstersen yuvarla
        //                     ->map(fn($v) => round($v, 2))
        //                     ->toArray();
        //             })
        //             ->toArray();
        //     })
        //     ->toArray();

        // $generalNets = $generalNetRaw
        //     ->groupBy('quiz_id')
        //     ->map(function ($quizGroup) {
        //         return $quizGroup->pluck('average_net', 'lesson_id')
        //             ->map(fn($v) => round($v, 2))
        //             ->toArray();
        //     })
        //     ->toArray();

        // $classAverageNets = [];

        // $classAverageNetRaw->map(function ($row) use (&$data) {
        //     $classAverageNets[$row->quiz_id][$row->lesson_id][$row->level_id] = round($row->average_net, 2);
        // });


        $avgs = DB::table('quizresults')->where('quiz_id', $this->quiz_id)
            ->selectRaw('
                                lesson_id,
                                AVG(questions) as t,
                                AVG(corrects) as d,
                                AVG(wrongs) as y,
                                AVG(blanks) as b,
                                AVG(nets) as n
                            ')->groupBy('lesson_id')
            ->get()->keyBy('lesson_id');

        foreach ($results as $r => $result) {
            // $class_average_net = $classAverageNets[$quiz->id][$result->lesson_id][$result->level_id] ?? $result->nets;
            $levelId = $this->level_id;
            $branchId = $this->branche_id;
            // Class stats

            $lesson = \App\Models\Lessons\Lesson::find($result->lesson_id);
            $student = \App\Models\Students\Student::find($result->student_id);
            if(!empty($lesson) && !empty($lesson->area_id)){
                $studentId = $student->id;
                $areaId = $lesson->area_id;

                // Öğrenci temel bilgileri
                $lessonStats['students'][$studentId]['id'] = $studentId;
                $lessonStats['students'][$studentId]['first_name'] = $student->first_name;
                $lessonStats['students'][$studentId]['last_name'] = $student->last_name;
                $lessonStats['students'][$studentId]['program_id'] = $student->program_id;
                $lessonStats['students'][$studentId]['level_id'] = $student->program_id;
                $lessonStats['students'][$studentId]['ordered'] = ($r + 1);

                // test_booklet'leri associative array olarak tanımlıyoruz (area_id ile indeksli)
                if (!isset($lessonStats['students'][$studentId]['test_booklet'][$areaId])) {

                    $lessonStats['students'][$studentId]['test_booklet'][$areaId] = [
                        'id' => $areaId,
                        'name' => $lesson?->area?->name,
                        'lessons' => []
                    ];
                }

                // Derse ait cevap bilgileri
                $lessonStats['students'][$studentId]['test_booklet'][$areaId]['lessons'][] = [
                    'id' => $result->lesson_id,
                    'name' => $lesson?->name,
                    'answer' => [
                        'T' => $result->questions,
                        'D' => $result->corrects,
                        'Y' => $result->wrongs,
                        'B' => $result->blanks,
                        'N' => $result->nets,
                    ]
                ];



                // test_booklet'leri associative array olarak tanımlıyoruz (area_id ile indeksli)
                if (!isset($avgStats['test_booklet'][$areaId])) {

                    $avgStats['test_booklet'][$areaId] = [
                        'id' => $areaId,
                        'name' => $lesson?->area?->name,
                        'lessons' => []
                    ];
                }
                // Derse ait cevap bilgileri
                $avgStats['test_booklet'][$areaId]['lessons'][] = [
                    'id' => $result->lesson_id,
                    'name' => $lesson?->name,
                    'answer' => [
                        'T' => $avgs[1]->t ?? null,
                        'D' => $avgs[1]->d ?? null,
                        'Y' => $avgs[1]->y ?? null,
                        'B' => $avgs[1]->b ?? null,
                        'N' => $avgs[1]->n ?? null,
                    ]
                ];



                $total = DB::table('quizresults')->where('student_id', $studentId)->where('quiz_id', $result->quiz_id)
                    ->selectRaw('
                                SUM(questions) as t,
                                SUM(corrects) as d,
                                SUM(wrongs) as y,
                                SUM(blanks) as b,
                                SUM(nets) as n
                            ')
                    ->first();


                $generalRank = $levelRank = $brancheRank = $cityRank = $countryRank = 0;
                $generalParticipantCount = $levelParticipantCount = $brancheParticipantCount = $cityParticipantCount = $countryParticipantCount = 0;



                // Level'a göre katılım sayısı
                $levelParticipantCount = DB::table('quizstudents')
                    ->join('students', 'students.id', '=', 'quizstudents.student_id')
                    ->where('quizstudents.quiz_id', $result->quiz_id)
                    ->where('students.level_id', $student->level_id)
                    ->distinct('quizstudents.student_id')
                    ->count('quizstudents.student_id');

                // Branş'a göre katılım sayısı
                $brancheParticipantCount = DB::table('quizstudents')
                    ->join('students', 'students.id', '=', 'quizstudents.student_id')
                    ->where('quizstudents.quiz_id', $result->quiz_id)
                    ->where('students.branche_id', $student->branche_id)
                    ->distinct('quizstudents.student_id')
                    ->count('quizstudents.student_id');

                // Şehir'e göre katılım sayısı
                $cityParticipantCount = DB::table('quizstudents')
                    ->join('addresses', 'addresses.addressable_id', '=', 'quizstudents.student_id')
                    ->where('quizstudents.quiz_id', $result->quiz_id)
                    ->where('addresses.city_id', $student->address?->city_id)
                    ->distinct('quizstudents.student_id')
                    ->count('quizstudents.student_id');

                // Ülke'ye göre katılım sayısı
                $countryParticipantCount = DB::table('quizstudents')
                    ->join('addresses', 'addresses.addressable_id', '=', 'quizstudents.student_id')
                    ->where('quizstudents.quiz_id', $result->quiz_id)
                    ->where('addresses.country_id', $student->address?->country_id)
                    ->distinct('quizstudents.student_id')
                    ->count('quizstudents.student_id');

                // Genel katılım sayısı
                $generalParticipantCount = DB::table('quizstudents')
                    ->where('quiz_id', $result->quiz_id)
                    ->distinct('student_id')
                    ->count('student_id');



                $points = DB::table('points')->where('student_id', $studentId)->where('quiz_id', $result->quiz_id)->first();

                // Genel sıralama
                $generalRank = DB::table('points')
                        ->where('quiz_id', $result->quiz_id)
                        ->where('point', '>', $points->point)
                        ->count() + 1;

                // Level bazlı sıralama
                $levelRank = DB::table('points')
                        ->join('students', 'students.id', '=', 'points.student_id')
                        ->where('quiz_id', $result->quiz_id)
                        ->where('students.level_id', $student->level_id)
                        ->where('point', '>', $points->point)
                        ->count() + 1;

                // Branş bazlı sıralama
                $brancheRank = DB::table('points')
                        ->join('students', 'students.id', '=', 'points.student_id')
                        ->where('quiz_id', $result->quiz_id)
                        ->where('students.branche_id', $student->branche_id)
                        ->where('point', '>', $points->point)
                        ->count() + 1;

                // Şehir bazlı sıralama
                $cityRank = DB::table('points')
                        ->join('addresses', 'addresses.addressable_id', '=', 'points.student_id')
                        ->where('quiz_id', $result->quiz_id)
                        ->where('addresses.city_id', $student->city_id)
                        ->where('point', '>', $points->point)
                        ->count() + 1;

                // Ülke bazlı sıralama
                $countryRank = DB::table('points')
                        ->join('addresses', 'addresses.addressable_id', '=', 'points.student_id')
                        ->where('quiz_id', $result->quiz_id)
                        ->where('addresses.country_id', $student->country_id)
                        ->where('point', '>', $points->point)
                        ->count() + 1;

                $rank = DB::table('points')
                    ->selectRaw('
                                student_id,
                                point,
                                (
                                    SELECT COUNT(*) + 1
                                    FROM points AS p2
                                    WHERE p2.point > points.point && quiz_id = '.$result->quiz_id.'
                                ) AS rank
                            ')
                    ->where('student_id', $studentId)
                    ->where('quiz_id', $result->quiz_id)
                    ->first();



                $lessonStats['students'][$studentId]['quiz_result'] = [
                    'total' => [
                        'T' => $total->t,
                        'D' => $total->d,
                        'Y' => $total->y,
                        'B' => $total->b,
                        'N' => $total->n,
                    ],
                    'puan' => $points->point ?? 0,
                    'general' => $rank->rank ?? 0,
                    'course_result' => [
                        'course_id' => $result->quiz_id,
                        'course' => $this?->quiz->name,
                        'point' => $points->point ?? 0,
                        'general' => $rank->rank ?? 0,
                    ],
                    'course_ordered' => [
                        "course" => $this->quiz->name,
                        "class" => $levelRank,
                        "branch" => $brancheRank,
                        "county" => $countryRank,
                        "city" => $cityRank,
                        "general" => $generalRank,
                    ],
                    'ordered' => [
                        "course" => $this->quiz->name,
                        "class" => $levelParticipantCount,
                        "branch" => $brancheParticipantCount,
                        "county" => $countryParticipantCount,
                        "city" => $cityParticipantCount,
                        "general" => $generalParticipantCount,
                    ],
                ];



            }


        }




        //     $pointStats[$point->quiz_id]['point_type_id'] = $point->point_type_id;
        //     $pointStats[$point->quiz_id]['point_type_name'] = $point->pointtype?->name;
        //     $pointStats[$point->quiz_id]['point'] = $point->point;
        //     $pointStats[$point->quiz_id]['success_ordered'] = [
        //         'class' => $levelRank,
        //         'branche' => $brancheRank,
        //         'city' => $cityRank,
        //         'country' => $countryRank,
        //         'general' => $generalRank,
        //     ];
        //     $pointStats[$point->quiz_id]['joined_number'] = [
        //         'class' => $levelParticipantCount,
        //         'branche' => $brancheParticipantCount,
        //         'city' => $cityParticipantCount,
        //         'country' => $countryParticipantCount,
        //         'general' => $generalParticipantCount,
        //     ];
        // }


        $platform = Platform::find(P::id());
        return [
            'id' => $mainQuiz->id,
            'is_parent' => $mainQuiz->is_parent,
            'quiz_type_id' => $mainQuiz->quiz_type_id,
            'quiz_type' => $mainQuiz->quiz_type ? new QuizTypeResource($mainQuiz->quiz_type) : null,
            'quiz_no' => $mainQuiz->quiz_no,
            'short_name' => $mainQuiz->short_name,
            'quiz_name' => $mainQuiz->name,
            'quiz_id' => $this->quiz_id,
            'quiz' => $mainQuiz->quiz,
            'platform' =>  [
                'id' => optional($platform)->id,
                'name' => optional($platform)->name,
                'country' => "Turkey",
                'city' => "İstanbul",
                'county' => "Pendik",
            ],
            "joined_number" => $pointStats[$this->quiz_id]['joined_number'] ?? null,
            'quiz_date' => $mainQuiz->quiz_date,

            "results" => $lessonStats,
            "general_avarage" => $avgStats,
            "branch_avarage" => $avgStats,
            "points" => $pointStats,

            'branche_id' => $mainQuiz->branche_id,
            'branche' => $mainQuiz->branche ? new BrancheResource($mainQuiz->branche) : null,

            'question_type_id' => $mainQuiz->question_type_id,
            'question_type' => $mainQuiz->question_type,
            'quiz_category_id' => $mainQuiz->quiz_category_id,
            'quiz_category' => $mainQuiz->quiz_category ? new QuizCategoryResource($this->quiz_category) : null,
            'point_type_id' => $mainQuiz->point_type_id,
            'point_type' => $mainQuiz->point_type ? new PointTypeResource($this->point_type) : null,
//                'optical_form_id' => $this->optical_form_id,
//                'optical_form' => $this->optical_form ? new OpticalFormResource($this->optical_form) : null,
            'period_id' => $mainQuiz->period_id,
            'period' => $mainQuiz->period,
            'level_id' => $mainQuiz->level_id,
            'level' => $mainQuiz->level ? new LevelResource($this->level) : null,
            'wrong_right' => $mainQuiz->wrong_right,
            'topic_achievement' => $mainQuiz->topic_achievement,
            'total_questions' => $mainQuiz->total_questions,
            'is_print' => $mainQuiz->is_print,
            'source_id' => $mainQuiz->source_id,
            'source' => $mainQuiz->source,
            'source_type_id' => $mainQuiz->source_type_id,
            'source_type' => $mainQuiz->source_type,
            'result_publish_datetime' => $mainQuiz->result_publish_datetime,
            'participants' => $mainQuiz->participants,
            'is_repeat' => !empty($mainQuiz->repeat_reason),
            'repeat_reason' => $mainQuiz->repeat_reason,
            'status' => $mainQuiz->status,
        ];
    }
}
