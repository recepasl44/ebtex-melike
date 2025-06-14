<?php

namespace App\Repositories\Backend\Books;

use DB;
use Carbon\Carbon;
use App\Models\Books\Book;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class BookRepository.
 */
class BookRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = Book::class;

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
                config('module.books.table').'.id',
                config('module.books.table').'.institution_type_id',
                config('module.books.table').'.institution_id',
				config('module.books.table').'.group_id',
				config('module.books.table').'.book_package_id',
				config('module.books.table').'.period_id',
				config('module.books.table').'.program_id',
				config('module.books.table').'.level_id',
				config('module.books.table').'.classroom_id',
				config('module.books.table').'.date_range_start',
				config('module.books.table').'.date_range_end',
				config('module.books.table').'.relevance_id',
				config('module.books.table').'.cover',
				config('module.books.table').'.logo',
				config('module.books.table').'.name',

                config('module.books.table').'.created_at',
                config('module.books.table').'.updated_at',
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
        if (Book::create($input)) {
            return true;
        }
        throw new GeneralException(trans('exceptions.backend.books.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param Book $book
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(Book $book, array $input)
    {
    	if ($book->update($input))
            return true;

        throw new GeneralException(trans('exceptions.backend.books.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param Book $book
     * @throws GeneralException
     * @return bool
     */
    public function delete(Book $book)
    {
        if ($book->delete()) {
            return true;
        }

        throw new GeneralException(trans('exceptions.backend.books.delete_error'));
    }
}
