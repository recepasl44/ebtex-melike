<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\PaymentMethodResource;
use App\Models\PaymentMethods\PaymentMethod;
use App\Repositories\Backend\PaymentMethods\PaymentMethodRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * PaymentMethodsController
 */
class PaymentMethodsController extends APIController
{
    /**
     * __construct.
     *
     * @var PaymentMethodRepository
     * @param $repository
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
     * Return the $paymentmethod.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return PaymentMethodResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param PaymentMethod $paymentmethod
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(PaymentMethod $paymentmethod)
    {
        return new PaymentMethodResource($paymentmethod);
    }

    
     /**
      * Creates the Resource for paymentmethod.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validatePaymentMethod($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new PaymentMethodResource(PaymentMethod::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update paymentmethod.
         *
         * @param PaymentMethod    $paymentmethod
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, PaymentMethod $paymentmethod)
    {
        $validation = $this->validatePaymentMethod($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($paymentmethod, $request->all());

        $paymentmethod = PaymentMethod::findOrfail($paymentmethod->id);

        return new PaymentMethodResource($paymentmethod);
    }
    
    /**
     * Delete paymentmethod.
     *
     * @param PaymentMethod    $paymentmethod
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(PaymentMethod $paymentmethod)
    {
        $this->repository->delete($paymentmethod);

        return $this->respond([
            'message' => _tr('alerts.backend.paymentmethod.deleted'),
        ]);
    }
    

    /**
     * validate paymentmethod.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validatePaymentMethod(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'name' => 'required',
               ]);

        return $validation;
    }

    /**
     * validate message for validate paymentmethod.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
