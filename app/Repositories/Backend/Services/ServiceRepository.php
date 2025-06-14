<?php

namespace App\Repositories\Backend\Services;

use DB;
use Carbon\Carbon;
use App\Models\Services\Service;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class ServiceRepository.
 */
class ServiceRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = Service::class;

    /**
     * This method is used by Table Controller
     * For getting the table data to show in
     * the grid
     * @return mixed
     */
    public function getForDataTable()
    {
        $now = Carbon::now(); // Şu anki tarih

        $data = $this->query()
            ->select([
                config('module.services.table').'.id',
                config('module.services.table').'.branche_id',
				config('module.services.table').'.level_id',
				config('module.services.table').'.course_id',
				config('module.services.table').'.program_id',
				config('module.services.table').'.type_id',
				config('module.services.table').'.start_installment_date',
				config('module.services.table').'.end_installment_date',
				config('module.services.table').'.name',
				config('module.services.table').'.price',
				config('module.services.table').'.is_main',
				config('module.services.table').'.max_installments',
				config('module.services.table').'.max_discounts',
				config('module.services.table').'.accept_discount',
				config('module.services.table').'.vat_rate',

                config('module.services.table').'.created_at',
                config('module.services.table').'.updated_at',
            ]);
        if(request()->has('branche_id') && !empty(request()->get('branche_id'))){
            $data = $data->where('branche_id', request()->get('branche_id'));
        }
        if(request()->has('level_id') && !empty(request()->get('level_id'))){
            $data = $data->where('level_id', request()->get('level_id'));
        }
        if(request()->has('course_id') && !empty(request()->get('course_id'))){
            $data = $data->where('course_id', request()->get('course_id'));
        }
        if(request()->has('program_id') && !empty(request()->get('program_id'))){
            $data = $data->where('program_id', request()->get('program_id'));
        }
        if(request()->has('type_id') && !empty(request()->get('type_id'))){
            $data = $data->where('type_id', request()->get('type_id'));
        }

        if(request()->has('name') && !empty(request()->get('name'))){
            $data = $data->where('name', 'like', '%'.request()->get('name').'%');
        }
        if(request()->has('start_installment_date') || request()->has('end_installment_date')){
            if(request()->has('start_installment_date') && !empty(request()->get('start_installment_date'))){
                $data = $data->where('start_installment_date', '<=', request()->get('start_installment_date'));
            }
            if(request()->has('end_installment_date') && !empty(request()->get('end_installment_date'))){
                $data = $data->where('end_installment_date', '<=', request()->get('end_installment_date'));
            }
        }else{
            $data = $data->where('start_installment_date', '<=', $now)
                ->where('end_installment_date', '>=', $now);
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
        if (Service::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.services.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param Service $service
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(Service $service, array $input)
    {
    	if ($service->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.services.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param Service $service
     * @throws GeneralException
     * @return bool
     */
    public function delete(Service $service)
    {
        if ($service->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.services.delete_error'));
    }
}
