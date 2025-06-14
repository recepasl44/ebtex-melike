<?php

namespace App\Http\Controllers\Backend\Socials;

use App\Models\Socials\Social;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\Socials\CreateResponse;
use App\Http\Responses\Backend\Socials\EditResponse;
use App\Repositories\Backend\Socials\SocialRepository;
use App\Http\Requests\Backend\Socials\ManageSocialRequest;
use App\Http\Requests\Backend\Socials\CreateSocialRequest;
use App\Http\Requests\Backend\Socials\StoreSocialRequest;
use App\Http\Requests\Backend\Socials\EditSocialRequest;
use App\Http\Requests\Backend\Socials\UpdateSocialRequest;
use App\Http\Requests\Backend\Socials\DeleteSocialRequest;

/**
 * SocialsController
 */
class SocialsController extends Controller
{
    /**
     * variable to store the repository object
     * @var SocialRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param SocialRepository $repository;
     */
    public function __construct(SocialRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\Socials\ManageSocialRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageSocialRequest $request)
    {
        return new ViewResponse('backend.socials.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateSocialRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Socials\CreateResponse
     */
    public function create(CreateSocialRequest $request)
    {
        return new CreateResponse('backend.socials.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreSocialRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreSocialRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.socials.index'), ['flash_success' => _tr('alerts.backend.socials.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\Socials\Social  $social
     * @param  EditSocialRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Socials\EditResponse
     */
    public function edit($social, EditSocialRequest $request)
    {
        $social = $this->repository->find($social);
        return new EditResponse($social);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateSocialRequestNamespace  $request
     * @param  App\Models\Socials\Social  $social
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateSocialRequest $request, $social)
    {
        $social = $this->repository->find($social);
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $social, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.socials.index'), ['flash_success' => _tr('alerts.backend.socials.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteSocialRequestNamespace  $request
     * @param  App\Models\Socials\Social  $social
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy($social, DeleteSocialRequest $request)
    {
        $social = $this->repository->find($social);
        //Calling the delete method on repository
        $this->repository->delete($social);
        //returning with successfull message
        return new RedirectResponse(route('admin.socials.index'), ['flash_success' => _tr('alerts.backend.socials.deleted')]);
    }
    
}
