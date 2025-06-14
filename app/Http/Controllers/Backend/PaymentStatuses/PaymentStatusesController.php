<?php

namespace App\Http\Controllers\Backend\PaymentStatuses;

use App\Models\PaymentStatuses\PaymentStatus;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\PaymentStatuses\CreateResponse;
use App\Http\Responses\Backend\PaymentStatuses\EditResponse;
use App\Repositories\Backend\PaymentStatuses\PaymentStatusRepository;
use App\Http\Requests\Backend\PaymentStatuses\ManagePaymentStatusRequest;
use App\Http\Requests\Backend\PaymentStatuses\CreatePaymentStatusRequest;
use App\Http\Requests\Backend\PaymentStatuses\StorePaymentStatusRequest;
use App\Http\Requests\Backend\PaymentStatuses\EditPaymentStatusRequest;
use App\Http\Requests\Backend\PaymentStatuses\UpdatePaymentStatusRequest;
use App\Http\Requests\Backend\PaymentStatuses\DeletePaymentStatusRequest;

/**
 * PaymentStatusesController
 */
class PaymentStatusesController extends Controller
{
    /**
     * variable to store the repository object
     * @var PaymentStatusRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param PaymentStatusRepository $repository;
     */
    public function __construct(PaymentStatusRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\PaymentStatuses\ManagePaymentStatusRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManagePaymentStatusRequest $request)
    {
        return new ViewResponse('backend.paymentstatuses.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreatePaymentStatusRequestNamespace  $request
     * @return \App\Http\Responses\Backend\PaymentStatuses\CreateResponse
     */
    public function create(CreatePaymentStatusRequest $request)
    {
        return new CreateResponse('backend.paymentstatuses.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StorePaymentStatusRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StorePaymentStatusRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.paymentstatuses.index'), ['flash_success' => _tr('alerts.backend.paymentstatuses.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\PaymentStatuses\PaymentStatus  $paymentstatus
     * @param  EditPaymentStatusRequestNamespace  $request
     * @return \App\Http\Responses\Backend\PaymentStatuses\EditResponse
     */
    public function edit(PaymentStatus $paymentstatus, EditPaymentStatusRequest $request)
    {
        return new EditResponse($paymentstatus);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdatePaymentStatusRequestNamespace  $request
     * @param  App\Models\PaymentStatuses\PaymentStatus  $paymentstatus
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdatePaymentStatusRequest $request, PaymentStatus $paymentstatus)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $paymentstatus, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.paymentstatuses.index'), ['flash_success' => _tr('alerts.backend.paymentstatuses.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeletePaymentStatusRequestNamespace  $request
     * @param  App\Models\PaymentStatuses\PaymentStatus  $paymentstatus
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(PaymentStatus $paymentstatus, DeletePaymentStatusRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($paymentstatus);
        //returning with successfull message
        return new RedirectResponse(route('admin.paymentstatuses.index'), ['flash_success' => _tr('alerts.backend.paymentstatuses.deleted')]);
    }
    
}
