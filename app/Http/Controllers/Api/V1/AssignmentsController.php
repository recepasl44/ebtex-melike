<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\AssignmentResource;
use App\Models\Assignments\Assignment;
use App\Repositories\Backend\Assignments\AssignmentRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * AssignmentsController
 */
class AssignmentsController extends APIController
{
    /**
     * __construct.
     *
     * @var AssignmentRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param AssignmentRepository $repository;
     */
    public function __construct(AssignmentRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $assignment.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return AssignmentResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param Assignment $assignment
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Assignment $assignment)
    {
        return new AssignmentResource($assignment);
    }

    
     /**
      * Creates the Resource for assignment.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateAssignment($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new AssignmentResource(Assignment::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update assignment.
         *
         * @param Assignment    $assignment
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, Assignment $assignment)
    {
        $validation = $this->validateAssignment($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($assignment, $request->all());

        $assignment = Assignment::findOrfail($assignment->id);

        return new AssignmentResource($assignment);
    }
    

    /**
     * validate assignment.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateAssignment(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'teacher_id' => 'required',
               'program_id' => 'required',
               'level_id' => 'required',
               'schooltype_id' => 'required',
               'course_id' => 'required',
               'title' => 'required|max:191',
               'source_id' => 'required',
               'start_date' => 'required|date',
               'end_date' => 'required|date',
               'teacher_file' => 'numeric',
               'teacher_planning_start_date' => 'date',
               'teacher_planning_end_date' => 'date',
               ]);

        return $validation;
    }

    /**
     * validate message for validate assignment.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
