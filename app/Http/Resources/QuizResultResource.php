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

class QuizResultResource extends MainResources
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


        foreach ($mainQuiz->quizzes as $quiz) {
            $results =   $quiz->results;

            $generalNetRaw = DB::table('quizresults')
                ->select(
                    'quiz_id',
                    'lesson_id',
                    DB::raw('AVG(nets) as average_net')
                )
                ->groupBy('quiz_id', 'lesson_id')
                ->get();

            $branchAverageNetsRaw = DB::table('quizresults')
                ->select(
                    'quiz_id',
                    'lesson_id',
                    'branche_id',
                    DB::raw('AVG(nets) as average_net')
                )
                ->groupBy('quiz_id', 'lesson_id', 'branche_id')
                ->get();

            $classAverageNetRaw = DB::table('quizresults')
                ->select(
                    'quiz_id',
                    'lesson_id',
                    'level_id',
                    DB::raw('AVG(nets) as average_net')
                )
                ->groupBy('quiz_id', 'lesson_id', 'level_id')
                ->get();


            $branchAverageNets = $branchAverageNetsRaw
                // Önce quiz_id’ye göre grupla
                ->groupBy('quiz_id')
                ->map(function($quizGroup){
                    // Her quiz_id grubu içindeki satırları lesson_id’ye göre grupla
                    return $quizGroup
                        ->groupBy('lesson_id')
                        ->map(function($lessonGroup){
                            // Her lesson_id grubu içindeki satırları branche_id => ortalama_net şeklinde
                            return $lessonGroup
                                ->pluck('average_net', 'branche_id')
                                // İstersen yuvarla
                                ->map(fn($v) => round($v, 2))
                                ->toArray();
                        })
                        ->toArray();
                })
                ->toArray();

            $generalNets = $generalNetRaw
                ->groupBy('quiz_id')
                ->map(function ($quizGroup) {
                    return $quizGroup->pluck('average_net', 'lesson_id')
                        ->map(fn($v) => round($v, 2))
                        ->toArray();
                })
                ->toArray();

            $classAverageNets = [];

            $classAverageNetRaw->map(function ($row) use (&$data) {
                $classAverageNets[$row->quiz_id][$row->lesson_id][$row->level_id] = round($row->average_net, 2);
            });

            foreach ($results as $result) {
                $class_average_net = $classAverageNets[$quiz->id][$result->lesson_id][$result->level_id] ?? $result->nets;
                $levelId = $this->level_id;
                $branchId = $this->branche_id;
                // Class stats
                $lessonStats[$quiz->id]['quiz_id'] = $quiz->id;
                $lessonStats[$quiz->id]['quiz_name'] = $quiz->name;
                $lessonStats[$quiz->id]['lessons'][] = [
                    "lesson_id" => $result->lesson_id,
                    "lesson_name" => $result->lesson?->name,
                    "questions" => $result->questions,
                    "corrects" => $result->corrects,
                    "wrongs" => $result->wrongs,
                    "blanks" => $result->blanks,
                    "nets" => $result->nets,
                    "class_average_net" => $class_average_net,
                    "class_net_comparison" => $class_average_net > $result->nets ? "down" : ($class_average_net == $result->nets ? "same" : "up"),
                    "branch_net" => $branchAverageNets[$quiz->id][$result->lesson_id][$result->branche_id] ?? $result->nets,
                    "general_net" => $generalNets[$quiz->id][$result->lesson_id] ?? $result->nets,

                ];

            }

        }
        $generalRank = $levelRank = $brancheRank = $cityRank = $countryRank = 0;
        $generalParticipantCount = $levelParticipantCount = $brancheParticipantCount = $cityParticipantCount = $countryParticipantCount = 0;
        $points = Point::where('student_id', $this->student_id)->whereIn('quiz_id', $quizIds)->get();
        foreach ($points as $point) {
            // Genel sıralama
            $generalRank = DB::table('points')
                    ->where('quiz_id', $point->quiz_id)
                    ->where('point', '>', $point->point)
                    ->count() + 1;

            // Level bazlı sıralama
            $levelRank = DB::table('points')
                    ->join('students', 'students.id', '=', 'points.student_id')
                    ->where('quiz_id', $point->quiz_id)
                    ->where('students.level_id', $this->student->level_id)
                    ->where('point', '>', $point->point)
                    ->count() + 1;

            // Branş bazlı sıralama
            $brancheRank = DB::table('points')
                    ->join('students', 'students.id', '=', 'points.student_id')
                    ->where('quiz_id', $point->quiz_id)
                    ->where('students.branche_id', $this->student->branche_id)
                    ->where('point', '>', $point->point)
                    ->count() + 1;

            // Şehir bazlı sıralama
            $cityRank = DB::table('points')
                    ->join('students', 'students.id', '=', 'points.student_id')
                    ->where('quiz_id', $point->quiz_id)
                    ->where('students.city_id', $this->student->city_id)
                    ->where('point', '>', $point->point)
                    ->count() + 1;

            // Ülke bazlı sıralama
            $countryRank = DB::table('points')
                    ->join('students', 'students.id', '=', 'points.student_id')
                    ->where('quiz_id', $point->quiz_id)
                    ->where('students.country_id', $this->student->country_id)
                    ->where('point', '>', $point->point)
                    ->count() + 1;


            // Level'a göre katılım sayısı
            $levelParticipantCount = DB::table('quizstudents')
                ->join('students', 'students.id', '=', 'quizstudents.student_id')
                ->where('quizstudents.quiz_id', $point->quiz_id)
                ->where('students.level_id', $this->student->level_id)
                ->distinct('quizstudents.student_id')
                ->count('quizstudents.student_id');

            // Branş'a göre katılım sayısı
            $brancheParticipantCount = DB::table('quizstudents')
                ->join('students', 'students.id', '=', 'quizstudents.student_id')
                ->where('quizstudents.quiz_id', $point->quiz_id)
                ->where('students.branche_id', $this->student->branche_id)
                ->distinct('quizstudents.student_id')
                ->count('quizstudents.student_id');

            // Şehir'e göre katılım sayısı
            $cityParticipantCount = DB::table('quizstudents')
                ->join('students', 'students.id', '=', 'quizstudents.student_id')
                ->where('quizstudents.quiz_id', $point->quiz_id)
                ->where('students.city_id', $this->student->city_id)
                ->distinct('quizstudents.student_id')
                ->count('quizstudents.student_id');

            // Ülke'ye göre katılım sayısı
            $countryParticipantCount = DB::table('quizstudents')
                ->join('students', 'students.id', '=', 'quizstudents.student_id')
                ->where('quizstudents.quiz_id', $point->quiz_id)
                ->where('students.country_id', $this->student->country_id)
                ->distinct('quizstudents.student_id')
                ->count('quizstudents.student_id');

            // Genel katılım sayısı
            $generalParticipantCount = DB::table('quizstudents')
                ->where('quiz_id', $point->quiz_id)
                ->distinct('student_id')
                ->count('student_id');

            $pointStats[$point->quiz_id]['point_type_id'] = $point->point_type_id;
            $pointStats[$point->quiz_id]['point_type_name'] = $point->pointtype?->name;
            $pointStats[$point->quiz_id]['point'] = $point->point;
            $pointStats[$point->quiz_id]['success_ordered'] = [
                'class' => $levelRank,
                'branche' => $brancheRank,
                'city' => $cityRank,
                'country' => $countryRank,
                'general' => $generalRank,
            ];
            $pointStats[$point->quiz_id]['joined_number'] = [
                'class' => $levelParticipantCount,
                'branche' => $brancheParticipantCount,
                'city' => $cityParticipantCount,
                'country' => $countryParticipantCount,
                'general' => $generalParticipantCount,
            ];
        }


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
            'student' => $this->student ? new StudentResource($this->student) : null,
            'quizzes' => $mainQuiz->quizzes->map(function ($quiz) {
                $quiz_student = QuizStudent::where('quiz_id', $quiz->id)->where('student_id', $this->student_id)->first();
                return [
                    'id' => $quiz->id,
                    'quiz_name' => $quiz->name,
                    'booklet_type_id' => $quiz_student?->booklet_type_id,
                    'booklet_id' => $quiz_student?->booklet_id,
                ];
            }),
            'booklets' => $mainQuiz->quizzes->map(function ($quiz) {
                $quiz_student = QuizStudent::where('quiz_id', $quiz->id)->where('student_id', $this->student_id)->first();
                return [
                    'booklet_type_id' => $quiz_student?->booklet_type_id,
                    'booklet_type' => $quiz_student?->booklet_type_id ? BookletType::find($quiz_student->booklet_type_id) : null,
                    'booklet_id' => $quiz_student?->booklet_id,
                    'booklet' => $quiz_student?->booklet_id ? Booklet::find($quiz_student->booklet_id) : null ,
                ];
            }),
            'quiz_date' => $mainQuiz->quiz_date,
            "results" => $lessonStats,
            "points" => $pointStats,
            "global_joined_number" => $pointStats[$mainQuiz->id]['joined_number'],
            "global_success_ordered" => $pointStats[$mainQuiz->id]['success_ordered'],
            "graphic_data" => [
                [
                  "lesson_id" => 7,
                  "lesson_name" => "Türkçe",
                  "total_students" => 30,
                  "average_score" => 25.4,
                  "top_score" => 44,
                ],
                [
                  "lesson_id" => 8,
                  "lesson_name" => "Matematik",
                  "total_students" => 28,
                  "average_score" => 18.7,
                  "top_score" => 34,
                ],
                [
                  "lesson_id" =>9,
                  "lesson_name" => "Sosyal Bilgiler",
                  "total_students" => 25,
                  "average_score" => 20.1,
                  "top_score" => 23,
                ]
            ],

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
