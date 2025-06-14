<?php

namespace App\Http\Controllers\Backend\Scholarships;

use App\Models\Scholarships\Scholarship;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\Scholarships\CreateResponse;
use App\Http\Responses\Backend\Scholarships\EditResponse;
use App\Repositories\Backend\Scholarships\ScholarshipRepository;
use App\Http\Requests\Backend\Scholarships\ManageScholarshipRequest;
use App\Http\Requests\Backend\Scholarships\CreateScholarshipRequest;
use App\Http\Requests\Backend\Scholarships\StoreScholarshipRequest;
use App\Http\Requests\Backend\Scholarships\EditScholarshipRequest;
use App\Http\Requests\Backend\Scholarships\UpdateScholarshipRequest;
use App\Http\Requests\Backend\Scholarships\DeleteScholarshipRequest;

/**
 * ScholarshipsController
 */
class ScholarshipsController extends Controller
{
    /**
     * variable to store the repository object
     * @var ScholarshipRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param ScholarshipRepository $repository;
     */
    public function __construct(ScholarshipRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\Scholarships\ManageScholarshipRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageScholarshipRequest $request)
    {
        return new ViewResponse('backend.scholarships.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateScholarshipRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Scholarships\CreateResponse
     */
    public function create(CreateScholarshipRequest $request)
    {
        return new CreateResponse('backend.scholarships.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreScholarshipRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreScholarshipRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.scholarships.index'), ['flash_success' => _tr('alerts.backend.scholarships.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\Scholarships\Scholarship  $scholarship
     * @param  EditScholarshipRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Scholarships\EditResponse
     */
    public function edit(Scholarship $scholarship, EditScholarshipRequest $request)
    {
        return new EditResponse($scholarship);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateScholarshipRequestNamespace  $request
     * @param  App\Models\Scholarships\Scholarship  $scholarship
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateScholarshipRequest $request, Scholarship $scholarship)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $scholarship, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.scholarships.index'), ['flash_success' => _tr('alerts.backend.scholarships.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteScholarshipRequestNamespace  $request
     * @param  App\Models\Scholarships\Scholarship  $scholarship
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(Scholarship $scholarship, DeleteScholarshipRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($scholarship);
        //returning with successfull message
        return new RedirectResponse(route('admin.scholarships.index'), ['flash_success' => _tr('alerts.backend.scholarships.deleted')]);
    }
    
}
