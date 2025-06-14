<?php

namespace App\Repositories\Backend\Chapters;

use DB;
use Carbon\Carbon;
use App\Models\Chapters\Chapter;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class ChapterRepository.
 */
class ChapterRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = Chapter::class;

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
                config('module.chapters.table').'.id',
                config('module.chapters.table').'.name',
				config('module.chapters.table').'.cover',
				config('module.chapters.table').'.unit_id',
				
                config('module.chapters.table').'.created_at',
                config('module.chapters.table').'.updated_at',
            ]);
        if(request()->has('unit_id') && !empty(request()->get('unit_id'))){
            $data = $data->where('unit_id', request()->get('unit_id'));
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
        if (Chapter::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.chapters.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param Chapter $chapter
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(Chapter $chapter, array $input)
    {
    	if ($chapter->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.chapters.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param Chapter $chapter
     * @throws GeneralException
     * @return bool
     */
    public function delete(Chapter $chapter)
    {
        if ($chapter->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.chapters.delete_error'));
    }
}
