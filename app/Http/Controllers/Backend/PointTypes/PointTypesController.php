<?php

namespace App\Http\Controllers\Backend\PointTypes;

use App\Models\PointTypes\PointType;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\PointTypes\CreateResponse;
use App\Http\Responses\Backend\PointTypes\EditResponse;
use App\Repositories\Backend\PointTypes\PointTypeRepository;
use App\Http\Requests\Backend\PointTypes\ManagePointTypeRequest;
use App\Http\Requests\Backend\PointTypes\CreatePointTypeRequest;
use App\Http\Requests\Backend\PointTypes\StorePointTypeRequest;
use App\Http\Requests\Backend\PointTypes\EditPointTypeRequest;
use App\Http\Requests\Backend\PointTypes\UpdatePointTypeRequest;
use App\Http\Requests\Backend\PointTypes\DeletePointTypeRequest;

/**
 * PointTypesController
 */
class PointTypesController extends Controller
{
    /**
     * variable to store the repository object
     * @var PointTypeRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param PointTypeRepository $repository;
     */
    public function __construct(PointTypeRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\PointTypes\ManagePointTypeRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManagePointTypeRequest $request)
    {
        return new ViewResponse('backend.pointtypes.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreatePointTypeRequestNamespace  $request
     * @return \App\Http\Responses\Backend\PointTypes\CreateResponse
     */
    public function create(CreatePointTypeRequest $request)
    {
        return new CreateResponse('backend.pointtypes.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StorePointTypeRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StorePointTypeRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.pointtypes.index'), ['flash_success' => _tr('alerts.backend.pointtypes.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\PointTypes\PointType  $pointtype
     * @param  EditPointTypeRequestNamespace  $request
     * @return \App\Http\Responses\Backend\PointTypes\EditResponse
     */
    public function edit(PointType $pointtype, EditPointTypeRequest $request)
    {
        return new EditResponse($pointtype);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdatePointTypeRequestNamespace  $request
     * @param  App\Models\PointTypes\PointType  $pointtype
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdatePointTypeRequest $request, PointType $pointtype)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $pointtype, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.pointtypes.index'), ['flash_success' => _tr('alerts.backend.pointtypes.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeletePointTypeRequestNamespace  $request
     * @param  App\Models\PointTypes\PointType  $pointtype
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(PointType $pointtype, DeletePointTypeRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($pointtype);
        //returning with successfull message
        return new RedirectResponse(route('admin.pointtypes.index'), ['flash_success' => _tr('alerts.backend.pointtypes.deleted')]);
    }
    
}
