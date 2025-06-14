<?php

namespace App\Repositories\Backend\Seasons;

use DB;
use Carbon\Carbon;
use App\Models\Seasons\Season;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class SeasonRepository.
 */
class SeasonRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = Season::class;

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
                config('module.seasons.table').'.id',
                config('module.seasons.table').'.name',
                config('module.seasons.table').'.former_id',
				
                config('module.seasons.table').'.created_at',
                config('module.seasons.table').'.updated_at',
            ]);
        if(request()->has('former_id') && !empty(request()->get('former_id'))){
            $data = $data->where('former_id', request()->get('former_id'));
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
        if (Season::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.seasons.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param Season $season
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(Season $season, array $input)
    {
    	if ($season->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.seasons.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param Season $season
     * @throws GeneralException
     * @return bool
     */
    public function delete(Season $season)
    {
        if ($season->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.seasons.delete_error'));
    }
}
