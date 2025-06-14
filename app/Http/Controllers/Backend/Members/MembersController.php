<?php

namespace App\Http\Controllers\Backend\Members;

use App\Models\Members\Member;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\Members\CreateResponse;
use App\Http\Responses\Backend\Members\EditResponse;
use App\Repositories\Backend\Members\MemberRepository;
use App\Http\Requests\Backend\Members\ManageMemberRequest;
use App\Http\Requests\Backend\Members\CreateMemberRequest;
use App\Http\Requests\Backend\Members\StoreMemberRequest;
use App\Http\Requests\Backend\Members\EditMemberRequest;
use App\Http\Requests\Backend\Members\UpdateMemberRequest;
use App\Http\Requests\Backend\Members\DeleteMemberRequest;

/**
 * MembersController
 */
class MembersController extends Controller
{
    /**
     * variable to store the repository object
     * @var MemberRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param MemberRepository $repository;
     */
    public function __construct(MemberRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\Members\ManageMemberRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageMemberRequest $request)
    {
        return new ViewResponse('backend.members.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateMemberRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Members\CreateResponse
     */
    public function create(CreateMemberRequest $request)
    {
        return new CreateResponse('backend.members.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreMemberRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreMemberRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token','remove_file']);
        //Create the model using repository create method
        if($request->hasFile('cover')){
            $input['cover']=$request->cover->store('img/members','public');
        }
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.members.index'), ['flash_success' => _tr('alerts.backend.members.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\Members\Member  $member
     * @param  EditMemberRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Members\EditResponse
     */
    public function edit(Member $member, EditMemberRequest $request)
    {
        return new EditResponse($member);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateMemberRequestNamespace  $request
     * @param  App\Models\Members\Member  $member
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateMemberRequest $request, Member $member)
    {
        //Input received from the request
        $input = $request->except(['_token','remove_file']);
        //Update the model using repository update method
        if($request->hasFile('cover')){
            $input['cover']=$request->cover->store('img/members','public');
        }
        if($request->remove_file){
            $input['cover'] = NULL;
        }
        $this->repository->update( $member, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.members.index'), ['flash_success' => _tr('alerts.backend.members.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteMemberRequestNamespace  $request
     * @param  App\Models\Members\Member  $member
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(Member $member, DeleteMemberRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($member);
        //returning with successfull message
        return new RedirectResponse(route('admin.members.index'), ['flash_success' => _tr('alerts.backend.members.deleted')]);
    }
    
}
