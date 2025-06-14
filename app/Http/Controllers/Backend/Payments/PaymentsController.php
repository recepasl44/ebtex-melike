<?php

namespace App\Http\Controllers\Backend\Payments;

use App\Models\Payments\Payment;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\Payments\CreateResponse;
use App\Http\Responses\Backend\Payments\EditResponse;
use App\Repositories\Backend\Payments\PaymentRepository;
use App\Http\Requests\Backend\Payments\ManagePaymentRequest;
use App\Http\Requests\Backend\Payments\CreatePaymentRequest;
use App\Http\Requests\Backend\Payments\StorePaymentRequest;
use App\Http\Requests\Backend\Payments\EditPaymentRequest;
use App\Http\Requests\Backend\Payments\UpdatePaymentRequest;
use App\Http\Requests\Backend\Payments\DeletePaymentRequest;

/**
 * PaymentsController
 */
class PaymentsController extends Controller
{
    /**
     * variable to store the repository object
     * @var PaymentRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param PaymentRepository $repository;
     */
    public function __construct(PaymentRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\Payments\ManagePaymentRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManagePaymentRequest $request)
    {
        return new ViewResponse('backend.payments.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreatePaymentRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Payments\CreateResponse
     */
    public function create(CreatePaymentRequest $request)
    {
        return new CreateResponse('backend.payments.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StorePaymentRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StorePaymentRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.payments.index'), ['flash_success' => _tr('alerts.backend.payments.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\Payments\Payment  $payment
     * @param  EditPaymentRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Payments\EditResponse
     */
    public function edit(Payment $payment, EditPaymentRequest $request)
    {
        return new EditResponse($payment);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdatePaymentRequestNamespace  $request
     * @param  App\Models\Payments\Payment  $payment
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdatePaymentRequest $request, Payment $payment)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $payment, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.payments.index'), ['flash_success' => _tr('alerts.backend.payments.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeletePaymentRequestNamespace  $request
     * @param  App\Models\Payments\Payment  $payment
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(Payment $payment, DeletePaymentRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($payment);
        //returning with successfull message
        return new RedirectResponse(route('admin.payments.index'), ['flash_success' => _tr('alerts.backend.payments.deleted')]);
    }
    
}
