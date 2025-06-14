<?php

namespace App\Repositories\Backend\Classes;

use DB;
use Carbon\Carbon;
use App\Models\Classes\Class;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class ClassRepository.
 */
class ClassRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = Class::class;

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
                config('module.classes.table').'.id',
                config('module.classes.table').'.branch',
				config('module.classes.table').'.name',
				config('module.classes.table').'.level',
				
                config('module.classes.table').'.created_at',
                config('module.classes.table').'.updated_at',
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
        if (Class::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.classes.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param Class $class
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(Class $class, array $input)
    {
    	if ($class->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.classes.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param Class $class
     * @throws GeneralException
     * @return bool
     */
    public function delete(Class $class)
    {
        if ($class->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.classes.delete_error'));
    }
}
