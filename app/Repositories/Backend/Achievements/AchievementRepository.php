<?php

namespace App\Repositories\Backend\Achievements;

use DB;
use Carbon\Carbon;
use App\Models\Achievements\Achievement;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class AchievementRepository.
 */
class AchievementRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = Achievement::class;

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
                config('module.achievements.table').'.id',
                config('module.achievements.table').'.name',
                config('module.achievements.table').'.cover',
                config('module.achievements.table').'.topic_id',

                config('module.achievements.table').'.created_at',
                config('module.achievements.table').'.updated_at',
            ]);
        if(request()->has('topic_id') && !empty(request()->get('topic_id'))){
            $data = $data->where('topic_id', request()->get('topic_id'));
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
        if (Achievement::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.achievements.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param Achievement $achievement
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(Achievement $achievement, array $input)
    {
    	if ($achievement->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.achievements.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param Achievement $achievement
     * @throws GeneralException
     * @return bool
     */
    public function delete(Achievement $achievement)
    {
        if ($achievement->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.achievements.delete_error'));
    }
}
