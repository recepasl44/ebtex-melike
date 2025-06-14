<?php

namespace App\Http\Controllers\Backend\SourceTypes;

use App\Models\SourceTypes\SourceType;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\SourceTypes\CreateResponse;
use App\Http\Responses\Backend\SourceTypes\EditResponse;
use App\Repositories\Backend\SourceTypes\SourceTypeRepository;
use App\Http\Requests\Backend\SourceTypes\ManageSourceTypeRequest;
use App\Http\Requests\Backend\SourceTypes\CreateSourceTypeRequest;
use App\Http\Requests\Backend\SourceTypes\StoreSourceTypeRequest;
use App\Http\Requests\Backend\SourceTypes\EditSourceTypeRequest;
use App\Http\Requests\Backend\SourceTypes\UpdateSourceTypeRequest;
use App\Http\Requests\Backend\SourceTypes\DeleteSourceTypeRequest;

/**
 * SourceTypesController
 */
class SourceTypesController extends Controller
{
    /**
     * variable to store the repository object
     * @var SourceTypeRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param SourceTypeRepository $repository;
     */
    public function __construct(SourceTypeRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\SourceTypes\ManageSourceTypeRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageSourceTypeRequest $request)
    {
        return new ViewResponse('backend.sourcetypes.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateSourceTypeRequestNamespace  $request
     * @return \App\Http\Responses\Backend\SourceTypes\CreateResponse
     */
    public function create(CreateSourceTypeRequest $request)
    {
        return new CreateResponse('backend.sourcetypes.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreSourceTypeRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreSourceTypeRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.sourcetypes.index'), ['flash_success' => _tr('alerts.backend.sourcetypes.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\SourceTypes\SourceType  $sourcetype
     * @param  EditSourceTypeRequestNamespace  $request
     * @return \App\Http\Responses\Backend\SourceTypes\EditResponse
     */
    public function edit(SourceType $sourcetype, EditSourceTypeRequest $request)
    {
        return new EditResponse($sourcetype);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateSourceTypeRequestNamespace  $request
     * @param  App\Models\SourceTypes\SourceType  $sourcetype
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateSourceTypeRequest $request, SourceType $sourcetype)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $sourcetype, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.sourcetypes.index'), ['flash_success' => _tr('alerts.backend.sourcetypes.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteSourceTypeRequestNamespace  $request
     * @param  App\Models\SourceTypes\SourceType  $sourcetype
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(SourceType $sourcetype, DeleteSourceTypeRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($sourcetype);
        //returning with successfull message
        return new RedirectResponse(route('admin.sourcetypes.index'), ['flash_success' => _tr('alerts.backend.sourcetypes.deleted')]);
    }
    
}
