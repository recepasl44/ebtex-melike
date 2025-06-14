<?php

namespace App\Repositories\Backend\QuizTypes;

use DB;
use Carbon\Carbon;
use App\Models\QuizTypes\QuizType;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class QuizTypeRepository.
 */
class QuizTypeRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = QuizType::class;

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
                config('module.quiztypes.table').'.id',
                config('module.quiztypes.table').'.name',
                config('module.quiztypes.table').'.penalty_rate',
                config('module.quiztypes.table').'.created_at',
                config('module.quiztypes.table').'.updated_at',
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
        if (QuizType::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.quiztypes.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param QuizType $quiztype
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(QuizType $quiztype, array $input)
    {
    	if ($quiztype->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.quiztypes.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param QuizType $quiztype
     * @throws GeneralException
     * @return bool
     */
    public function delete(QuizType $quiztype)
    {
        if ($quiztype->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.quiztypes.delete_error'));
    }
}
