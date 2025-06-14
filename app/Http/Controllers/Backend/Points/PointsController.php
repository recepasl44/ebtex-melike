<?php

namespace App\Http\Controllers\Backend\Points;

use App\Models\Points\Point;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\Points\CreateResponse;
use App\Http\Responses\Backend\Points\EditResponse;
use App\Repositories\Backend\Points\PointRepository;
use App\Http\Requests\Backend\Points\ManagePointRequest;
use App\Http\Requests\Backend\Points\CreatePointRequest;
use App\Http\Requests\Backend\Points\StorePointRequest;
use App\Http\Requests\Backend\Points\EditPointRequest;
use App\Http\Requests\Backend\Points\UpdatePointRequest;
use App\Http\Requests\Backend\Points\DeletePointRequest;

/**
 * PointsController
 */
class PointsController extends Controller
{
    /**
     * variable to store the repository object
     * @var PointRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param PointRepository $repository;
     */
    public function __construct(PointRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\Points\ManagePointRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManagePointRequest $request)
    {
        return new ViewResponse('backend.points.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreatePointRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Points\CreateResponse
     */
    public function create(CreatePointRequest $request)
    {
        return new CreateResponse('backend.points.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StorePointRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StorePointRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.points.index'), ['flash_success' => _tr('alerts.backend.points.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\Points\Point  $point
     * @param  EditPointRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Points\EditResponse
     */
    public function edit(Point $point, EditPointRequest $request)
    {
        return new EditResponse($point);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdatePointRequestNamespace  $request
     * @param  App\Models\Points\Point  $point
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdatePointRequest $request, Point $point)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $point, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.points.index'), ['flash_success' => _tr('alerts.backend.points.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeletePointRequestNamespace  $request
     * @param  App\Models\Points\Point  $point
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(Point $point, DeletePointRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($point);
        //returning with successfull message
        return new RedirectResponse(route('admin.points.index'), ['flash_success' => _tr('alerts.backend.points.deleted')]);
    }
    
}
