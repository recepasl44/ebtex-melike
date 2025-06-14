<?php

namespace App\Repositories\Backend\OpticalForms;

use DB;
use Carbon\Carbon;
use App\Models\OpticalForms\OpticalForm;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class OpticalFormRepository.
 */
class OpticalFormRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = OpticalForm::class;

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
                config('module.opticalforms.table').'.id',
                config('module.opticalforms.table').'.branche_id',
                config('module.opticalforms.table').'.quiz_type_id',
                config('module.opticalforms.table').'.name',

                config('module.opticalforms.table').'.created_at',
                config('module.opticalforms.table').'.updated_at',
            ]);

        if(request()->has('branche_id') && !empty(request()->get('branche_id'))){
            $data = $data->where('branche_id', request()->get('branche_id'));
        }
        if(request()->has('quiz_type_id') && !empty(request()->get('quiz_type_id'))){
            $data = $data->where('quiz_type_id', request()->get('quiz_type_id'));
        }
        if(request()->has('name') && !empty(request()->get('name'))){
            $data = $data->where('name', 'like', '%'.request()->get('name').'%');
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
        if (OpticalForm::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.opticalforms.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param OpticalForm $opticalform
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(OpticalForm $opticalform, array $input)
    {
    	if ($opticalform->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.opticalforms.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param OpticalForm $opticalform
     * @throws GeneralException
     * @return bool
     */
    public function delete(OpticalForm $opticalform)
    {
        if ($opticalform->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.opticalforms.delete_error'));
    }
}
