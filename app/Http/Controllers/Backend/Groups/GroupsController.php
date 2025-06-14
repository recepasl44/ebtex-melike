<?php

namespace App\Http\Controllers\Backend\Groups;

use App\Models\Groups\Group;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\Groups\CreateResponse;
use App\Http\Responses\Backend\Groups\EditResponse;
use App\Repositories\Backend\Groups\GroupRepository;
use App\Http\Requests\Backend\Groups\ManageGroupRequest;
use App\Http\Requests\Backend\Groups\CreateGroupRequest;
use App\Http\Requests\Backend\Groups\StoreGroupRequest;
use App\Http\Requests\Backend\Groups\EditGroupRequest;
use App\Http\Requests\Backend\Groups\UpdateGroupRequest;
use App\Http\Requests\Backend\Groups\DeleteGroupRequest;

/**
 * GroupsController
 */
class GroupsController extends Controller
{
    /**
     * variable to store the repository object
     * @var GroupRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param GroupRepository $repository;
     */
    public function __construct(GroupRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\Groups\ManageGroupRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageGroupRequest $request)
    {
        return new ViewResponse('backend.groups.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateGroupRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Groups\CreateResponse
     */
    public function create(CreateGroupRequest $request)
    {
        return new CreateResponse('backend.groups.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreGroupRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreGroupRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.groups.index'), ['flash_success' => _tr('alerts.backend.groups.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\Groups\Group  $group
     * @param  EditGroupRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Groups\EditResponse
     */
    public function edit(Group $group, EditGroupRequest $request)
    {
        return new EditResponse($group);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateGroupRequestNamespace  $request
     * @param  App\Models\Groups\Group  $group
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateGroupRequest $request, Group $group)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $group, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.groups.index'), ['flash_success' => _tr('alerts.backend.groups.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteGroupRequestNamespace  $request
     * @param  App\Models\Groups\Group  $group
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(Group $group, DeleteGroupRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($group);
        //returning with successfull message
        return new RedirectResponse(route('admin.groups.index'), ['flash_success' => _tr('alerts.backend.groups.deleted')]);
    }
    
}
