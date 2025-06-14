<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\StudentGroupResource;
use App\Models\StudentGroups\StudentGroup;
use App\Repositories\Backend\StudentGroups\StudentGroupRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * StudentGroupsController
 */
class StudentGroupsController extends APIController
{
    /**
     * __construct.
     *
     * @var StudentGroupRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param StudentGroupRepository $repository;
     */
    public function __construct(StudentGroupRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $studentgroup.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return StudentGroupResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param StudentGroup $studentgroup
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(StudentGroup $studentgroup)
    {
        return new StudentGroupResource($studentgroup);
    }

    
     /**
      * Creates the Resource for studentgroup.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateStudentGroup($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new StudentGroupResource(StudentGroup::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update studentgroup.
         *
         * @param StudentGroup    $studentgroup
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, StudentGroup $studentgroup)
    {
        $validation = $this->validateStudentGroup($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($studentgroup, $request->all());

        $studentgroup = StudentGroup::findOrfail($studentgroup->id);

        return new StudentGroupResource($studentgroup);
    }
    
    /**
     * Delete studentgroup.
     *
     * @param StudentGroup    $studentgroup
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(StudentGroup $studentgroup)
    {
        $this->repository->delete($studentgroup);

        return $this->respond([
            'message' => _tr('alerts.backend.studentgroup.deleted'),
        ]);
    }
    

    /**
     * validate studentgroup.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateStudentGroup(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'student_id' => 'required',
               'group_id' => 'required',
               ]);

        return $validation;
    }

    /**
     * validate message for validate studentgroup.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
