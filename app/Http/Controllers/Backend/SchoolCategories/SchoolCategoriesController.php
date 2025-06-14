<?php

namespace App\Http\Controllers\Backend\SchoolCategories;

use App\Models\SchoolCategories\SchoolCategory;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\SchoolCategories\CreateResponse;
use App\Http\Responses\Backend\SchoolCategories\EditResponse;
use App\Repositories\Backend\SchoolCategories\SchoolCategoryRepository;
use App\Http\Requests\Backend\SchoolCategories\ManageSchoolCategoryRequest;
use App\Http\Requests\Backend\SchoolCategories\CreateSchoolCategoryRequest;
use App\Http\Requests\Backend\SchoolCategories\StoreSchoolCategoryRequest;
use App\Http\Requests\Backend\SchoolCategories\EditSchoolCategoryRequest;
use App\Http\Requests\Backend\SchoolCategories\UpdateSchoolCategoryRequest;
use App\Http\Requests\Backend\SchoolCategories\DeleteSchoolCategoryRequest;

/**
 * SchoolCategoriesController
 */
class SchoolCategoriesController extends Controller
{
    /**
     * variable to store the repository object
     * @var SchoolCategoryRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param SchoolCategoryRepository $repository;
     */
    public function __construct(SchoolCategoryRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\SchoolCategories\ManageSchoolCategoryRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageSchoolCategoryRequest $request)
    {
        return new ViewResponse('backend.schoolcategories.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateSchoolCategoryRequestNamespace  $request
     * @return \App\Http\Responses\Backend\SchoolCategories\CreateResponse
     */
    public function create(CreateSchoolCategoryRequest $request)
    {
        return new CreateResponse('backend.schoolcategories.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreSchoolCategoryRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreSchoolCategoryRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.schoolcategories.index'), ['flash_success' => _tr('alerts.backend.schoolcategories.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\SchoolCategories\SchoolCategory  $schoolcategory
     * @param  EditSchoolCategoryRequestNamespace  $request
     * @return \App\Http\Responses\Backend\SchoolCategories\EditResponse
     */
    public function edit(SchoolCategory $schoolcategory, EditSchoolCategoryRequest $request)
    {
        return new EditResponse($schoolcategory);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateSchoolCategoryRequestNamespace  $request
     * @param  App\Models\SchoolCategories\SchoolCategory  $schoolcategory
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateSchoolCategoryRequest $request, SchoolCategory $schoolcategory)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $schoolcategory, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.schoolcategories.index'), ['flash_success' => _tr('alerts.backend.schoolcategories.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteSchoolCategoryRequestNamespace  $request
     * @param  App\Models\SchoolCategories\SchoolCategory  $schoolcategory
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(SchoolCategory $schoolcategory, DeleteSchoolCategoryRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($schoolcategory);
        //returning with successfull message
        return new RedirectResponse(route('admin.schoolcategories.index'), ['flash_success' => _tr('alerts.backend.schoolcategories.deleted')]);
    }
    
}
