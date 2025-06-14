<?php

namespace App\Http\Controllers\Backend\Installments;

use App\Models\Installments\Installment;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\Installments\CreateResponse;
use App\Http\Responses\Backend\Installments\EditResponse;
use App\Repositories\Backend\Installments\InstallmentRepository;
use App\Http\Requests\Backend\Installments\ManageInstallmentRequest;
use App\Http\Requests\Backend\Installments\CreateInstallmentRequest;
use App\Http\Requests\Backend\Installments\StoreInstallmentRequest;
use App\Http\Requests\Backend\Installments\EditInstallmentRequest;
use App\Http\Requests\Backend\Installments\UpdateInstallmentRequest;
use App\Http\Requests\Backend\Installments\DeleteInstallmentRequest;

/**
 * InstallmentsController
 */
class InstallmentsController extends Controller
{
    /**
     * variable to store the repository object
     * @var InstallmentRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param InstallmentRepository $repository;
     */
    public function __construct(InstallmentRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\Installments\ManageInstallmentRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageInstallmentRequest $request)
    {
        return new ViewResponse('backend.installments.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateInstallmentRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Installments\CreateResponse
     */
    public function create(CreateInstallmentRequest $request)
    {
        return new CreateResponse('backend.installments.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreInstallmentRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreInstallmentRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.installments.index'), ['flash_success' => _tr('alerts.backend.installments.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\Installments\Installment  $installment
     * @param  EditInstallmentRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Installments\EditResponse
     */
    public function edit(Installment $installment, EditInstallmentRequest $request)
    {
        return new EditResponse($installment);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateInstallmentRequestNamespace  $request
     * @param  App\Models\Installments\Installment  $installment
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateInstallmentRequest $request, Installment $installment)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $installment, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.installments.index'), ['flash_success' => _tr('alerts.backend.installments.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteInstallmentRequestNamespace  $request
     * @param  App\Models\Installments\Installment  $installment
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(Installment $installment, DeleteInstallmentRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($installment);
        //returning with successfull message
        return new RedirectResponse(route('admin.installments.index'), ['flash_success' => _tr('alerts.backend.installments.deleted')]);
    }
    
}
