<?php

namespace App\Repositories\Backend\Notifications;

use DB;
use Carbon\Carbon;
use App\Models\Notifications\Notification;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class NotificationRepository.
 */
class NotificationRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = Notification::class;

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
                config('module.notifications.table').'.id',
                config('module.notifications.table').'.type_id',
				config('module.notifications.table').'.title',
				config('module.notifications.table').'.message',
				config('module.notifications.table').'.category_id',
				config('module.notifications.table').'.source_id',
				config('module.notifications.table').'.sender_id',
				config('module.notifications.table').'.send_time',
				config('module.notifications.table').'.status',
				config('module.notifications.table').'.group_id',
				
                config('module.notifications.table').'.created_at',
                config('module.notifications.table').'.updated_at',
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
        if (Notification::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.notifications.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param Notification $notification
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(Notification $notification, array $input)
    {
    	if ($notification->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.notifications.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param Notification $notification
     * @throws GeneralException
     * @return bool
     */
    public function delete(Notification $notification)
    {
        if ($notification->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.notifications.delete_error'));
    }
}
