<?php

namespace App\Repositories\Backend\Questions;

use DB;
use Carbon\Carbon;
use App\Models\Questions\Question;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class QuestionRepository.
 */
class QuestionRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = Question::class;

    /**
     * This method is used by Table Controller
     * For getting the table data to show in
     * the grid
     * @return mixed
     */
    public function getForDataTable()
    {
        $data = $this->query()
            ->select([
                config('module.questions.table').'.id',
                config('module.questions.table').'.writer_id',
				config('module.questions.table').'.program_id',
				config('module.questions.table').'.level_id',
                config('module.questions.table').'.question_type_id',
				config('module.questions.table').'.question_category_id',
				config('module.questions.table').'.question_difficulty_id',
				config('module.questions.table').'.page_type_id',
				config('module.questions.table').'.page_position_id',
				config('module.questions.table').'.suitability_score',
				config('module.questions.table').'.video_solution_url',
				config('module.questions.table').'.relevance_id',
				config('module.questions.table').'.pdf_id',
				config('module.questions.table').'.page_number',
				config('module.questions.table').'.x',
				config('module.questions.table').'.y',
				config('module.questions.table').'.width',
				config('module.questions.table').'.height',
				config('module.questions.table').'.image_path',

                config('module.questions.table').'.created_at',
                config('module.questions.table').'.updated_at',
            ]);
        if(request()->has('program_id') && !empty(request()->get('program_id'))){
            $data = $data->where('program_id', request()->get('program_id'));
        }
        if(request()->has('level_id') && !empty(request()->get('level_id'))){
            $data = $data->where('level_id', request()->get('level_id'));
        }
        if(request()->has('lesson_id') && !empty(request()->get('lesson_id'))){
            $data = $data->where('lesson_id', request()->get('lesson_id'));
        }
        if(request()->has('unit_id') && !empty(request()->get('unit_id'))){
            $data = $data->where('unit_id', request()->get('unit_id'));
        }
        if(request()->has('chapter_id') && !empty(request()->get('chapter_id'))){
            $data = $data->where('chapter_id', request()->get('chapter_id'));
        }
        if(request()->has('topic_id') && !empty(request()->get('topic_id'))){
            $data = $data->where('topic_id', request()->get('topic_id'));
        }
        if(request()->has('achievement_id') && !empty(request()->get('achievement_id'))){
            $data = $data->where('achievement_id', request()->get('achievement_id'));
        }
        if(request()->has('places_use_id')){
            $data = $data->where('places_use_id', request()->get('places_use_id'));
        }
        if(request()->has('question_category_id')){
            $data = $data->where('question_category_id', request()->get('question_category_id'));
        }
        if(request()->has('difficulty_level_id')){
            $data = $data->where('difficulty_level_id', request()->get('difficulty_level_id'));
        }
        if(request()->has('exam_type_id')){
            $data = $data->where('exam_type_id', request()->get('exam_type_id'));
        }

        return $data;
    }

    /**
     * For Creating the respective model in storage
     *
     * @param array $input
     * @throws GeneralException
     * @return bool
     */
    public function create(array $input)
    {
        if (Question::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.questions.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param Question $question
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(Question $question, array $input)
    {
    	if ($question->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.questions.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param Question $question
     * @throws GeneralException
     * @return bool
     */
    public function delete(Question $question)
    {
        if ($question->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.questions.delete_error'));
    }
}
