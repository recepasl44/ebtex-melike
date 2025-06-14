<?php

namespace App\Repositories\Backend\Sources;

use DB;
use Carbon\Carbon;
use App\Models\Sources\Source;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class SourceRepository.
 */
class SourceRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = Source::class;

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
                config('module.sources.table').'.id',
                config('module.sources.table').'.source_type_id',
                config('module.sources.table').'.class_section',
                config('module.sources.table').'.subject',
                config('module.sources.table').'.teacher_id',
                config('module.sources.table').'.name',
                config('module.sources.table').'.planned_assignment_count',
                config('module.sources.table').'.status',

                config('module.sources.table').'.created_at',
                config('module.sources.table').'.updated_at',
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
        if (Source::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.sources.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param Source $source
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(Source $source, array $input)
    {
    	if ($source->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.sources.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param Source $source
     * @throws GeneralException
     * @return bool
     */
    public function delete(Source $source)
    {
        if ($source->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.sources.delete_error'));
    }
}
