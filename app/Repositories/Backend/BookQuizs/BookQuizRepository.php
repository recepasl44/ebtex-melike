<?php

namespace App\Repositories\Backend\BookQuizs;

use DB;
use Carbon\Carbon;
use App\Models\BookQuizs\BookQuiz;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class BookQuizRepository.
 */
class BookQuizRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = BookQuiz::class;

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
                config('module.bookquizzes.table').'.id',
                config('module.bookquizzes.table').'.book_id',
				config('module.bookquizzes.table').'.quiz_id',
				
                config('module.bookquizzes.table').'.created_at',
                config('module.bookquizzes.table').'.updated_at',
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
        if (BookQuiz::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.bookquizzes.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param BookQuiz $bookquiz
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(BookQuiz $bookquiz, array $input)
    {
    	if ($bookquiz->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.bookquizzes.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param BookQuiz $bookquiz
     * @throws GeneralException
     * @return bool
     */
    public function delete(BookQuiz $bookquiz)
    {
        if ($bookquiz->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.bookquizzes.delete_error'));
    }
}
