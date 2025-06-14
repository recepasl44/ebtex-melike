<?php

namespace App\Repositories\Backend\BookletTypes;

use DB;
use Carbon\Carbon;
use App\Models\BookletTypes\BookletType;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class BookletTypeRepository.
 */
class BookletTypeRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = BookletType::class;

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
                config('module.booklettypes.table').'.id',
                config('module.booklettypes.table').'.name',
				
                config('module.booklettypes.table').'.created_at',
                config('module.booklettypes.table').'.updated_at',
            ]);

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
        if (BookletType::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.booklettypes.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param BookletType $booklettype
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(BookletType $booklettype, array $input)
    {
    	if ($booklettype->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.booklettypes.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param BookletType $booklettype
     * @throws GeneralException
     * @return bool
     */
    public function delete(BookletType $booklettype)
    {
        if ($booklettype->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.booklettypes.delete_error'));
    }
}
