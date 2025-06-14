<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\PaymentStatusResource;
use App\Models\PaymentStatuses\PaymentStatus;
use App\Repositories\Backend\PaymentStatuses\PaymentStatusRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * PaymentStatusesController
 */
class PaymentStatusesController extends APIController
{
    /**
     * __construct.
     *
     * @var PaymentStatusRepository
     * @param $repository
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
     * Return the $paymentstatus.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return PaymentStatusResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param PaymentStatus $paymentstatus
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(PaymentStatus $paymentstatus)
    {
        return new PaymentStatusResource($paymentstatus);
    }

    
     /**
      * Creates the Resource for paymentstatus.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validatePaymentStatus($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new PaymentStatusResource(PaymentStatus::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update paymentstatus.
         *
         * @param PaymentStatus    $paymentstatus
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, PaymentStatus $paymentstatus)
    {
        $validation = $this->validatePaymentStatus($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($paymentstatus, $request->all());

        $paymentstatus = PaymentStatus::findOrfail($paymentstatus->id);

        return new PaymentStatusResource($paymentstatus);
    }
    
    /**
     * Delete paymentstatus.
     *
     * @param PaymentStatus    $paymentstatus
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(PaymentStatus $paymentstatus)
    {
        $this->repository->delete($paymentstatus);

        return $this->respond([
            'message' => _tr('alerts.backend.paymentstatus.deleted'),
        ]);
    }
    

    /**
     * validate paymentstatus.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validatePaymentStatus(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'name' => 'required|max:191',
               ]);

        return $validation;
    }

    /**
     * validate message for validate paymentstatus.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
