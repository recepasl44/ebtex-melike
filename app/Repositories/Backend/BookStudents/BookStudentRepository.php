<?php

namespace App\Repositories\Backend\BookStudents;

use DB;
use Carbon\Carbon;
use App\Models\BookStudents\BookStudent;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class BookStudentRepository.
 */
class BookStudentRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = BookStudent::class;

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
                config('module.bookstudents.table').'.id',
                config('module.bookstudents.table').'.book_id',
				config('module.bookstudents.table').'.student_id',
				
                config('module.bookstudents.table').'.created_at',
                config('module.bookstudents.table').'.updated_at',
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
        if (BookStudent::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.bookstudents.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param BookStudent $bookstudent
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(BookStudent $bookstudent, array $input)
    {
    	if ($bookstudent->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.bookstudents.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param BookStudent $bookstudent
     * @throws GeneralException
     * @return bool
     */
    public function delete(BookStudent $bookstudent)
    {
        if ($bookstudent->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.bookstudents.delete_error'));
    }
}
