<?php

namespace App\Repositories\Backend\QuizCategories;

use DB;
use Carbon\Carbon;
use App\Models\QuizCategories\QuizCategory;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class QuizCategoryRepository.
 */
class QuizCategoryRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = QuizCategory::class;

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
                config('module.quizcategories.table').'.id',
                config('module.quizcategories.table').'.name',
				config('module.quizcategories.table').'.quiz_type_id',
				
                config('module.quizcategories.table').'.created_at',
                config('module.quizcategories.table').'.updated_at',
            ]);
        if(request()->has('quiz_type_id') && !empty(request()->get('quiz_type_id'))){
            $data = $data->where('quiz_type_id', request()->get('quiz_type_id'));
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
        if (QuizCategory::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.quizcategories.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param QuizCategory $quizcategory
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(QuizCategory $quizcategory, array $input)
    {
    	if ($quizcategory->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.quizcategories.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param QuizCategory $quizcategory
     * @throws GeneralException
     * @return bool
     */
    public function delete(QuizCategory $quizcategory)
    {
        if ($quizcategory->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.quizcategories.delete_error'));
    }
}
