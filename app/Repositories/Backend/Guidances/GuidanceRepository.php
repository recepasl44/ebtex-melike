<?php

namespace App\Repositories\Backend\Guidances;

use DB;
use Carbon\Carbon;
use App\Models\Guidances\Guidance;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class GuidanceRepository.
 */
class GuidanceRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = Guidance::class;

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
                config('module.guidances.table').'.id',
                config('module.guidances.table').'.guidance_date',
				config('module.guidances.table').'.user_id',
				config('module.guidances.table').'.lesson_id',
				config('module.guidances.table').'.unit_id',
				config('module.guidances.table').'.chapter_id',
				config('module.guidances.table').'.topic_id',
				config('module.guidances.table').'.achievement_id',
				config('module.guidances.table').'.source_id',
				config('module.guidances.table').'.page_range',
				config('module.guidances.table').'.questions_number',
				config('module.guidances.table').'.status',
				config('module.guidances.table').'.created_by',
				
                config('module.guidances.table').'.created_at',
                config('module.guidances.table').'.updated_at',
            ]);

        if(request()->has('user_id') && !empty(request()->get('user_id'))){
            $data = $data->where('user_id', request()->get('user_id'));
        }
        if(request()->has('lesson_id') && !empty(request()->get('lesson_id'))){
            $data = $data->where('lesson_id', request()->get('lesson_id'));
        }
        if(request()->has('unit_id') && !empty(request()->get('unit_id'))){
            $data = $data->where('unit_id', request()->get('unit_id'));
        }
        if(request()->has('chapter_id') && !empty(request()->get('chapter_id'))){
            $data = $data->where('chapter_id', request()->get('chapter_id'));
        }
        if(request()->has('achievement_id') && !empty(request()->get('achievement_id'))){
            $data = $data->where('achievement_id', request()->get('achievement_id'));
        }
        if(request()->has('topic_id') && !empty(request()->get('topic_id'))){
            $data = $data->where('topic_id', request()->get('topic_id'));
        }
        if(request()->has('source_id')){
            $data = $data->where('source_id', request()->get('source_id'));
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
        if (Guidance::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.guidances.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param Guidance $guidance
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(Guidance $guidance, array $input)
    {
    	if ($guidance->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.guidances.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param Guidance $guidance
     * @throws GeneralException
     * @return bool
     */
    public function delete(Guidance $guidance)
    {
        if ($guidance->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.guidances.delete_error'));
    }
}
