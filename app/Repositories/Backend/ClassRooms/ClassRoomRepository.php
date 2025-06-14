<?php

namespace App\Repositories\Backend\ClassRooms;

use DB;
use Carbon\Carbon;
use App\Models\ClassRooms\ClassRoom;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class ClassRoomRepository.
 */
class ClassRoomRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = ClassRoom::class;

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
                config('module.classrooms.table').'.id',
                config('module.classrooms.table').'.name',
				config('module.classrooms.table').'.branche_id',
				config('module.classrooms.table').'.school_id',
				config('module.classrooms.table').'.level_id',
				config('module.classrooms.table').'.quota',
                config('module.classrooms.table').'.created_at',
                config('module.classrooms.table').'.updated_at',
            ]);
        if(request()->has('branche_id') && !empty(request()->get('branche_id'))){
            $data = $data->where('branche_id', request()->get('branche_id'));
        }
        if(request()->has('school_id') && !empty(request()->get('school_id'))){
            $data = $data->where('school_id', request()->get('school_id'));
        }
        if(request()->has('level_id') && !empty(request()->get('level_id'))){
            $data = $data->where('level_id', request()->get('level_id'));
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
        if (ClassRoom::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.classrooms.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param ClassRoom $classroom
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(ClassRoom $classroom, array $input)
    {
    	if ($classroom->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.classrooms.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param ClassRoom $classroom
     * @throws GeneralException
     * @return bool
     */
    public function delete(ClassRoom $classroom)
    {
        if ($classroom->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.classrooms.delete_error'));
    }
}
