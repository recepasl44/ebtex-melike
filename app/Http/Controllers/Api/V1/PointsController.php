<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\PointResource;
use App\Models\Points\Point;
use App\Repositories\Backend\Points\PointRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * PointsController
 */
class PointsController extends APIController
{
    /**
     * __construct.
     *
     * @var PointRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param PointRepository $repository;
     */
    public function __construct(PointRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $point.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return PointResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param Point $point
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Point $point)
    {
        return new PointResource($point);
    }

    
     /**
      * Creates the Resource for point.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validatePoint($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new PointResource(Point::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update point.
         *
         * @param Point    $point
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, Point $point)
    {
        $validation = $this->validatePoint($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($point, $request->all());

        $point = Point::findOrfail($point->id);

        return new PointResource($point);
    }
    
    /**
     * Delete point.
     *
     * @param Point    $point
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Point $point)
    {
        $this->repository->delete($point);

        return $this->respond([
            'message' => _tr('alerts.backend.point.deleted'),
        ]);
    }
    

    /**
     * validate point.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validatePoint(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'quiz_id' => 'required',
               'student_id' => 'required',
               'points' => 'decimal:2',
               ]);

        return $validation;
    }

    /**
     * validate message for validate point.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
