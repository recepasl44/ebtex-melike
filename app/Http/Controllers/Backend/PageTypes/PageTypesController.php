<?php

namespace App\Http\Controllers\Backend\PageTypes;

use App\Models\PageTypes\PageType;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\PageTypes\CreateResponse;
use App\Http\Responses\Backend\PageTypes\EditResponse;
use App\Repositories\Backend\PageTypes\PageTypeRepository;
use App\Http\Requests\Backend\PageTypes\ManagePageTypeRequest;
use App\Http\Requests\Backend\PageTypes\CreatePageTypeRequest;
use App\Http\Requests\Backend\PageTypes\StorePageTypeRequest;
use App\Http\Requests\Backend\PageTypes\EditPageTypeRequest;
use App\Http\Requests\Backend\PageTypes\UpdatePageTypeRequest;
use App\Http\Requests\Backend\PageTypes\DeletePageTypeRequest;

/**
 * PageTypesController
 */
class PageTypesController extends Controller
{
    /**
     * variable to store the repository object
     * @var PageTypeRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param PageTypeRepository $repository;
     */
    public function __construct(PageTypeRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\PageTypes\ManagePageTypeRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManagePageTypeRequest $request)
    {
        return new ViewResponse('backend.pagetypes.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreatePageTypeRequestNamespace  $request
     * @return \App\Http\Responses\Backend\PageTypes\CreateResponse
     */
    public function create(CreatePageTypeRequest $request)
    {
        return new CreateResponse('backend.pagetypes.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StorePageTypeRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StorePageTypeRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.pagetypes.index'), ['flash_success' => _tr('alerts.backend.pagetypes.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\PageTypes\PageType  $pagetype
     * @param  EditPageTypeRequestNamespace  $request
     * @return \App\Http\Responses\Backend\PageTypes\EditResponse
     */
    public function edit(PageType $pagetype, EditPageTypeRequest $request)
    {
        return new EditResponse($pagetype);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdatePageTypeRequestNamespace  $request
     * @param  App\Models\PageTypes\PageType  $pagetype
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdatePageTypeRequest $request, PageType $pagetype)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $pagetype, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.pagetypes.index'), ['flash_success' => _tr('alerts.backend.pagetypes.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeletePageTypeRequestNamespace  $request
     * @param  App\Models\PageTypes\PageType  $pagetype
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(PageType $pagetype, DeletePageTypeRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($pagetype);
        //returning with successfull message
        return new RedirectResponse(route('admin.pagetypes.index'), ['flash_success' => _tr('alerts.backend.pagetypes.deleted')]);
    }
    
}
