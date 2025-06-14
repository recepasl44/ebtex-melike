<?php

namespace App\Repositories\Backend\Videos;

use DB;
use App\Supports\Carbon;
use App\Models\Videos\Video;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class VideoRepository.
 */
class VideoRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = Video::class;

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
                config('module.videos.table').'.id',
                config('module.videos.table').'.name',
                config('module.videos.table').'.code',
                config('module.videos.table').'.source',
                config('module.videos.table').'.site',
                config('module.videos.table').'.type',
                config('module.videos.table').'.status',
                config('module.videos.table').'.created_at',
                config('module.videos.table').'.updated_at',
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
        if($input['site']==0){
            $input['source']='https://player.vimeo.com/video/'.$input['code'];
        }
        if($input['site']==1){
            $input['source']='https://www.youtube.com/embed/'.$input['code'];
        }
        if (Video::create($input)) {
            return true;
        }
        throw new GeneralException(_tr('exceptions.backend.videos.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param Video $video
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(Video $video, array $input)
    {
        if($input['site']==0){
            $input['source']='https://player.vimeo.com/video/'.$input['code'];
        }
        if($input['site']==1){
            $input['source']='https://www.youtube.com/embed/'.$input['code'];
        }
    	if ($video->update($input))
            return true;

        throw new GeneralException(_tr('exceptions.backend.videos.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param Video $video
     * @throws GeneralException
     * @return bool
     */
    public function delete(Video $video)
    {
        if ($video->delete()) {
            return true;
        }

        throw new GeneralException(_tr('exceptions.backend.videos.delete_error'));
    }
}
