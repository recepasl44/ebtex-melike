<?php

namespace App\Repositories\Backend\SmsProviders;

use DB;
use Carbon\Carbon;
use App\Models\SmsProviders\SmsProvider;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class SmsProviderRepository.
 */
class SmsProviderRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = SmsProvider::class;

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
                config('module.smsproviders.table').'.id',
                config('module.smsproviders.table').'.user_id',
				config('module.smsproviders.table').'.provider',
				config('module.smsproviders.table').'.username',
				config('module.smsproviders.table').'.password',
				config('module.smsproviders.table').'.api_key',
				config('module.smsproviders.table').'.api_secret',
				config('module.smsproviders.table').'.origin',
				
                config('module.smsproviders.table').'.created_at',
                config('module.smsproviders.table').'.updated_at',
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
        if (SmsProvider::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.smsproviders.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param SmsProvider $smsprovider
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(SmsProvider $smsprovider, array $input)
    {
    	if ($smsprovider->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.smsproviders.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param SmsProvider $smsprovider
     * @throws GeneralException
     * @return bool
     */
    public function delete(SmsProvider $smsprovider)
    {
        if ($smsprovider->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.smsproviders.delete_error'));
    }
}
