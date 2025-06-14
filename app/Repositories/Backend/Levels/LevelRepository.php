<?php

namespace App\Repositories\Backend\Levels;

use DB;
use Carbon\Carbon;
use App\Models\Levels\Level;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class LevelRepository.
 */
class LevelRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = Level::class;

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
                config('module.levels.table').'.id',
                config('module.levels.table').'.program_id',
				config('module.levels.table').'.name',
				
                config('module.levels.table').'.created_at',
                config('module.levels.table').'.updated_at',
            ]);
        if(request()->has('program_id') && !empty(request()->get('program_id'))){
            $data = $data->where('program_id', request()->get('program_id'));
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
        if (Level::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.levels.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param Level $level
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(Level $level, array $input)
    {
    	if ($level->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.levels.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param Level $level
     * @throws GeneralException
     * @return bool
     */
    public function delete(Level $level)
    {
        if ($level->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.levels.delete_error'));
    }
}
