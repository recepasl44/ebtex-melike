<?php

namespace App\Http\Controllers\Backend\GroupTypes;

use App\Models\GroupTypes\GroupType;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\GroupTypes\CreateResponse;
use App\Http\Responses\Backend\GroupTypes\EditResponse;
use App\Repositories\Backend\GroupTypes\GroupTypeRepository;
use App\Http\Requests\Backend\GroupTypes\ManageGroupTypeRequest;
use App\Http\Requests\Backend\GroupTypes\CreateGroupTypeRequest;
use App\Http\Requests\Backend\GroupTypes\StoreGroupTypeRequest;
use App\Http\Requests\Backend\GroupTypes\EditGroupTypeRequest;
use App\Http\Requests\Backend\GroupTypes\UpdateGroupTypeRequest;
use App\Http\Requests\Backend\GroupTypes\DeleteGroupTypeRequest;

/**
 * GroupTypesController
 */
class GroupTypesController extends Controller
{
    /**
     * variable to store the repository object
     * @var GroupTypeRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param GroupTypeRepository $repository;
     */
    public function __construct(GroupTypeRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\GroupTypes\ManageGroupTypeRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageGroupTypeRequest $request)
    {
        return new ViewResponse('backend.grouptypes.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateGroupTypeRequestNamespace  $request
     * @return \App\Http\Responses\Backend\GroupTypes\CreateResponse
     */
    public function create(CreateGroupTypeRequest $request)
    {
        return new CreateResponse('backend.grouptypes.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreGroupTypeRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreGroupTypeRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.grouptypes.index'), ['flash_success' => _tr('alerts.backend.grouptypes.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\GroupTypes\GroupType  $grouptype
     * @param  EditGroupTypeRequestNamespace  $request
     * @return \App\Http\Responses\Backend\GroupTypes\EditResponse
     */
    public function edit(GroupType $grouptype, EditGroupTypeRequest $request)
    {
        return new EditResponse($grouptype);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateGroupTypeRequestNamespace  $request
     * @param  App\Models\GroupTypes\GroupType  $grouptype
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateGroupTypeRequest $request, GroupType $grouptype)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $grouptype, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.grouptypes.index'), ['flash_success' => _tr('alerts.backend.grouptypes.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteGroupTypeRequestNamespace  $request
     * @param  App\Models\GroupTypes\GroupType  $grouptype
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(GroupType $grouptype, DeleteGroupTypeRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($grouptype);
        //returning with successfull message
        return new RedirectResponse(route('admin.grouptypes.index'), ['flash_success' => _tr('alerts.backend.grouptypes.deleted')]);
    }
    
}
