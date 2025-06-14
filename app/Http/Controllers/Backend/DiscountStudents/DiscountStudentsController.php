<?php

namespace App\Http\Controllers\Backend\DiscountStudents;

use App\Models\DiscountStudents\DiscountStudent;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\DiscountStudents\CreateResponse;
use App\Http\Responses\Backend\DiscountStudents\EditResponse;
use App\Repositories\Backend\DiscountStudents\DiscountStudentRepository;
use App\Http\Requests\Backend\DiscountStudents\ManageDiscountStudentRequest;
use App\Http\Requests\Backend\DiscountStudents\CreateDiscountStudentRequest;
use App\Http\Requests\Backend\DiscountStudents\StoreDiscountStudentRequest;
use App\Http\Requests\Backend\DiscountStudents\EditDiscountStudentRequest;
use App\Http\Requests\Backend\DiscountStudents\UpdateDiscountStudentRequest;
use App\Http\Requests\Backend\DiscountStudents\DeleteDiscountStudentRequest;

/**
 * DiscountStudentsController
 */
class DiscountStudentsController extends Controller
{
    /**
     * variable to store the repository object
     * @var DiscountStudentRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param DiscountStudentRepository $repository;
     */
    public function __construct(DiscountStudentRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\DiscountStudents\ManageDiscountStudentRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageDiscountStudentRequest $request)
    {
        return new ViewResponse('backend.discountstudents.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateDiscountStudentRequestNamespace  $request
     * @return \App\Http\Responses\Backend\DiscountStudents\CreateResponse
     */
    public function create(CreateDiscountStudentRequest $request)
    {
        return new CreateResponse('backend.discountstudents.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreDiscountStudentRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreDiscountStudentRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.discountstudents.index'), ['flash_success' => _tr('alerts.backend.discountstudents.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\DiscountStudents\DiscountStudent  $discountstudent
     * @param  EditDiscountStudentRequestNamespace  $request
     * @return \App\Http\Responses\Backend\DiscountStudents\EditResponse
     */
    public function edit(DiscountStudent $discountstudent, EditDiscountStudentRequest $request)
    {
        return new EditResponse($discountstudent);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateDiscountStudentRequestNamespace  $request
     * @param  App\Models\DiscountStudents\DiscountStudent  $discountstudent
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateDiscountStudentRequest $request, DiscountStudent $discountstudent)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $discountstudent, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.discountstudents.index'), ['flash_success' => _tr('alerts.backend.discountstudents.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteDiscountStudentRequestNamespace  $request
     * @param  App\Models\DiscountStudents\DiscountStudent  $discountstudent
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(DiscountStudent $discountstudent, DeleteDiscountStudentRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($discountstudent);
        //returning with successfull message
        return new RedirectResponse(route('admin.discountstudents.index'), ['flash_success' => _tr('alerts.backend.discountstudents.deleted')]);
    }
    
}
