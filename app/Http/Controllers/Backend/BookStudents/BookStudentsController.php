<?php

namespace App\Http\Controllers\Backend\BookStudents;

use App\Models\BookStudents\BookStudent;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\BookStudents\CreateResponse;
use App\Http\Responses\Backend\BookStudents\EditResponse;
use App\Repositories\Backend\BookStudents\BookStudentRepository;
use App\Http\Requests\Backend\BookStudents\ManageBookStudentRequest;
use App\Http\Requests\Backend\BookStudents\CreateBookStudentRequest;
use App\Http\Requests\Backend\BookStudents\StoreBookStudentRequest;
use App\Http\Requests\Backend\BookStudents\EditBookStudentRequest;
use App\Http\Requests\Backend\BookStudents\UpdateBookStudentRequest;
use App\Http\Requests\Backend\BookStudents\DeleteBookStudentRequest;

/**
 * BookStudentsController
 */
class BookStudentsController extends Controller
{
    /**
     * variable to store the repository object
     * @var BookStudentRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param BookStudentRepository $repository;
     */
    public function __construct(BookStudentRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\BookStudents\ManageBookStudentRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageBookStudentRequest $request)
    {
        return new ViewResponse('backend.bookstudents.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateBookStudentRequestNamespace  $request
     * @return \App\Http\Responses\Backend\BookStudents\CreateResponse
     */
    public function create(CreateBookStudentRequest $request)
    {
        return new CreateResponse('backend.bookstudents.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreBookStudentRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreBookStudentRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.bookstudents.index'), ['flash_success' => _tr('alerts.backend.bookstudents.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\BookStudents\BookStudent  $bookstudent
     * @param  EditBookStudentRequestNamespace  $request
     * @return \App\Http\Responses\Backend\BookStudents\EditResponse
     */
    public function edit(BookStudent $bookstudent, EditBookStudentRequest $request)
    {
        return new EditResponse($bookstudent);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateBookStudentRequestNamespace  $request
     * @param  App\Models\BookStudents\BookStudent  $bookstudent
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateBookStudentRequest $request, BookStudent $bookstudent)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $bookstudent, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.bookstudents.index'), ['flash_success' => _tr('alerts.backend.bookstudents.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteBookStudentRequestNamespace  $request
     * @param  App\Models\BookStudents\BookStudent  $bookstudent
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(BookStudent $bookstudent, DeleteBookStudentRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($bookstudent);
        //returning with successfull message
        return new RedirectResponse(route('admin.bookstudents.index'), ['flash_success' => _tr('alerts.backend.bookstudents.deleted')]);
    }
    
}
