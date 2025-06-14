<?php

namespace App\Http\Resources;

use App\Http\Resources\MainResources;
use App\Models\Core\Platform;
use App\Models\QuizResults\QuizResult;
use App\Models\Quizzes\Quiz;
use Illuminate\Support\Facades\DB;
use App\Platform\Platform as P;

class QuizResource extends MainResources
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     *
     * @return array
     */
    private $results;


    public function fields($request)
    {
        $mainQuiz = $this;

        $lessonStats = [];
        $class_average_nets =[];

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
        $platform = Platform::find(P::id());
        return [
            'id' => $this->id,
            'is_parent' => $this->is_parent,
            'quiz_type_id' => $this->quiz_type_id,
            'quiz_type' => $this->quiz_type ? new QuizTypeResource($this->quiz_type) : null,
            'quiz_no' => $this->quiz_no,
            'short_name' => $this->short_name,
            'quiz_name' => $this->name,
            'quiz_id' => $this->quiz_id,
            'quiz' => $this->quiz,
            'platform' =>  [
                'id' => optional($platform)->id,
                'name' => optional($platform)->name,
                'country' => "Turkey",
                'city' => "İstanbul",
                'county' => "Pendik",
            ],
            'student' => $this->student,
            'quizzes' => $this->whenLoaded('quizzes', function () {
                return $this->quizzes->map(function ($quiz) {
                    return [
                        'id' => $quiz->id,
                        'quiz_name' => $quiz->name,
                    ];
                });
            }),
            'quiz_date' => $this->quiz_date,
            'quiz_end_date' => $this->quiz_end_date,
            "results" => $lessonStats,
            'branche_id' => $this->branche_id,
            'branche' => $this->branche ? new BrancheResource($this->branche) : null,

            'question_type_id' => $this->question_type_id,
            'question_type' => $this->question_type,
            'quiz_category_id' => $this->quiz_category_id,
            'quiz_category' => $this->quiz_category ? new QuizCategoryResource($this->quiz_category) : null,
            'point_type_id' => $this->point_type_id,
            'point_type' => $this->point_type ? new PointTypeResource($this->point_type) : null,
//                'optical_form_id' => $this->optical_form_id,
//                'optical_form' => $this->optical_form ? new OpticalFormResource($this->optical_form) : null,
            'period_id' => $this->period_id,
            'period' => $this->period,
            'level_id' => $this->level_id,
            'level' => $this->level ? new LevelResource($this->level) : null,
            'wrong_right' => $this->wrong_right,
            'topic_achievement' => $this->topic_achievement,
            'total_questions' => $this->total_questions,
            'is_print' => $this->is_print,
            'source_id' => $this->source_id,
            'source' => $this->source,
            'source_type_id' => $this->source_type_id,
            'source_type' => $this->source_type,
            'result_publish_datetime' => $this->result_publish_datetime,
            'participants' => $this->participants,
            'is_repeat' => !empty($this->repeat_reason),
            'repeat_reason' => $this->repeat_reason,
            'status' => $this->status,
        ];
    }
}
