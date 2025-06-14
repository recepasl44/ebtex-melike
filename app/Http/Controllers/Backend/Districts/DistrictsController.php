<?php

namespace App\Http\Controllers\Backend\Districts;

use App\Models\Districts\District;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\Districts\CreateResponse;
use App\Http\Responses\Backend\Districts\EditResponse;
use App\Repositories\Backend\Districts\DistrictRepository;
use App\Http\Requests\Backend\Districts\ManageDistrictRequest;
use App\Http\Requests\Backend\Districts\CreateDistrictRequest;
use App\Http\Requests\Backend\Districts\StoreDistrictRequest;
use App\Http\Requests\Backend\Districts\EditDistrictRequest;
use App\Http\Requests\Backend\Districts\UpdateDistrictRequest;
use App\Http\Requests\Backend\Districts\DeleteDistrictRequest;

/**
 * DistrictsController
 */
class DistrictsController extends Controller
{
    /**
     * variable to store the repository object
     * @var DistrictRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param DistrictRepository $repository;
     */
    public function __construct(DistrictRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\Districts\ManageDistrictRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageDistrictRequest $request)
    {
        return new ViewResponse('backend.districts.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateDistrictRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Districts\CreateResponse
     */
    public function create(CreateDistrictRequest $request)
    {
        return new CreateResponse('backend.districts.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreDistrictRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreDistrictRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.districts.index'), ['flash_success' => _tr('alerts.backend.districts.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\Districts\District  $district
     * @param  EditDistrictRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Districts\EditResponse
     */
    public function edit(District $district, EditDistrictRequest $request)
    {
        return new EditResponse($district);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateDistrictRequestNamespace  $request
     * @param  App\Models\Districts\District  $district
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateDistrictRequest $request, District $district)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $district, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.districts.index'), ['flash_success' => _tr('alerts.backend.districts.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteDistrictRequestNamespace  $request
     * @param  App\Models\Districts\District  $district
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(District $district, DeleteDistrictRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($district);
        //returning with successfull message
        return new RedirectResponse(route('admin.districts.index'), ['flash_success' => _tr('alerts.backend.districts.deleted')]);
    }
    
}
