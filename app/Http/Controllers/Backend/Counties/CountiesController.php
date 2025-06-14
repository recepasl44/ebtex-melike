<?php

namespace App\Http\Controllers\Backend\Counties;

use App\Models\Counties\County;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\Counties\CreateResponse;
use App\Http\Responses\Backend\Counties\EditResponse;
use App\Repositories\Backend\Counties\CountyRepository;
use App\Http\Requests\Backend\Counties\ManageCountyRequest;
use App\Http\Requests\Backend\Counties\CreateCountyRequest;
use App\Http\Requests\Backend\Counties\StoreCountyRequest;
use App\Http\Requests\Backend\Counties\EditCountyRequest;
use App\Http\Requests\Backend\Counties\UpdateCountyRequest;
use App\Http\Requests\Backend\Counties\DeleteCountyRequest;

/**
 * CountiesController
 */
class CountiesController extends Controller
{
    /**
     * variable to store the repository object
     * @var CountyRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param CountyRepository $repository;
     */
    public function __construct(CountyRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\Counties\ManageCountyRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageCountyRequest $request)
    {
        return new ViewResponse('backend.counties.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateCountyRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Counties\CreateResponse
     */
    public function create(CreateCountyRequest $request)
    {
        return new CreateResponse('backend.counties.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreCountyRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreCountyRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.counties.index'), ['flash_success' => _tr('alerts.backend.counties.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\Counties\County  $county
     * @param  EditCountyRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Counties\EditResponse
     */
    public function edit(County $county, EditCountyRequest $request)
    {
        return new EditResponse($county);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateCountyRequestNamespace  $request
     * @param  App\Models\Counties\County  $county
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateCountyRequest $request, County $county)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $county, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.counties.index'), ['flash_success' => _tr('alerts.backend.counties.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteCountyRequestNamespace  $request
     * @param  App\Models\Counties\County  $county
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(County $county, DeleteCountyRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($county);
        //returning with successfull message
        return new RedirectResponse(route('admin.counties.index'), ['flash_success' => _tr('alerts.backend.counties.deleted')]);
    }
    
}
