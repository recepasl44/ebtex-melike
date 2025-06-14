<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\BookResource;
use App\Models\Books\Book;
use App\Repositories\Backend\Books\BookRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * BooksController
 */
class BooksController extends APIController
{
    /**
     * __construct.
     *
     * @var BookRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param BookRepository $repository;
     */
    public function __construct(BookRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $book.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return BookResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param Book $book
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Book $book)
    {
        return new BookResource($book);
    }

    
     /**
      * Creates the Resource for book.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateBook($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new BookResource(Book::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update book.
         *
         * @param Book    $book
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, Book $book)
    {
        $validation = $this->validateBook($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($book, $request->all());

        $book = Book::findOrfail($book->id);

        return new BookResource($book);
    }
    
    /**
     * Delete book.
     *
     * @param Book    $book
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Book $book)
    {
        $this->repository->delete($book);

        return $this->respond([
            'message' => _tr('alerts.backend.book.deleted'),
        ]);
    }
    

    /**
     * validate book.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateBook(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'institution_id' => 'required',
               'group_id' => 'required',
               'book_package_id' => 'required',
               'period_id' => 'required',
               'program_id' => 'required',
               'level_id' => 'required',
               'classroom_id' => 'required',
               'date_range_start' => 'date',
               'date_range_end' => 'date',
               'cover' => 'numeric',
               ]);

        return $validation;
    }

    /**
     * validate message for validate book.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
