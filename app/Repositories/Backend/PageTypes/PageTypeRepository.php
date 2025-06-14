<?php

namespace App\Repositories\Backend\PageTypes;

use DB;
use Carbon\Carbon;
use App\Models\PageTypes\PageType;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class PageTypeRepository.
 */
class PageTypeRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = PageType::class;

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
                config('module.pagetypes.table').'.id',
                config('module.pagetypes.table').'.name',
				
                config('module.pagetypes.table').'.created_at',
                config('module.pagetypes.table').'.updated_at',
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
        if (PageType::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.pagetypes.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param PageType $pagetype
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(PageType $pagetype, array $input)
    {
    	if ($pagetype->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.pagetypes.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param PageType $pagetype
     * @throws GeneralException
     * @return bool
     */
    public function delete(PageType $pagetype)
    {
        if ($pagetype->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.pagetypes.delete_error'));
    }
}
