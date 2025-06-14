<?php

namespace App\Http\Controllers\Backend\References;

use App\Models\References\Reference;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\References\CreateResponse;
use App\Http\Responses\Backend\References\EditResponse;
use App\Repositories\Backend\References\ReferenceRepository;
use App\Http\Requests\Backend\References\ManageReferenceRequest;
use App\Http\Requests\Backend\References\CreateReferenceRequest;
use App\Http\Requests\Backend\References\StoreReferenceRequest;
use App\Http\Requests\Backend\References\EditReferenceRequest;
use App\Http\Requests\Backend\References\UpdateReferenceRequest;
use App\Http\Requests\Backend\References\DeleteReferenceRequest;

/**
 * ReferencesController
 */
class ReferencesController extends Controller
{
    /**
     * variable to store the repository object
     * @var ReferenceRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param ReferenceRepository $repository;
     */
    public function __construct(ReferenceRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\References\ManageReferenceRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageReferenceRequest $request)
    {
        return new ViewResponse('backend.references.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateReferenceRequestNamespace  $request
     * @return \App\Http\Responses\Backend\References\CreateResponse
     */
    public function create(CreateReferenceRequest $request)
    {
        return new CreateResponse('backend.references.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreReferenceRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreReferenceRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token','remove_file']);
        //Create the model using repository create method
        if($request->hasFile('cover')){
            $input['cover']=$request->cover->store('img/references','public');
        }
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.references.index'), ['flash_success' => _tr('alerts.backend.references.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\References\Reference  $reference
     * @param  EditReferenceRequestNamespace  $request
     * @return \App\Http\Responses\Backend\References\EditResponse
     */
    public function edit(Reference $reference, EditReferenceRequest $request)
    {
        return new EditResponse($reference);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateReferenceRequestNamespace  $request
     * @param  App\Models\References\Reference  $reference
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateReferenceRequest $request, Reference $reference)
    {
        //Input received from the request
        $input = $request->except(['_token','remove_file']);
        //Update the model using repository update method
        if($request->hasFile('cover')){
            $input['cover']=$request->cover->store('img/references','public');
        }
        if($request->remove_file){
            $input['cover'] = NULL;
        }
        $this->repository->update( $reference, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.references.index'), ['flash_success' => _tr('alerts.backend.references.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteReferenceRequestNamespace  $request
     * @param  App\Models\References\Reference  $reference
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(Reference $reference, DeleteReferenceRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($reference);
        //returning with successfull message
        return new RedirectResponse(route('admin.references.index'), ['flash_success' => _tr('alerts.backend.references.deleted')]);
    }
    
}
