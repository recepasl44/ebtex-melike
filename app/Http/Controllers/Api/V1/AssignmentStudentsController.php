<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\AssignmentStudentResource;
use App\Models\AssignmentStudents\AssignmentStudent;
use App\Repositories\Backend\AssignmentStudents\AssignmentStudentRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * AssignmentStudentsController
 */
class AssignmentStudentsController extends APIController
{
    /**
     * __construct.
     *
     * @var AssignmentStudentRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param AssignmentStudentRepository $repository;
     */
    public function __construct(AssignmentStudentRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $assignmentstudent.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return AssignmentStudentResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param AssignmentStudent $assignmentstudent
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(AssignmentStudent $assignmentstudent)
    {
        return new AssignmentStudentResource($assignmentstudent);
    }

    
     /**
      * Creates the Resource for assignmentstudent.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateAssignmentStudent($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new AssignmentStudentResource(AssignmentStudent::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update assignmentstudent.
         *
         * @param AssignmentStudent    $assignmentstudent
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, AssignmentStudent $assignmentstudent)
    {
        $validation = $this->validateAssignmentStudent($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($assignmentstudent, $request->all());

        $assignmentstudent = AssignmentStudent::findOrfail($assignmentstudent->id);

        return new AssignmentStudentResource($assignmentstudent);
    }
    
    /**
     * Delete assignmentstudent.
     *
     * @param AssignmentStudent    $assignmentstudent
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(AssignmentStudent $assignmentstudent)
    {
        $this->repository->delete($assignmentstudent);

        return $this->respond([
            'message' => _tr('alerts.backend.assignmentstudent.deleted'),
        ]);
    }
    

    /**
     * validate assignmentstudent.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateAssignmentStudent(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'assignment_id' => 'required',
               'student_id' => 'required',
               'completion_percentage' => 'decimal:2',
               ]);

        return $validation;
    }

    /**
     * validate message for validate assignmentstudent.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
