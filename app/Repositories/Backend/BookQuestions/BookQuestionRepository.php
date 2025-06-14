<?php

namespace App\Repositories\Backend\BookQuestions;

use DB;
use Carbon\Carbon;
use App\Models\BookQuestions\BookQuestion;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class BookQuestionRepository.
 */
class BookQuestionRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = BookQuestion::class;

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
                config('module.bookquestions.table').'.id',
                config('module.bookquestions.table').'.book_id',
				config('module.bookquestions.table').'.question_id',
				
                config('module.bookquestions.table').'.created_at',
                config('module.bookquestions.table').'.updated_at',
            ]);
        if(request()->has('book_id') && !empty(request()->get('book_id'))){
            $data = $data->where('book_id', request()->get('book_id'));
        }
        if(request()->has('question_id') && !empty(request()->get('question_id'))){
            $data = $data->where('question_id', request()->get('question_id'));
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
        if (BookQuestion::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.bookquestions.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param BookQuestion $bookquestion
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(BookQuestion $bookquestion, array $input)
    {
    	if ($bookquestion->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.bookquestions.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param BookQuestion $bookquestion
     * @throws GeneralException
     * @return bool
     */
    public function delete(BookQuestion $bookquestion)
    {
        if ($bookquestion->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.bookquestions.delete_error'));
    }
}
