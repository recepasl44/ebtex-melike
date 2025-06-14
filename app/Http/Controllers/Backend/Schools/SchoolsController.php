<?php

namespace App\Http\Controllers\Backend\Schools;

use App\Models\Cities\City;
use App\Models\Counties\County;
use App\Models\Schools\School;
use App\Models\SchoolTypes\SchoolType;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\Schools\CreateResponse;
use App\Http\Responses\Backend\Schools\EditResponse;
use App\Repositories\Backend\Schools\SchoolRepository;
use App\Http\Requests\Backend\Schools\ManageSchoolRequest;
use App\Http\Requests\Backend\Schools\CreateSchoolRequest;
use App\Http\Requests\Backend\Schools\StoreSchoolRequest;
use App\Http\Requests\Backend\Schools\EditSchoolRequest;
use App\Http\Requests\Backend\Schools\UpdateSchoolRequest;
use App\Http\Requests\Backend\Schools\DeleteSchoolRequest;
use Illuminate\Support\Facades\DB;

/**
 * SchoolsController
 */
class SchoolsController extends Controller
{
    /**
     * variable to store the repository object
     * @var SchoolRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param SchoolRepository $repository;
     */
    public function __construct(SchoolRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\Schools\ManageSchoolRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageSchoolRequest $request)
    {
        $schools = School::where('country_id', -2)->get();
        foreach ($schools as $school) {
            $school->country_id = 212;
            $school->save();
        }
        return new ViewResponse('backend.schools.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateSchoolRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Schools\CreateResponse
     */
    public function create(CreateSchoolRequest $request)
    {
        return new CreateResponse('backend.schools.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreSchoolRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreSchoolRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.schools.index'), ['flash_success' => _tr('alerts.backend.schools.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\Schools\School  $school
     * @param  EditSchoolRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Schools\EditResponse
     */
    public function edit(School $school, EditSchoolRequest $request)
    {
        return new EditResponse($school);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateSchoolRequestNamespace  $request
     * @param  App\Models\Schools\School  $school
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateSchoolRequest $request, School $school)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $school, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.schools.index'), ['flash_success' => _tr('alerts.backend.schools.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteSchoolRequestNamespace  $request
     * @param  App\Models\Schools\School  $school
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(School $school, DeleteSchoolRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($school);
        //returning with successfull message
        return new RedirectResponse(route('admin.schools.index'), ['flash_success' => _tr('alerts.backend.schools.deleted')]);
    }
    
}
