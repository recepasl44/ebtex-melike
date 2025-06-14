<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\BookPaymentResource;
use App\Models\BookPayments\BookPayment;
use App\Repositories\Backend\BookPayments\BookPaymentRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * BookPaymentsController
 */
class BookPaymentsController extends APIController
{
    /**
     * __construct.
     *
     * @var BookPaymentRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param BookPaymentRepository $repository;
     */
    public function __construct(BookPaymentRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $bookpayment.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return BookPaymentResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param BookPayment $bookpayment
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(BookPayment $bookpayment)
    {
        return new BookPaymentResource($bookpayment);
    }
     /**
      * Creates the Resource for bookpayment.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateBookPayment($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new BookPaymentResource(BookPayment::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update bookpayment.
         *
         * @param BookPayment    $bookpayment
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, BookPayment $bookpayment)
    {
        $validation = $this->validateBookPayment($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($bookpayment, $request->all());

        $bookpayment = BookPayment::findOrfail($bookpayment->id);

        return new BookPaymentResource($bookpayment);
    }

    /**
     * validate bookpayment.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateBookPayment(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'total_books' => 'required',
               'unit_price' => 'required|decimal:2',
               'payment_method_id' => 'required',
               'payment_status_id' => 'required',
               'payment_document_url' => 'max:191',
               ]);

        return $validation;
    }

    /**
     * validate message for validate bookpayment.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
