<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\AssignmentStatusCountResource;
use App\Http\Resources\ScheduledAssignmentResource;
use App\Models\ScheduledAssignments\ScheduledAssignment;
use App\Repositories\Backend\ScheduledAssignments\ScheduledAssignmentRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * ScheduledAssignmentsController
 */
class ScheduledAssignmentsController extends APIController
{
    /**
     * __construct.
     *
     * @var ScheduledAssignmentRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param ScheduledAssignmentRepository $repository;
     */
    public function __construct(ScheduledAssignmentRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $scheduledassignment.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return ScheduledAssignmentResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param ScheduledAssignment $scheduledassignment
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(ScheduledAssignment $scheduledassignment)
    {
        return new ScheduledAssignmentResource($scheduledassignment);
    }

    
     /**
      * Creates the Resource for scheduledassignment.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateScheduledAssignment($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new ScheduledAssignmentResource(ScheduledAssignment::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update scheduledassignment.
         *
         * @param ScheduledAssignment    $scheduledassignment
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, ScheduledAssignment $scheduledassignment)
    {
        $validation = $this->validateScheduledAssignment($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($scheduledassignment, $request->all());

        $scheduledassignment = ScheduledAssignment::findOrfail($scheduledassignment->id);

        return new ScheduledAssignmentResource($scheduledassignment);
    }
    
    /**
     * Delete scheduledassignment.
     *
     * @param ScheduledAssignment    $scheduledassignment
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(ScheduledAssignment $scheduledassignment)
    {
        $this->repository->delete($scheduledassignment);

        return $this->respond([
            'message' => _tr('alerts.backend.scheduledassignment.deleted'),
        ]);
    }
    

    /**
     * validate scheduledassignment.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateScheduledAssignment(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'start_date' => 'required|date',
               'end_date' => 'date',
               'description' => 'max:191',
               ]);

        return $validation;
    }

    /**
     * validate message for validate scheduledassignment.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }

    /**
     * Return the specified resource.
     *
     * @param ScheduledAssignment $scheduledassignment
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function statusCount(Request $request)
    {
        // Veritabanından gelen sayılar
        $dbCounts = ScheduledAssignment::selectRaw('status, COUNT(*) as count')
            ->groupBy('status')
            ->pluck('count', 'status')
            ->all();

        // Tüm sabit statüleri tanımla (0–9)
        $allStatuses = range(0, 9);

        // Statüleri ve sayıları birleştir
        $statusCounts = collect($allStatuses)->map(function ($status) use ($dbCounts) {
            return [
                'status' => $status,
                'count' => $dbCounts[$status] ?? 0,
            ];
        });

        // Resource koleksiyonu olarak döndür
        return AssignmentStatusCountResource::collection($statusCounts);
    }
}
