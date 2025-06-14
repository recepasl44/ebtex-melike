<?php

namespace App\Repositories\Backend\Professions;

use DB;
use Carbon\Carbon;
use App\Models\Professions\Profession;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class ProfessionRepository.
 */
class ProfessionRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = Profession::class;

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
                config('module.professions.table').'.id',
                config('module.professions.table').'.name',
				config('module.professions.table').'.status',
				
                config('module.professions.table').'.created_at',
                config('module.professions.table').'.updated_at',
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
        if (Profession::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.professions.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param Profession $profession
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(Profession $profession, array $input)
    {
    	if ($profession->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.professions.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param Profession $profession
     * @throws GeneralException
     * @return bool
     */
    public function delete(Profession $profession)
    {
        if ($profession->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.professions.delete_error'));
    }
}
