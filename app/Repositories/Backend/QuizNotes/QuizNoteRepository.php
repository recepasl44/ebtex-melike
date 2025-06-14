<?php

namespace App\Repositories\Backend\QuizNotes;

use DB;
use Carbon\Carbon;
use App\Models\QuizNotes\QuizNote;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class QuizNoteRepository.
 */
class QuizNoteRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = QuizNote::class;

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
                config('module.quiznotes.table').'.id',
                config('module.quiznotes.table').'.type_id',
				config('module.quiznotes.table').'.note',
				config('module.quiznotes.table').'.program_id',
				config('module.quiznotes.table').'.level_id',
				config('module.quiznotes.table').'.status',
				
                config('module.quiznotes.table').'.created_at',
                config('module.quiznotes.table').'.updated_at',
            ]);
        if(request()->has('type_id') && !empty(request()->get('type_id'))){
            $data = $data->where('type_id', request()->get('type_id'));
        }
        if(request()->has('program_id') && !empty(request()->get('program_id'))){
            $data = $data->where('program_id', request()->get('program_id'));
        }
        if(request()->has('level_id') && !empty(request()->get('level_id'))){
            $data = $data->where('level_id', request()->get('level_id'));
        }
        if(request()->has('status') && !empty(request()->get('status'))){
            $data = $data->where('status', request()->get('status'));
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
        if (QuizNote::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.quiznotes.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param QuizNote $quiznote
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(QuizNote $quiznote, array $input)
    {
    	if ($quiznote->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.quiznotes.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param QuizNote $quiznote
     * @throws GeneralException
     * @return bool
     */
    public function delete(QuizNote $quiznote)
    {
        if ($quiznote->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.quiznotes.delete_error'));
    }
}
