<?php

namespace App\Http\Controllers\Backend\Agreements;

use App\Models\Agreements\Agreement;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\Agreements\CreateResponse;
use App\Http\Responses\Backend\Agreements\EditResponse;
use App\Repositories\Backend\Agreements\AgreementRepository;
use App\Http\Requests\Backend\Agreements\ManageAgreementRequest;
use App\Http\Requests\Backend\Agreements\CreateAgreementRequest;
use App\Http\Requests\Backend\Agreements\StoreAgreementRequest;
use App\Http\Requests\Backend\Agreements\EditAgreementRequest;
use App\Http\Requests\Backend\Agreements\UpdateAgreementRequest;
use App\Http\Requests\Backend\Agreements\DeleteAgreementRequest;

/**
 * AgreementsController
 */
class AgreementsController extends Controller
{
    /**
     * variable to store the repository object
     * @var AgreementRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param AgreementRepository $repository;
     */
    public function __construct(AgreementRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\Agreements\ManageAgreementRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageAgreementRequest $request)
    {
        return new ViewResponse('backend.agreements.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateAgreementRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Agreements\CreateResponse
     */
    public function create(CreateAgreementRequest $request)
    {
        return new CreateResponse('backend.agreements.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreAgreementRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreAgreementRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.agreements.index'), ['flash_success' => _tr('alerts.backend.agreements.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\Agreements\Agreement  $agreement
     * @param  EditAgreementRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Agreements\EditResponse
     */
    public function edit(Agreement $agreement, EditAgreementRequest $request)
    {
        return new EditResponse($agreement);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateAgreementRequestNamespace  $request
     * @param  App\Models\Agreements\Agreement  $agreement
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateAgreementRequest $request, Agreement $agreement)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $agreement, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.agreements.index'), ['flash_success' => _tr('alerts.backend.agreements.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteAgreementRequestNamespace  $request
     * @param  App\Models\Agreements\Agreement  $agreement
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(Agreement $agreement, DeleteAgreementRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($agreement);
        //returning with successfull message
        return new RedirectResponse(route('admin.agreements.index'), ['flash_success' => _tr('alerts.backend.agreements.deleted')]);
    }
    
}
