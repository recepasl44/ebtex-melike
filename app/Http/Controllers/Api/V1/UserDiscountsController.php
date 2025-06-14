<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\UserDiscountResource;
use App\Models\UserDiscounts\UserDiscount;
use App\Repositories\Backend\UserDiscounts\UserDiscountRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * UserDiscountsController
 */
class UserDiscountsController extends APIController
{
    /**
     * __construct.
     *
     * @var UserDiscountRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param UserDiscountRepository $repository;
     */
    public function __construct(UserDiscountRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $userdiscount.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return UserDiscountResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param UserDiscount $userdiscount
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(UserDiscount $userdiscount)
    {
        return new UserDiscountResource($userdiscount);
    }

    
     /**
      * Creates the Resource for userdiscount.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateUserDiscount($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new UserDiscountResource(UserDiscount::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update userdiscount.
         *
         * @param UserDiscount    $userdiscount
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, UserDiscount $userdiscount)
    {
        $validation = $this->validateUserDiscount($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($userdiscount, $request->all());

        $userdiscount = UserDiscount::findOrfail($userdiscount->id);

        return new UserDiscountResource($userdiscount);
    }
    
    /**
     * Delete userdiscount.
     *
     * @param UserDiscount    $userdiscount
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(UserDiscount $userdiscount)
    {
        $this->repository->delete($userdiscount);

        return $this->respond([
            'message' => _tr('alerts.backend.userdiscount.deleted'),
        ]);
    }
    

    /**
     * validate userdiscount.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateUserDiscount(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'season_id' => 'required',
               'branche_id' => 'required',
               'student_id' => 'required',
               'discount_id' => 'required',
               'created_by' => 'required',
               ]);

        return $validation;
    }

    /**
     * validate message for validate userdiscount.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
