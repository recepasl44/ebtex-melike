<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\UsedAreaResource;
use App\Models\UsedAreas\UsedArea;
use App\Repositories\Backend\UsedAreas\UsedAreaRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * UsedAreasController
 */
class UsedAreasController extends APIController
{
    /**
     * __construct.
     *
     * @var UsedAreaRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param UsedAreaRepository $repository;
     */
    public function __construct(UsedAreaRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $usedarea.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return UsedAreaResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param UsedArea $usedarea
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(UsedArea $usedarea)
    {
        return new UsedAreaResource($usedarea);
    }

    
     /**
      * Creates the Resource for usedarea.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateUsedArea($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new UsedAreaResource(UsedArea::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update usedarea.
         *
         * @param UsedArea    $usedarea
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, UsedArea $usedarea)
    {
        $validation = $this->validateUsedArea($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($usedarea, $request->all());

        $usedarea = UsedArea::findOrfail($usedarea->id);

        return new UsedAreaResource($usedarea);
    }
    
    /**
     * Delete usedarea.
     *
     * @param UsedArea    $usedarea
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(UsedArea $usedarea)
    {
        $this->repository->delete($usedarea);

        return $this->respond([
            'message' => _tr('alerts.backend.usedarea.deleted'),
        ]);
    }
    

    /**
     * validate usedarea.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateUsedArea(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'name' => 'required|max:191',
               ]);

        return $validation;
    }

    /**
     * validate message for validate usedarea.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
