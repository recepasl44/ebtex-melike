<?php

namespace App\Repositories\Backend\QuizMatchs;

use DB;
use Carbon\Carbon;
use App\Models\QuizMatchs\QuizMatch;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class QuizMatchRepository.
 */
class QuizMatchRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = QuizMatch::class;

    /**
     * This method is used by Table Controller
     * For getting the table data to show in
     * the grid
     * @return mixed
     */
    public function getForDataTable()
    {
        return $this->query()
            ->select([
                config('module.quizmatches.table').'.id',
                config('module.quizmatches.table').'.quiz_type_id',
				config('module.quizmatches.table').'.quiz_id',
				config('module.quizmatches.table').'.branche_id',
				config('module.quizmatches.table').'.season_id',
				config('module.quizmatches.table').'.classroom_id',
				config('module.quizmatches.table').'.session_id',
				config('module.quizmatches.table').'.program_id',
				config('module.quizmatches.table').'.level_id',
				config('module.quizmatches.table').'.quota',
				config('module.quizmatches.table').'.ordered',

                config('module.quizmatches.table').'.created_at',
                config('module.quizmatches.table').'.updated_at',
            ]);
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
        if(!empty($input['classrooms']) && !empty($input['sessions']) && !empty($input['quotas']) &&  !empty($input['levels'])){
            foreach ($input['classrooms'] as $key => $classroom){
                $qm = new QuizMatch();
                $qm->quiz_type_id = $input['quiz_type_id'] ?? 1;
                $qm->quiz_id = $input['quiz_id'] ?? 1;
                $qm->branche_id = $input['branche_id'] ?? 1;
                $qm->season_id = $input['season_id'] ?? 1;
                $qm->program_id = $input['program_id'] ?? 1;
                $qm->level_id = $input['levels'][$key];
                $qm->classroom_id = $input['classrooms'][$key];
                $qm->session_id = $input['sessions'][$key];
                $qm->quota = $input['quotas'][$key];
                $qm->ordered = $input['ordered'] ?? ($key + 1);

                $qm->save();
                return true;
            }
        }
        throw new GeneralException(trans('exceptions.backend.quizmatches.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param QuizMatch $quizmatch
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(QuizMatch $quizmatch, array $input)
    {
        if(!empty($input['classrooms']) && !empty($input['sessions']) && !empty($input['quotas']) &&  !empty($input['levels'])){
            foreach ($input['classrooms'] as $key => $classroom){
                $qm = $quizmatch;
                $qm->quiz_type_id = $input['quiz_type_id'] ?? $quizmatch->quiz_type_id;
                $qm->quiz_id = $input['quiz_id'] ?? $quizmatch->quiz_id;
                $qm->branche_id = $input['branche_id'] ?? $quizmatch->branche_id;
                $qm->season_id = $input['season_id'] ?? $quizmatch->season_id;
                $qm->program_id = $input['program_id'] ?? $quizmatch->program_id;
                $qm->level_id = $input['levels'][$key] ?? $quizmatch->level_id;
                $qm->classroom_id = $input['classrooms'][$key] ?? $quizmatch->classroom_id;
                $qm->session_id = $input['sessions'][$key] ?? $quizmatch->session_id;
                $qm->quota = $input['quotas'][$key] ?? $quizmatch->quota;
                $qm->ordered = $input['ordered'] ?? ($key + 1);

                $qm->save();
                return true;
            }
        }

        throw new GeneralException(trans('exceptions.backend.quizmatches.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param QuizMatch $quizmatch
     * @throws GeneralException
     * @return bool
     */
    public function delete(QuizMatch $quizmatch)
    {
        if ($quizmatch->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.quizmatches.delete_error'));
    }
}
