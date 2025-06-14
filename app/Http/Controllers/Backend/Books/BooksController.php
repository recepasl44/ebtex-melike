<?php

namespace App\Http\Controllers\Backend\Books;

use App\Models\Books\Book;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\Books\CreateResponse;
use App\Http\Responses\Backend\Books\EditResponse;
use App\Repositories\Backend\Books\BookRepository;
use App\Http\Requests\Backend\Books\ManageBookRequest;
use App\Http\Requests\Backend\Books\CreateBookRequest;
use App\Http\Requests\Backend\Books\StoreBookRequest;
use App\Http\Requests\Backend\Books\EditBookRequest;
use App\Http\Requests\Backend\Books\UpdateBookRequest;
use App\Http\Requests\Backend\Books\DeleteBookRequest;

/**
 * BooksController
 */
class BooksController extends Controller
{
    /**
     * variable to store the repository object
     * @var BookRepository
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
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\Books\ManageBookRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageBookRequest $request)
    {
        return new ViewResponse('backend.books.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateBookRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Books\CreateResponse
     */
    public function create(CreateBookRequest $request)
    {
        return new CreateResponse('backend.books.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreBookRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreBookRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.books.index'), ['flash_success' => _tr('alerts.backend.books.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\Books\Book  $book
     * @param  EditBookRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Books\EditResponse
     */
    public function edit(Book $book, EditBookRequest $request)
    {
        return new EditResponse($book);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateBookRequestNamespace  $request
     * @param  App\Models\Books\Book  $book
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateBookRequest $request, Book $book)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $book, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.books.index'), ['flash_success' => _tr('alerts.backend.books.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteBookRequestNamespace  $request
     * @param  App\Models\Books\Book  $book
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(Book $book, DeleteBookRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($book);
        //returning with successfull message
        return new RedirectResponse(route('admin.books.index'), ['flash_success' => _tr('alerts.backend.books.deleted')]);
    }
    
}
