<?php

namespace App\Repositories\Backend\DiscountStudents;

use DB;
use Carbon\Carbon;
use App\Models\DiscountStudents\DiscountStudent;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class DiscountStudentRepository.
 */
class DiscountStudentRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = DiscountStudent::class;

    /**
     * This method is used by Table Controller
     * For getting the table data to show in
     * the grid
     * @return mixed
     */
    public function getForDataTable()
    {
        return $this->query()
            ->select([
                config('module.discountstudents.table').'.id',
                config('module.discountstudents.table').'.discount_id',
				config('module.discountstudents.table').'.student_id',
				
                config('module.discountstudents.table').'.created_at',
                config('module.discountstudents.table').'.updated_at',
            ]);
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
        if (DiscountStudent::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.discountstudents.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param DiscountStudent $discountstudent
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(DiscountStudent $discountstudent, array $input)
    {
    	if ($discountstudent->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.discountstudents.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param DiscountStudent $discountstudent
     * @throws GeneralException
     * @return bool
     */
    public function delete(DiscountStudent $discountstudent)
    {
        if ($discountstudent->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.discountstudents.delete_error'));
    }
}
