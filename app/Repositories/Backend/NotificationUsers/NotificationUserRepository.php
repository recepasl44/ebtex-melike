<?php

namespace App\Repositories\Backend\NotificationUsers;

use DB;
use Carbon\Carbon;
use App\Models\NotificationUsers\NotificationUser;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class NotificationUserRepository.
 */
class NotificationUserRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = NotificationUser::class;

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
                config('module.notificationusers.table').'.id',
                config('module.notificationusers.table').'.notification_id',
				config('module.notificationusers.table').'.user_id',
				config('module.notificationusers.table').'.read_at',
				
                config('module.notificationusers.table').'.created_at',
                config('module.notificationusers.table').'.updated_at',
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
        if (NotificationUser::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.notificationusers.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param NotificationUser $notificationuser
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(NotificationUser $notificationuser, array $input)
    {
    	if ($notificationuser->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.notificationusers.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param NotificationUser $notificationuser
     * @throws GeneralException
     * @return bool
     */
    public function delete(NotificationUser $notificationuser)
    {
        if ($notificationuser->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.notificationusers.delete_error'));
    }
}
