<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\PaymentResource;
use App\Models\Payments\Payment;
use App\Repositories\Backend\Payments\PaymentRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * PaymentsController
 */
class PaymentsController extends APIController
{
    /**
     * __construct.
     *
     * @var PaymentRepository
     * @param $repository
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
     * Return the $payment.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return PaymentResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param Payment $payment
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Payment $payment)
    {
        return new PaymentResource($payment);
    }

    
     /**
      * Creates the Resource for payment.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validatePayment($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new PaymentResource(Payment::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update payment.
         *
         * @param Payment    $payment
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, Payment $payment)
    {
        $validation = $this->validatePayment($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($payment, $request->all());

        $payment = Payment::findOrfail($payment->id);

        return new PaymentResource($payment);
    }
    
    /**
     * Delete payment.
     *
     * @param Payment    $payment
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Payment $payment)
    {
        $this->repository->delete($payment);

        return $this->respond([
            'message' => _tr('alerts.backend.payment.deleted'),
        ]);
    }
    

    /**
     * validate payment.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validatePayment(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'student_id' => 'required',
               'installment_id' => 'required',
               'amount_paid' => 'required|decimal:2',
               'payment_date' => 'required|date',
               ]);

        return $validation;
    }

    /**
     * validate message for validate payment.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
