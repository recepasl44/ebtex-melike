<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\AnnualPlanResource;
use App\Models\AnnualPlans\AnnualPlan;
use App\Repositories\Backend\AnnualPlans\AnnualPlanRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * AnnualPlansController
 */
class AnnualPlansController extends APIController
{
    /**
     * __construct.
     *
     * @var AnnualPlanRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param AnnualPlanRepository $repository;
     */
    public function __construct(AnnualPlanRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $annualplan.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return AnnualPlanResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param AnnualPlan $annualplan
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(AnnualPlan $annualplan)
    {
        return new AnnualPlanResource($annualplan);
    }

    
     /**
      * Creates the Resource for annualplan.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateAnnualPlan($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new AnnualPlanResource(AnnualPlan::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update annualplan.
         *
         * @param AnnualPlan    $annualplan
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, AnnualPlan $annualplan)
    {
        $validation = $this->validateAnnualPlan($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($annualplan, $request->all());

        $annualplan = AnnualPlan::findOrfail($annualplan->id);

        return new AnnualPlanResource($annualplan);
    }
    
    /**
     * Delete annualplan.
     *
     * @param AnnualPlan    $annualplan
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(AnnualPlan $annualplan)
    {
        $this->repository->delete($annualplan);

        return $this->respond([
            'message' => _tr('alerts.backend.annualplan.deleted'),
        ]);
    }
    

    /**
     * validate annualplan.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateAnnualPlan(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'user_id' => 'required',
               'fromto_date' => 'required|date',
               ]);

        return $validation;
    }

    /**
     * validate message for validate annualplan.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
