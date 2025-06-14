<?php

namespace App\Repositories\Backend\AnnualPlans;

use DB;
use Carbon\Carbon;
use App\Models\AnnualPlans\AnnualPlan;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class AnnualPlanRepository.
 */
class AnnualPlanRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = AnnualPlan::class;

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
                config('module.annualplans.table').'.id',
                config('module.annualplans.table').'.user_id',
				config('module.annualplans.table').'.fromto_date',
				config('module.annualplans.table').'.lesson_id',
				config('module.annualplans.table').'.unit_id',
				config('module.annualplans.table').'.chapter_id',
				config('module.annualplans.table').'.topic_id',
				config('module.annualplans.table').'.achievement_id',
				config('module.annualplans.table').'.source_id',
				config('module.annualplans.table').'.status',
				
                config('module.annualplans.table').'.created_at',
                config('module.annualplans.table').'.updated_at',
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
        if (AnnualPlan::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.annualplans.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param AnnualPlan $annualplan
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(AnnualPlan $annualplan, array $input)
    {
    	if ($annualplan->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.annualplans.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param AnnualPlan $annualplan
     * @throws GeneralException
     * @return bool
     */
    public function delete(AnnualPlan $annualplan)
    {
        if ($annualplan->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.annualplans.delete_error'));
    }
}
