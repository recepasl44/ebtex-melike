<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\PeriodResource;
use App\Models\Periods\Period;
use App\Repositories\Backend\Periods\PeriodRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * PeriodsController
 */
class PeriodsController extends APIController
{
    /**
     * __construct.
     *
     * @var PeriodRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param PeriodRepository $repository;
     */
    public function __construct(PeriodRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $period.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return PeriodResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param Period $period
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Period $period)
    {
        return new PeriodResource($period);
    }

    
     /**
      * Creates the Resource for period.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validatePeriod($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new PeriodResource(Period::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update period.
         *
         * @param Period    $period
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, Period $period)
    {
        $validation = $this->validatePeriod($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($period, $request->all());

        $period = Period::findOrfail($period->id);

        return new PeriodResource($period);
    }
    
    /**
     * Delete period.
     *
     * @param Period    $period
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Period $period)
    {
        $this->repository->delete($period);

        return $this->respond([
            'message' => _tr('alerts.backend.period.deleted'),
        ]);
    }
    

    /**
     * validate period.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validatePeriod(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'name' => 'max:191',
               ]);

        return $validation;
    }

    /**
     * validate message for validate period.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
