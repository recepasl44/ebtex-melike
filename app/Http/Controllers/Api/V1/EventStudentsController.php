<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\EventStudentResource;
use App\Models\EventStudents\EventStudent;
use App\Repositories\Backend\EventStudents\EventStudentRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * EventStudentsController
 */
class EventStudentsController extends APIController
{
    /**
     * __construct.
     *
     * @var EventStudentRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param EventStudentRepository $repository;
     */
    public function __construct(EventStudentRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Return the $eventstudent.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return EventStudentResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param EventStudent $eventstudent
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(EventStudent $eventstudent)
    {
        return new EventStudentResource($eventstudent);
    }

    
     /**
      * Creates the Resource for eventstudent.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateEventStudent($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new EventStudentResource(EventStudent::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update eventstudent.
         *
         * @param EventStudent    $eventstudent
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, EventStudent $eventstudent)
    {
        $validation = $this->validateEventStudent($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($eventstudent, $request->all());

        $eventstudent = EventStudent::findOrfail($eventstudent->id);

        return new EventStudentResource($eventstudent);
    }
    
    /**
     * Delete eventstudent.
     *
     * @param EventStudent    $eventstudent
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(EventStudent $eventstudent)
    {
        $this->repository->delete($eventstudent);

        return $this->respond([
            'message' => _tr('alerts.backend.eventstudent.deleted'),
        ]);
    }
    

    /**
     * validate eventstudent.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateEventStudent(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'event_id' => 'required',
               'student_id' => 'required',
               ]);

        return $validation;
    }

    /**
     * validate message for validate eventstudent.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
