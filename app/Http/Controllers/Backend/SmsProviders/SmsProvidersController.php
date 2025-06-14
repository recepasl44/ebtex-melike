<?php

namespace App\Http\Controllers\Backend\SmsProviders;

use App\Models\SmsProviders\SmsProvider;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\SmsProviders\CreateResponse;
use App\Http\Responses\Backend\SmsProviders\EditResponse;
use App\Repositories\Backend\SmsProviders\SmsProviderRepository;
use App\Http\Requests\Backend\SmsProviders\ManageSmsProviderRequest;
use App\Http\Requests\Backend\SmsProviders\CreateSmsProviderRequest;
use App\Http\Requests\Backend\SmsProviders\StoreSmsProviderRequest;
use App\Http\Requests\Backend\SmsProviders\EditSmsProviderRequest;
use App\Http\Requests\Backend\SmsProviders\UpdateSmsProviderRequest;
use App\Http\Requests\Backend\SmsProviders\DeleteSmsProviderRequest;

/**
 * SmsProvidersController
 */
class SmsProvidersController extends Controller
{
    /**
     * variable to store the repository object
     * @var SmsProviderRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param SmsProviderRepository $repository;
     */
    public function __construct(SmsProviderRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\SmsProviders\ManageSmsProviderRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageSmsProviderRequest $request)
    {
        return new ViewResponse('backend.smsproviders.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateSmsProviderRequestNamespace  $request
     * @return \App\Http\Responses\Backend\SmsProviders\CreateResponse
     */
    public function create(CreateSmsProviderRequest $request)
    {
        return new CreateResponse('backend.smsproviders.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreSmsProviderRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreSmsProviderRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.smsproviders.index'), ['flash_success' => _tr('alerts.backend.smsproviders.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\SmsProviders\SmsProvider  $smsprovider
     * @param  EditSmsProviderRequestNamespace  $request
     * @return \App\Http\Responses\Backend\SmsProviders\EditResponse
     */
    public function edit(SmsProvider $smsprovider, EditSmsProviderRequest $request)
    {
        return new EditResponse($smsprovider);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateSmsProviderRequestNamespace  $request
     * @param  App\Models\SmsProviders\SmsProvider  $smsprovider
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateSmsProviderRequest $request, SmsProvider $smsprovider)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $smsprovider, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.smsproviders.index'), ['flash_success' => _tr('alerts.backend.smsproviders.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteSmsProviderRequestNamespace  $request
     * @param  App\Models\SmsProviders\SmsProvider  $smsprovider
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(SmsProvider $smsprovider, DeleteSmsProviderRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($smsprovider);
        //returning with successfull message
        return new RedirectResponse(route('admin.smsproviders.index'), ['flash_success' => _tr('alerts.backend.smsproviders.deleted')]);
    }
    
}
