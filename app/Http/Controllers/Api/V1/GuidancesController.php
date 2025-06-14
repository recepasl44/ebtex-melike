<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\GuidanceResource;
use App\Models\Guidances\Guidance;
use App\Repositories\Backend\Guidances\GuidanceRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * GuidancesController
 */
class GuidancesController extends APIController
{
    /**
     * __construct.
     *
     * @var GuidanceRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param GuidanceRepository $repository;
     */
    public function __construct(GuidanceRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $guidance.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return GuidanceResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param Guidance $guidance
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Guidance $guidance)
    {
        return new GuidanceResource($guidance);
    }

    
     /**
      * Creates the Resource for guidance.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateGuidance($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new GuidanceResource(Guidance::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update guidance.
         *
         * @param Guidance    $guidance
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, Guidance $guidance)
    {
        $validation = $this->validateGuidance($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($guidance, $request->all());

        $guidance = Guidance::findOrfail($guidance->id);

        return new GuidanceResource($guidance);
    }
    
    /**
     * Delete guidance.
     *
     * @param Guidance    $guidance
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Guidance $guidance)
    {
        $this->repository->delete($guidance);

        return $this->respond([
            'message' => _tr('alerts.backend.guidance.deleted'),
        ]);
    }
    

    /**
     * validate guidance.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateGuidance(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'guidance_date' => 'required|date',
               'user_id' => 'required',
               'page_range' => 'max:191',
               ]);

        return $validation;
    }

    /**
     * validate message for validate guidance.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
