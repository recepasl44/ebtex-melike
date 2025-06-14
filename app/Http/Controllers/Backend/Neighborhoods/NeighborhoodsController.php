<?php

namespace App\Http\Controllers\Backend\Neighborhoods;

use App\Models\Neighborhoods\Neighborhood;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\Neighborhoods\CreateResponse;
use App\Http\Responses\Backend\Neighborhoods\EditResponse;
use App\Repositories\Backend\Neighborhoods\NeighborhoodRepository;
use App\Http\Requests\Backend\Neighborhoods\ManageNeighborhoodRequest;
use App\Http\Requests\Backend\Neighborhoods\CreateNeighborhoodRequest;
use App\Http\Requests\Backend\Neighborhoods\StoreNeighborhoodRequest;
use App\Http\Requests\Backend\Neighborhoods\EditNeighborhoodRequest;
use App\Http\Requests\Backend\Neighborhoods\UpdateNeighborhoodRequest;
use App\Http\Requests\Backend\Neighborhoods\DeleteNeighborhoodRequest;

/**
 * NeighborhoodsController
 */
class NeighborhoodsController extends Controller
{
    /**
     * variable to store the repository object
     * @var NeighborhoodRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param NeighborhoodRepository $repository;
     */
    public function __construct(NeighborhoodRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\Neighborhoods\ManageNeighborhoodRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageNeighborhoodRequest $request)
    {
        return new ViewResponse('backend.neighborhoods.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateNeighborhoodRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Neighborhoods\CreateResponse
     */
    public function create(CreateNeighborhoodRequest $request)
    {
        return new CreateResponse('backend.neighborhoods.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreNeighborhoodRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreNeighborhoodRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.neighborhoods.index'), ['flash_success' => _tr('alerts.backend.neighborhoods.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\Neighborhoods\Neighborhood  $neighborhood
     * @param  EditNeighborhoodRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Neighborhoods\EditResponse
     */
    public function edit(Neighborhood $neighborhood, EditNeighborhoodRequest $request)
    {
        return new EditResponse($neighborhood);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateNeighborhoodRequestNamespace  $request
     * @param  App\Models\Neighborhoods\Neighborhood  $neighborhood
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateNeighborhoodRequest $request, Neighborhood $neighborhood)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $neighborhood, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.neighborhoods.index'), ['flash_success' => _tr('alerts.backend.neighborhoods.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteNeighborhoodRequestNamespace  $request
     * @param  App\Models\Neighborhoods\Neighborhood  $neighborhood
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(Neighborhood $neighborhood, DeleteNeighborhoodRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($neighborhood);
        //returning with successfull message
        return new RedirectResponse(route('admin.neighborhoods.index'), ['flash_success' => _tr('alerts.backend.neighborhoods.deleted')]);
    }
    
}
