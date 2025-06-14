<?php

namespace App\Http\Controllers\Backend\Units;

use App\Models\Units\Unit;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\Units\CreateResponse;
use App\Http\Responses\Backend\Units\EditResponse;
use App\Repositories\Backend\Units\UnitRepository;
use App\Http\Requests\Backend\Units\ManageUnitRequest;
use App\Http\Requests\Backend\Units\CreateUnitRequest;
use App\Http\Requests\Backend\Units\StoreUnitRequest;
use App\Http\Requests\Backend\Units\EditUnitRequest;
use App\Http\Requests\Backend\Units\UpdateUnitRequest;
use App\Http\Requests\Backend\Units\DeleteUnitRequest;

/**
 * UnitsController
 */
class UnitsController extends Controller
{
    /**
     * variable to store the repository object
     * @var UnitRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param UnitRepository $repository;
     */
    public function __construct(UnitRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\Units\ManageUnitRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageUnitRequest $request)
    {
        return new ViewResponse('backend.units.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateUnitRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Units\CreateResponse
     */
    public function create(CreateUnitRequest $request)
    {
        return new CreateResponse('backend.units.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreUnitRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreUnitRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.units.index'), ['flash_success' => _tr('alerts.backend.units.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\Units\Unit  $unit
     * @param  EditUnitRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Units\EditResponse
     */
    public function edit(Unit $unit, EditUnitRequest $request)
    {
        return new EditResponse($unit);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateUnitRequestNamespace  $request
     * @param  App\Models\Units\Unit  $unit
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateUnitRequest $request, Unit $unit)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $unit, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.units.index'), ['flash_success' => _tr('alerts.backend.units.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteUnitRequestNamespace  $request
     * @param  App\Models\Units\Unit  $unit
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(Unit $unit, DeleteUnitRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($unit);
        //returning with successfull message
        return new RedirectResponse(route('admin.units.index'), ['flash_success' => _tr('alerts.backend.units.deleted')]);
    }
    
}
