<?php

namespace App\Http\Controllers\Backend\SocialTypes;

use App\Models\SocialTypes\SocialType;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\SocialTypes\CreateResponse;
use App\Http\Responses\Backend\SocialTypes\EditResponse;
use App\Repositories\Backend\SocialTypes\SocialTypeRepository;
use App\Http\Requests\Backend\SocialTypes\ManageSocialTypeRequest;
use App\Http\Requests\Backend\SocialTypes\CreateSocialTypeRequest;
use App\Http\Requests\Backend\SocialTypes\StoreSocialTypeRequest;
use App\Http\Requests\Backend\SocialTypes\EditSocialTypeRequest;
use App\Http\Requests\Backend\SocialTypes\UpdateSocialTypeRequest;
use App\Http\Requests\Backend\SocialTypes\DeleteSocialTypeRequest;

/**
 * SocialTypesController
 */
class SocialTypesController extends Controller
{
    /**
     * variable to store the repository object
     * @var SocialTypeRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param SocialTypeRepository $repository;
     */
    public function __construct(SocialTypeRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\SocialTypes\ManageSocialTypeRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageSocialTypeRequest $request)
    {
        return new ViewResponse('backend.socialtypes.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateSocialTypeRequestNamespace  $request
     * @return \App\Http\Responses\Backend\SocialTypes\CreateResponse
     */
    public function create(CreateSocialTypeRequest $request)
    {
        return new CreateResponse('backend.socialtypes.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreSocialTypeRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreSocialTypeRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.socialtypes.index'), ['flash_success' => _tr('alerts.backend.socialtypes.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\SocialTypes\SocialType  $socialtype
     * @param  EditSocialTypeRequestNamespace  $request
     * @return \App\Http\Responses\Backend\SocialTypes\EditResponse
     */
    public function edit(SocialType $socialtype, EditSocialTypeRequest $request)
    {
        return new EditResponse($socialtype);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateSocialTypeRequestNamespace  $request
     * @param  App\Models\SocialTypes\SocialType  $socialtype
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateSocialTypeRequest $request, SocialType $socialtype)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $socialtype, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.socialtypes.index'), ['flash_success' => _tr('alerts.backend.socialtypes.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteSocialTypeRequestNamespace  $request
     * @param  App\Models\SocialTypes\SocialType  $socialtype
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(SocialType $socialtype, DeleteSocialTypeRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($socialtype);
        //returning with successfull message
        return new RedirectResponse(route('admin.socialtypes.index'), ['flash_success' => _tr('alerts.backend.socialtypes.deleted')]);
    }
    
}
