<?php

namespace App\Repositories\Backend\Booklets;

use DB;
use Carbon\Carbon;
use App\Models\Booklets\Booklet;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class BookletRepository.
 */
class BookletRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = Booklet::class;

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
                config('module.booklets.table').'.id',
                config('module.booklets.table').'.name',
				config('module.booklets.table').'.booklet_type_id',
				
                config('module.booklets.table').'.created_at',
                config('module.booklets.table').'.updated_at',
            ]);
        if(request()->has('booklet_type_id') && !empty(request()->get('booklet_type_id'))){
            $data = $data->where('booklet_type_id', request()->get('booklet_type_id'));
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
        if (Booklet::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.booklets.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param Booklet $booklet
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(Booklet $booklet, array $input)
    {
    	if ($booklet->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.booklets.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param Booklet $booklet
     * @throws GeneralException
     * @return bool
     */
    public function delete(Booklet $booklet)
    {
        if ($booklet->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.booklets.delete_error'));
    }
}
