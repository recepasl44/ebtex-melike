<?php

namespace App\Http\Controllers\Backend\PaymentMethods;

use App\Models\PaymentMethods\PaymentMethod;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\PaymentMethods\CreateResponse;
use App\Http\Responses\Backend\PaymentMethods\EditResponse;
use App\Repositories\Backend\PaymentMethods\PaymentMethodRepository;
use App\Http\Requests\Backend\PaymentMethods\ManagePaymentMethodRequest;
use App\Http\Requests\Backend\PaymentMethods\CreatePaymentMethodRequest;
use App\Http\Requests\Backend\PaymentMethods\StorePaymentMethodRequest;
use App\Http\Requests\Backend\PaymentMethods\EditPaymentMethodRequest;
use App\Http\Requests\Backend\PaymentMethods\UpdatePaymentMethodRequest;
use App\Http\Requests\Backend\PaymentMethods\DeletePaymentMethodRequest;

/**
 * PaymentMethodsController
 */
class PaymentMethodsController extends Controller
{
    /**
     * variable to store the repository object
     * @var PaymentMethodRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param PaymentMethodRepository $repository;
     */
    public function __construct(PaymentMethodRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\PaymentMethods\ManagePaymentMethodRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManagePaymentMethodRequest $request)
    {
        return new ViewResponse('backend.paymentmethods.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreatePaymentMethodRequestNamespace  $request
     * @return \App\Http\Responses\Backend\PaymentMethods\CreateResponse
     */
    public function create(CreatePaymentMethodRequest $request)
    {
        return new CreateResponse('backend.paymentmethods.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StorePaymentMethodRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StorePaymentMethodRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.paymentmethods.index'), ['flash_success' => _tr('alerts.backend.paymentmethods.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\PaymentMethods\PaymentMethod  $paymentmethod
     * @param  EditPaymentMethodRequestNamespace  $request
     * @return \App\Http\Responses\Backend\PaymentMethods\EditResponse
     */
    public function edit(PaymentMethod $paymentmethod, EditPaymentMethodRequest $request)
    {
        return new EditResponse($paymentmethod);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdatePaymentMethodRequestNamespace  $request
     * @param  App\Models\PaymentMethods\PaymentMethod  $paymentmethod
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdatePaymentMethodRequest $request, PaymentMethod $paymentmethod)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $paymentmethod, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.paymentmethods.index'), ['flash_success' => _tr('alerts.backend.paymentmethods.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeletePaymentMethodRequestNamespace  $request
     * @param  App\Models\PaymentMethods\PaymentMethod  $paymentmethod
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(PaymentMethod $paymentmethod, DeletePaymentMethodRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($paymentmethod);
        //returning with successfull message
        return new RedirectResponse(route('admin.paymentmethods.index'), ['flash_success' => _tr('alerts.backend.paymentmethods.deleted')]);
    }
    
}
