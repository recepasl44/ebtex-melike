<?php

namespace App\Http\Controllers\Backend\Books;

use Carbon\Carbon;
use App\Http\Controllers\Controller;
use Yajra\DataTables\Facades\DataTables;
use App\Repositories\Backend\Books\BookRepository;
use App\Http\Requests\Backend\Books\ManageBookRequest;

/**
 * Class BooksTableController.
 */
class BooksTableController extends Controller
{
    /**
     * variable to store the repository object
     * @var BookRepository
     */
    protected $book;

    /**
     * contructor to initialize repository object
     * @param BookRepository $book;
     */
    public function __construct(BookRepository $book)
    {
        $this->book = $book;
    }

    /**
     * This method return the data of the model
     * @param ManageBookRequest $request
     *
     * @return mixed
     */
    public function __invoke(ManageBookRequest $request)
    {
        return Datatables::of($this->book->getForDataTable())
            ->escapeColumns(['id'])
            ->addColumn('created_at', function ($book) {
                return Carbon::parse($book->created_at)->toDateString();
            })
            ->addColumn('actions', function ($book) {
                return $book->action_buttons;
            })
            ->make(true);
    }
}
