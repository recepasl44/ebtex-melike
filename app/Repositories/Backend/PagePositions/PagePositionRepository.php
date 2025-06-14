<?php

namespace App\Repositories\Backend\PagePositions;

use DB;
use Carbon\Carbon;
use App\Models\PagePositions\PagePosition;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class PagePositionRepository.
 */
class PagePositionRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = PagePosition::class;

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
                config('module.pagepositions.table').'.id',
                config('module.pagepositions.table').'.name',
				
                config('module.pagepositions.table').'.created_at',
                config('module.pagepositions.table').'.updated_at',
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
        if (PagePosition::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.pagepositions.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param PagePosition $pageposition
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(PagePosition $pageposition, array $input)
    {
    	if ($pageposition->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.pagepositions.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param PagePosition $pageposition
     * @throws GeneralException
     * @return bool
     */
    public function delete(PagePosition $pageposition)
    {
        if ($pageposition->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.pagepositions.delete_error'));
    }
}
