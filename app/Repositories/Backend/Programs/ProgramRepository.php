<?php

namespace App\Repositories\Backend\Programs;

use DB;
use Carbon\Carbon;
use App\Models\Programs\Program;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class ProgramRepository.
 */
class ProgramRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = Program::class;

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
                config('module.programs.table').'.id',
                config('module.programs.table').'.name',
                config('module.programs.table').'.category_id',

                config('module.programs.table').'.created_at',
                config('module.programs.table').'.updated_at',
            ]);
        if(request()->has('category_id') && !empty(request()->get('category_id'))){
            $data = $data->where('category_id', request()->get('category_id'));
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
        if (Program::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.programs.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param Program $program
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(Program $program, array $input)
    {
        if ($program->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.programs.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param Program $program
     * @throws GeneralException
     * @return bool
     */
    public function delete(Program $program)
    {
        if ($program->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.programs.delete_error'));
    }
}
