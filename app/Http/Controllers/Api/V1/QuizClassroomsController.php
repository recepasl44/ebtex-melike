<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\QuizClassroomResource;
use App\Models\QuizClassrooms\QuizClassroom;
use App\Repositories\Backend\QuizClassrooms\QuizClassroomRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * QuizClassroomsController
 */
class QuizClassroomsController extends APIController
{
    /**
     * __construct.
     *
     * @param $repository
     * @var QuizClassroomRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param QuizClassroomRepository $repository;
     */
    public function __construct(QuizClassroomRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $scholarshipclassroom.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return QuizClassroomResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param QuizClassroom $scholarshipclassroom
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(QuizClassroom $scholarshipclassroom)
    {
        return new QuizClassroomResource($scholarshipclassroom);
    }

    
     /**
      * Creates the Resource for scholarshipclassroom.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateQuizClassroom($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new QuizClassroomResource(QuizClassroom::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update scholarshipclassroom.
         *
         * @param QuizClassroom    $scholarshipclassroom
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, QuizClassroom $scholarshipclassroom)
    {
        $validation = $this->validateQuizClassroom($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($scholarshipclassroom, $request->all());

        $scholarshipclassroom = QuizClassroom::findOrfail($scholarshipclassroom->id);

        return new QuizClassroomResource($scholarshipclassroom);
    }
    
    /**
     * Delete scholarshipclassroom.
     *
     * @param QuizClassroom    $scholarshipclassroom
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(QuizClassroom $scholarshipclassroom)
    {
        $this->repository->delete($scholarshipclassroom);

        return $this->respond([
            'message' => _tr('alerts.backend.scholarshipclassroom.deleted'),
        ]);
    }
    

    /**
     * validate scholarshipclassroom.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateQuizClassroom(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'quiz_id' => 'required',
               'classroom_id' => 'required',
               ]);

        return $validation;
    }

    /**
     * validate message for validate scholarshipclassroom.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
