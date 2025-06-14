<?php

namespace App\Repositories\Backend\SchoolCategories;

use DB;
use Carbon\Carbon;
use App\Models\SchoolCategories\SchoolCategory;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class SchoolCategoryRepository.
 */
class SchoolCategoryRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = SchoolCategory::class;

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
                config('module.schoolcategories.table').'.id',
                config('module.schoolcategories.table').'.name',
				
                config('module.schoolcategories.table').'.created_at',
                config('module.schoolcategories.table').'.updated_at',
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
        if (SchoolCategory::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.schoolcategories.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param SchoolCategory $schoolcategory
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(SchoolCategory $schoolcategory, array $input)
    {
    	if ($schoolcategory->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.schoolcategories.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param SchoolCategory $schoolcategory
     * @throws GeneralException
     * @return bool
     */
    public function delete(SchoolCategory $schoolcategory)
    {
        if ($schoolcategory->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.schoolcategories.delete_error'));
    }
}
