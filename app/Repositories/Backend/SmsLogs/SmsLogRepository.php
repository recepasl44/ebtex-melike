<?php

namespace App\Repositories\Backend\SmsLogs;

use DB;
use Carbon\Carbon;
use App\Models\SmsLogs\SmsLog;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class SmsLogRepository.
 */
class SmsLogRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = SmsLog::class;

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
                config('module.smslogs.table').'.id',
                config('module.smslogs.table').'.user_id',
				config('module.smslogs.table').'.provider',
				config('module.smslogs.table').'.phone',
				config('module.smslogs.table').'.message',
				config('module.smslogs.table').'.provider',
				config('module.smslogs.table').'.status',
				config('module.smslogs.table').'.response',
				
                config('module.smslogs.table').'.created_at',
                config('module.smslogs.table').'.updated_at',
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
        if (SmsLog::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.smslogs.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param SmsLog $smslog
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(SmsLog $smslog, array $input)
    {
    	if ($smslog->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.smslogs.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param SmsLog $smslog
     * @throws GeneralException
     * @return bool
     */
    public function delete(SmsLog $smslog)
    {
        if ($smslog->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.smslogs.delete_error'));
    }
}
