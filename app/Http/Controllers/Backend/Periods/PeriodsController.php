<?php

namespace App\Http\Controllers\Backend\Periods;

use App\Models\Periods\Period;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\Periods\CreateResponse;
use App\Http\Responses\Backend\Periods\EditResponse;
use App\Repositories\Backend\Periods\PeriodRepository;
use App\Http\Requests\Backend\Periods\ManagePeriodRequest;
use App\Http\Requests\Backend\Periods\CreatePeriodRequest;
use App\Http\Requests\Backend\Periods\StorePeriodRequest;
use App\Http\Requests\Backend\Periods\EditPeriodRequest;
use App\Http\Requests\Backend\Periods\UpdatePeriodRequest;
use App\Http\Requests\Backend\Periods\DeletePeriodRequest;

/**
 * PeriodsController
 */
class PeriodsController extends Controller
{
    /**
     * variable to store the repository object
     * @var PeriodRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param PeriodRepository $repository;
     */
    public function __construct(PeriodRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\Periods\ManagePeriodRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManagePeriodRequest $request)
    {
        return new ViewResponse('backend.periods.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreatePeriodRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Periods\CreateResponse
     */
    public function create(CreatePeriodRequest $request)
    {
        return new CreateResponse('backend.periods.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StorePeriodRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StorePeriodRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.periods.index'), ['flash_success' => _tr('alerts.backend.periods.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\Periods\Period  $period
     * @param  EditPeriodRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Periods\EditResponse
     */
    public function edit(Period $period, EditPeriodRequest $request)
    {
        return new EditResponse($period);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdatePeriodRequestNamespace  $request
     * @param  App\Models\Periods\Period  $period
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdatePeriodRequest $request, Period $period)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $period, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.periods.index'), ['flash_success' => _tr('alerts.backend.periods.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeletePeriodRequestNamespace  $request
     * @param  App\Models\Periods\Period  $period
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(Period $period, DeletePeriodRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($period);
        //returning with successfull message
        return new RedirectResponse(route('admin.periods.index'), ['flash_success' => _tr('alerts.backend.periods.deleted')]);
    }
    
}
