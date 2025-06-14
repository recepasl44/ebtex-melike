<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\LessonResource;
use App\Models\Lessons\Lesson;
use App\Repositories\Backend\Lessons\LessonRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * LessonsController
 */
class LessonsController extends APIController
{
    /**
     * __construct.
     *
     * @var LessonRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param LessonRepository $repository;
     */
    public function __construct(LessonRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $lesson.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return LessonResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param Lesson $lesson
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Lesson $lesson)
    {
        return new LessonResource($lesson);
    }

    
     /**
      * Creates the Resource for lesson.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateLesson($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new LessonResource(Lesson::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update lesson.
         *
         * @param Lesson    $lesson
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, Lesson $lesson)
    {
        $validation = $this->validateLesson($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($lesson, $request->all());

        $lesson = Lesson::findOrfail($lesson->id);

        return new LessonResource($lesson);
    }
    
    /**
     * Delete lesson.
     *
     * @param Lesson    $lesson
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Lesson $lesson)
    {
        $this->repository->delete($lesson);

        return $this->respond([
            'message' => _tr('alerts.backend.lesson.deleted'),
        ]);
    }
    

    /**
     * validate lesson.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateLesson(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'name' => 'required|max:191',
               'cover' => 'numeric',
               ]);

        return $validation;
    }

    /**
     * validate message for validate lesson.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
