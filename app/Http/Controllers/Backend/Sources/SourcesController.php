<?php

namespace App\Http\Controllers\Backend\Sources;

use App\Models\Sources\Source;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\Sources\CreateResponse;
use App\Http\Responses\Backend\Sources\EditResponse;
use App\Repositories\Backend\Sources\SourceRepository;
use App\Http\Requests\Backend\Sources\ManageSourceRequest;
use App\Http\Requests\Backend\Sources\CreateSourceRequest;
use App\Http\Requests\Backend\Sources\StoreSourceRequest;
use App\Http\Requests\Backend\Sources\EditSourceRequest;
use App\Http\Requests\Backend\Sources\UpdateSourceRequest;
use App\Http\Requests\Backend\Sources\DeleteSourceRequest;

/**
 * SourcesController
 */
class SourcesController extends Controller
{
    /**
     * variable to store the repository object
     * @var SourceRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param SourceRepository $repository;
     */
    public function __construct(SourceRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\Sources\ManageSourceRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageSourceRequest $request)
    {
        return new ViewResponse('backend.sources.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateSourceRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Sources\CreateResponse
     */
    public function create(CreateSourceRequest $request)
    {
        return new CreateResponse('backend.sources.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreSourceRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreSourceRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.sources.index'), ['flash_success' => _tr('alerts.backend.sources.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\Sources\Source  $source
     * @param  EditSourceRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Sources\EditResponse
     */
    public function edit(Source $source, EditSourceRequest $request)
    {
        return new EditResponse($source);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateSourceRequestNamespace  $request
     * @param  App\Models\Sources\Source  $source
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateSourceRequest $request, Source $source)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $source, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.sources.index'), ['flash_success' => _tr('alerts.backend.sources.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteSourceRequestNamespace  $request
     * @param  App\Models\Sources\Source  $source
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(Source $source, DeleteSourceRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($source);
        //returning with successfull message
        return new RedirectResponse(route('admin.sources.index'), ['flash_success' => _tr('alerts.backend.sources.deleted')]);
    }
    
}
