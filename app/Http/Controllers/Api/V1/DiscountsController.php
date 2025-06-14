<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\DiscountResource;
use App\Models\Discounts\Discount;
use App\Repositories\Backend\Discounts\DiscountRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * DiscountsController
 */
class DiscountsController extends APIController
{
    /**
     * __construct.
     *
     * @var DiscountRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param DiscountRepository $repository;
     */
    public function __construct(DiscountRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $discount.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return DiscountResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param Discount $discount
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Discount $discount)
    {
        return new DiscountResource($discount);
    }

    
     /**
      * Creates the Resource for discount.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateDiscount($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new DiscountResource(Discount::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update discount.
         *
         * @param Discount    $discount
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, Discount $discount)
    {
        $validation = $this->validateDiscount($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($discount, $request->all());

        $discount = Discount::findOrfail($discount->id);

        return new DiscountResource($discount);
    }
    
    /**
     * Delete discount.
     *
     * @param Discount    $discount
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Discount $discount)
    {
        $this->repository->delete($discount);

        return $this->respond([
            'message' => _tr('alerts.backend.discount.deleted'),
        ]);
    }
    

    /**
     * validate discount.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateDiscount(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'name' => 'required|max:191',
               'amount' => 'decimal:2',
               ]);

        return $validation;
    }

    /**
     * validate message for validate discount.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
