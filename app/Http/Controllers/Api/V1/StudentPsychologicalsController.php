<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\StudentPsychologicalResource;
use App\Models\StudentPsychologicals\StudentPsychological;
use App\Repositories\Backend\StudentPsychologicals\StudentPsychologicalRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * StudentPsychologicalsController
 */
class StudentPsychologicalsController extends APIController
{
    /**
     * __construct.
     *
     * @var StudentPsychologicalRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param StudentPsychologicalRepository $repository;
     */
    public function __construct(StudentPsychologicalRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $studentpsychological.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return StudentPsychologicalResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param StudentPsychological $studentpsychological
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(StudentPsychological $studentpsychological)
    {
        return new StudentPsychologicalResource($studentpsychological);
    }

    
     /**
      * Creates the Resource for studentpsychological.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateStudentPsychological($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new StudentPsychologicalResource(StudentPsychological::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update studentpsychological.
         *
         * @param StudentPsychological    $studentpsychological
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, StudentPsychological $studentpsychological)
    {
        $validation = $this->validateStudentPsychological($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($studentpsychological, $request->all());

        $studentpsychological = StudentPsychological::findOrfail($studentpsychological->id);

        return new StudentPsychologicalResource($studentpsychological);
    }
    
    /**
     * Delete studentpsychological.
     *
     * @param StudentPsychological    $studentpsychological
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(StudentPsychological $studentpsychological)
    {
        $this->repository->delete($studentpsychological);

        return $this->respond([
            'message' => _tr('alerts.backend.studentpsychological.deleted'),
        ]);
    }
    

    /**
     * validate studentpsychological.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateStudentPsychological(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'student_id' => 'required',
               'psychological_support' => 'max:191',
               'emotional_reactions' => 'max:191',
               ]);

        return $validation;
    }

    /**
     * validate message for validate studentpsychological.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
