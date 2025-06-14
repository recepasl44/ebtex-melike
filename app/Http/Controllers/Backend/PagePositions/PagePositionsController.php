<?php

namespace App\Http\Controllers\Backend\PagePositions;

use App\Models\PagePositions\PagePosition;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\PagePositions\CreateResponse;
use App\Http\Responses\Backend\PagePositions\EditResponse;
use App\Repositories\Backend\PagePositions\PagePositionRepository;
use App\Http\Requests\Backend\PagePositions\ManagePagePositionRequest;
use App\Http\Requests\Backend\PagePositions\CreatePagePositionRequest;
use App\Http\Requests\Backend\PagePositions\StorePagePositionRequest;
use App\Http\Requests\Backend\PagePositions\EditPagePositionRequest;
use App\Http\Requests\Backend\PagePositions\UpdatePagePositionRequest;
use App\Http\Requests\Backend\PagePositions\DeletePagePositionRequest;

/**
 * PagePositionsController
 */
class PagePositionsController extends Controller
{
    /**
     * variable to store the repository object
     * @var PagePositionRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param PagePositionRepository $repository;
     */
    public function __construct(PagePositionRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\PagePositions\ManagePagePositionRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManagePagePositionRequest $request)
    {
        return new ViewResponse('backend.pagepositions.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreatePagePositionRequestNamespace  $request
     * @return \App\Http\Responses\Backend\PagePositions\CreateResponse
     */
    public function create(CreatePagePositionRequest $request)
    {
        return new CreateResponse('backend.pagepositions.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StorePagePositionRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StorePagePositionRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.pagepositions.index'), ['flash_success' => _tr('alerts.backend.pagepositions.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\PagePositions\PagePosition  $pageposition
     * @param  EditPagePositionRequestNamespace  $request
     * @return \App\Http\Responses\Backend\PagePositions\EditResponse
     */
    public function edit(PagePosition $pageposition, EditPagePositionRequest $request)
    {
        return new EditResponse($pageposition);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdatePagePositionRequestNamespace  $request
     * @param  App\Models\PagePositions\PagePosition  $pageposition
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdatePagePositionRequest $request, PagePosition $pageposition)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $pageposition, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.pagepositions.index'), ['flash_success' => _tr('alerts.backend.pagepositions.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeletePagePositionRequestNamespace  $request
     * @param  App\Models\PagePositions\PagePosition  $pageposition
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(PagePosition $pageposition, DeletePagePositionRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($pageposition);
        //returning with successfull message
        return new RedirectResponse(route('admin.pagepositions.index'), ['flash_success' => _tr('alerts.backend.pagepositions.deleted')]);
    }
    
}
