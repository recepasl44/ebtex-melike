<?php

namespace App\Repositories\Backend\AcademicTitles;

use DB;
use Carbon\Carbon;
use App\Models\AcademicTitles\AcademicTitle;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class AcademicTitleRepository.
 */
class AcademicTitleRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = AcademicTitle::class;

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
                config('module.academictitles.table').'.id',
                config('module.academictitles.table').'.name',
				config('module.academictitles.table').'.status',
				
                config('module.academictitles.table').'.created_at',
                config('module.academictitles.table').'.updated_at',
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
        if (AcademicTitle::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.academictitles.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param AcademicTitle $academictitle
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(AcademicTitle $academictitle, array $input)
    {
    	if ($academictitle->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.academictitles.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param AcademicTitle $academictitle
     * @throws GeneralException
     * @return bool
     */
    public function delete(AcademicTitle $academictitle)
    {
        if ($academictitle->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.academictitles.delete_error'));
    }
}
