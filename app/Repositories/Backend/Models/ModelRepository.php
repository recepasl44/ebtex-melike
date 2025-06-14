<?php

namespace App\Repositories\Backend\Models;

use DB;
use Carbon\Carbon;
use App\Models\Models\Model;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model as EloquentModel;

/**
 * Class ModelRepository.
 */
class ModelRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = Model::class;

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
                config('module.models.table').'.id',
                config('module.models.table').'.name',
				
                config('module.models.table').'.created_at',
                config('module.models.table').'.updated_at',
            ]);
            
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
        if (Model::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.models.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param Model $model
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(Model $model, array $input)
    {
    	if ($model->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.models.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param Model $model
     * @throws GeneralException
     * @return bool
     */
    public function delete(Model $model)
    {
        if ($model->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.models.delete_error'));
    }
}
