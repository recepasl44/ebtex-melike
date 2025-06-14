<?php

namespace App\Repositories\Backend\EventTypes;

use DB;
use Carbon\Carbon;
use App\Models\EventTypes\EventType;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class EventTypeRepository.
 */
class EventTypeRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = EventType::class;

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
                config('module.eventtypes.table').'.id',
                config('module.eventtypes.table').'.name',
				
                config('module.eventtypes.table').'.created_at',
                config('module.eventtypes.table').'.updated_at',
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
        if (EventType::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.eventtypes.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param EventType $eventtype
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(EventType $eventtype, array $input)
    {
    	if ($eventtype->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.eventtypes.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param EventType $eventtype
     * @throws GeneralException
     * @return bool
     */
    public function delete(EventType $eventtype)
    {
        if ($eventtype->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.eventtypes.delete_error'));
    }
}
