<?php

namespace App\Repositories\Backend\Branches;

use DB;
use Carbon\Carbon;
use App\Models\Branches\Branche;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class BrancheRepository.
 */
class BrancheRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = Branche::class;

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
                config('module.branches.table').'.id',
                config('module.branches.table').'.name',
                config('module.branches.table').'.type',
				config('module.branches.table').'.created_by',
                config('module.branches.table').'.created_at',
                config('module.branches.table').'.updated_at',
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
        if(empty($input['created_by'])) {
            $input['created_by'] = access()->user()?->id ?? 1;
        }
        if (Branche::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.branches.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param Branche $branche
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(Branche $branche, array $input)
    {
        if(empty($input['created_by'])) {
            $input['created_by'] = access()->user()?->id ?? 1;
        }
    	if ($branche->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.branches.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param Branche $branche
     * @throws GeneralException
     * @return bool
     */
    public function delete(Branche $branche)
    {
        if ($branche->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.branches.delete_error'));
    }
}
