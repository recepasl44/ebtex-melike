<?php

namespace App\Repositories\Backend\BookPackages;

use DB;
use Carbon\Carbon;
use App\Models\BookPackages\BookPackage;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class BookPackageRepository.
 */
class BookPackageRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = BookPackage::class;

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
                config('module.bookpackages.table').'.id',
                config('module.bookpackages.table').'.name',
				config('module.bookpackages.table').'.default_total_questions',
				config('module.bookpackages.table').'.default_standard',
				config('module.bookpackages.table').'.default_flexible',
				
                config('module.bookpackages.table').'.created_at',
                config('module.bookpackages.table').'.updated_at',
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
        if (BookPackage::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.bookpackages.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param BookPackage $bookpackage
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(BookPackage $bookpackage, array $input)
    {
    	if ($bookpackage->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.bookpackages.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param BookPackage $bookpackage
     * @throws GeneralException
     * @return bool
     */
    public function delete(BookPackage $bookpackage)
    {
        if ($bookpackage->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.bookpackages.delete_error'));
    }
}
