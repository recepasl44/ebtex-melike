<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\ClassRoomResource;
use App\Models\ClassRooms\ClassRoom;
use App\Repositories\Backend\ClassRooms\ClassRoomRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * ClassRoomsController
 */
class ClassRoomsController extends APIController
{
    /**
     * __construct.
     *
     * @var ClassRoomRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param ClassRoomRepository $repository;
     */
    public function __construct(ClassRoomRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $classroom.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return ClassRoomResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param ClassRoom $classroom
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(ClassRoom $classroom)
    {
        return new ClassRoomResource($classroom);
    }

    
     /**
      * Creates the Resource for classroom.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateClassRoom($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new ClassRoomResource(ClassRoom::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update classroom.
         *
         * @param ClassRoom    $classroom
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, ClassRoom $classroom)
    {
        $validation = $this->validateClassRoom($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($classroom, $request->all());

        $classroom = ClassRoom::findOrfail($classroom->id);

        return new ClassRoomResource($classroom);
    }
    
    /**
     * Delete classroom.
     *
     * @param ClassRoom    $classroom
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(ClassRoom $classroom)
    {
        $this->repository->delete($classroom);

        return $this->respond([
            'message' => _tr('alerts.backend.classroom.deleted'),
        ]);
    }
    

    /**
     * validate classroom.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateClassRoom(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'name' => 'required|max:191',
               'branche_id' => 'required',
               'school_id' => 'required',
               'level_id' => 'required',
               ]);

        return $validation;
    }

    /**
     * validate message for validate classroom.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
