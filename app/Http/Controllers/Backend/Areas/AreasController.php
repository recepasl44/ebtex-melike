<?php

namespace App\Http\Controllers\Backend\Areas;

use App\Models\Areas\Area;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\Areas\CreateResponse;
use App\Http\Responses\Backend\Areas\EditResponse;
use App\Repositories\Backend\Areas\AreaRepository;
use App\Http\Requests\Backend\Areas\ManageAreaRequest;
use App\Http\Requests\Backend\Areas\CreateAreaRequest;
use App\Http\Requests\Backend\Areas\StoreAreaRequest;
use App\Http\Requests\Backend\Areas\EditAreaRequest;
use App\Http\Requests\Backend\Areas\UpdateAreaRequest;
use App\Http\Requests\Backend\Areas\DeleteAreaRequest;

/**
 * AreasController
 */
class AreasController extends Controller
{
    /**
     * variable to store the repository object
     * @var AreaRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param AreaRepository $repository;
     */
    public function __construct(AreaRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\Areas\ManageAreaRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageAreaRequest $request)
    {
        return new ViewResponse('backend.areas.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateAreaRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Areas\CreateResponse
     */
    public function create(CreateAreaRequest $request)
    {
        return new CreateResponse('backend.areas.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreAreaRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreAreaRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.areas.index'), ['flash_success' => _tr('alerts.backend.areas.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\Areas\Area  $area
     * @param  EditAreaRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Areas\EditResponse
     */
    public function edit(Area $area, EditAreaRequest $request)
    {
        return new EditResponse($area);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateAreaRequestNamespace  $request
     * @param  App\Models\Areas\Area  $area
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateAreaRequest $request, Area $area)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $area, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.areas.index'), ['flash_success' => _tr('alerts.backend.areas.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteAreaRequestNamespace  $request
     * @param  App\Models\Areas\Area  $area
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(Area $area, DeleteAreaRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($area);
        //returning with successfull message
        return new RedirectResponse(route('admin.areas.index'), ['flash_success' => _tr('alerts.backend.areas.deleted')]);
    }
    
}
