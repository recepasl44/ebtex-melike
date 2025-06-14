<?php

namespace App\Repositories\Backend\Topics;

use DB;
use Carbon\Carbon;
use App\Models\Topics\Topic;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class TopicRepository.
 */
class TopicRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = Topic::class;

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
                config('module.topics.table').'.id',
                config('module.topics.table').'.name',
				config('module.topics.table').'.cover',
				config('module.topics.table').'.chapter_id',
				
                config('module.topics.table').'.created_at',
                config('module.topics.table').'.updated_at',
            ]);
        if(request()->has('chapter_id') && !empty(request()->get('chapter_id'))){
            $data = $data->where('chapter_id', request()->get('chapter_id'));
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
        if (Topic::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.topics.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param Topic $topic
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(Topic $topic, array $input)
    {
    	if ($topic->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.topics.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param Topic $topic
     * @throws GeneralException
     * @return bool
     */
    public function delete(Topic $topic)
    {
        if ($topic->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.topics.delete_error'));
    }
}
