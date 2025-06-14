<?php

namespace App\Http\Controllers\Backend\WeightIndices;

use App\Models\WeightIndices\WeightIndex;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\WeightIndices\CreateResponse;
use App\Http\Responses\Backend\WeightIndices\EditResponse;
use App\Repositories\Backend\WeightIndices\WeightIndexRepository;
use App\Http\Requests\Backend\WeightIndices\ManageWeightIndexRequest;
use App\Http\Requests\Backend\WeightIndices\CreateWeightIndexRequest;
use App\Http\Requests\Backend\WeightIndices\StoreWeightIndexRequest;
use App\Http\Requests\Backend\WeightIndices\EditWeightIndexRequest;
use App\Http\Requests\Backend\WeightIndices\UpdateWeightIndexRequest;
use App\Http\Requests\Backend\WeightIndices\DeleteWeightIndexRequest;

/**
 * WeightIndicesController
 */
class WeightIndicesController extends Controller
{
    /**
     * variable to store the repository object
     * @var WeightIndexRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param WeightIndexRepository $repository;
     */
    public function __construct(WeightIndexRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\WeightIndices\ManageWeightIndexRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageWeightIndexRequest $request)
    {
        return new ViewResponse('backend.weightindices.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateWeightIndexRequestNamespace  $request
     * @return \App\Http\Responses\Backend\WeightIndices\CreateResponse
     */
    public function create(CreateWeightIndexRequest $request)
    {
        return new CreateResponse('backend.weightindices.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreWeightIndexRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreWeightIndexRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.weightindices.index'), ['flash_success' => _tr('alerts.backend.weightindices.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\WeightIndices\WeightIndex  $weightindex
     * @param  EditWeightIndexRequestNamespace  $request
     * @return \App\Http\Responses\Backend\WeightIndices\EditResponse
     */
    public function edit(WeightIndex $weightindex, EditWeightIndexRequest $request)
    {
        return new EditResponse($weightindex);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateWeightIndexRequestNamespace  $request
     * @param  App\Models\WeightIndices\WeightIndex  $weightindex
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateWeightIndexRequest $request, WeightIndex $weightindex)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $weightindex, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.weightindices.index'), ['flash_success' => _tr('alerts.backend.weightindices.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteWeightIndexRequestNamespace  $request
     * @param  App\Models\WeightIndices\WeightIndex  $weightindex
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(WeightIndex $weightindex, DeleteWeightIndexRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($weightindex);
        //returning with successfull message
        return new RedirectResponse(route('admin.weightindices.index'), ['flash_success' => _tr('alerts.backend.weightindices.deleted')]);
    }
    
}
