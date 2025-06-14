<?php

namespace App\Repositories\Backend\WeightIndices;

use DB;
use Carbon\Carbon;
use App\Models\WeightIndices\WeightIndex;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class WeightIndexRepository.
 */
class WeightIndexRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = WeightIndex::class;

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
                config('module.weightindices.table').'.id',
                config('module.weightindices.table').'.student_id',
				config('module.weightindices.table').'.height',
				config('module.weightindices.table').'.weight',
				config('module.weightindices.table').'.indice',
				
                config('module.weightindices.table').'.created_at',
                config('module.weightindices.table').'.updated_at',
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
        if(empty($input['indice'])){
            $input['indice'] = ($input['weight'] / pow($input['height'], 2)) * 10000;
        }
        if (WeightIndex::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.weightindices.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param WeightIndex $weightindex
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(WeightIndex $weightindex, array $input)
    {
        if(empty($input['indice'])){
            $input['indice'] = ($input['weight'] / pow($input['height'], 2)) * 10000;
        }
    	if ($weightindex->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.weightindices.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param WeightIndex $weightindex
     * @throws GeneralException
     * @return bool
     */
    public function delete(WeightIndex $weightindex)
    {
        if ($weightindex->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.weightindices.delete_error'));
    }
}
