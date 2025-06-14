<?php

namespace App\Http\Controllers\Backend\Routes;

use App\Models\Routes\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\Routes\CreateResponse;
use App\Http\Responses\Backend\Routes\EditResponse;
use App\Repositories\Backend\Routes\RouteRepository;
use App\Http\Requests\Backend\Routes\ManageRouteRequest;
use App\Http\Requests\Backend\Routes\CreateRouteRequest;
use App\Http\Requests\Backend\Routes\StoreRouteRequest;
use App\Http\Requests\Backend\Routes\EditRouteRequest;
use App\Http\Requests\Backend\Routes\UpdateRouteRequest;
use App\Http\Requests\Backend\Routes\DeleteRouteRequest;

/**
 * RoutesController
 */
class RoutesController extends Controller
{
    /**
     * variable to store the repository object
     * @var RouteRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param RouteRepository $repository;
     */
    public function __construct(RouteRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\Routes\ManageRouteRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageRouteRequest $request)
    {
        return new ViewResponse('backend.routes.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateRouteRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Routes\CreateResponse
     */
    public function create(CreateRouteRequest $request)
    {
        return new CreateResponse('backend.routes.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreRouteRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreRouteRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.routes.index'), ['flash_success' => _tr('alerts.backend.routes.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\Routes\Route  $route
     * @param  EditRouteRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Routes\EditResponse
     */
    public function edit(Route $route, EditRouteRequest $request)
    {
        return new EditResponse($route);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateRouteRequestNamespace  $request
     * @param  App\Models\Routes\Route  $route
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateRouteRequest $request, Route $route)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $route, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.routes.index'), ['flash_success' => _tr('alerts.backend.routes.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteRouteRequestNamespace  $request
     * @param  App\Models\Routes\Route  $route
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(Route $route, DeleteRouteRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($route);
        //returning with successfull message
        return new RedirectResponse(route('admin.routes.index'), ['flash_success' => _tr('alerts.backend.routes.deleted')]);
    }
    
}
