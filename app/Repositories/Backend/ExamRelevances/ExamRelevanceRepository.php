<?php

namespace App\Repositories\Backend\ExamRelevances;

use DB;
use Carbon\Carbon;
use App\Models\ExamRelevances\ExamRelevance;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class ExamRelevanceRepository.
 */
class ExamRelevanceRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = ExamRelevance::class;

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
                config('module.examrelevances.table').'.id',
                config('module.examrelevances.table').'.name',
				
                config('module.examrelevances.table').'.created_at',
                config('module.examrelevances.table').'.updated_at',
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
        if (ExamRelevance::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.examrelevances.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param ExamRelevance $examrelevance
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(ExamRelevance $examrelevance, array $input)
    {
    	if ($examrelevance->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.examrelevances.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param ExamRelevance $examrelevance
     * @throws GeneralException
     * @return bool
     */
    public function delete(ExamRelevance $examrelevance)
    {
        if ($examrelevance->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.examrelevances.delete_error'));
    }
}
