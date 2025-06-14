<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\EventTypeResource;
use App\Models\EventTypes\EventType;
use App\Repositories\Backend\EventTypes\EventTypeRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * EventTypesController
 */
class EventTypesController extends APIController
{
    /**
     * __construct.
     *
     * @var EventTypeRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param EventTypeRepository $repository;
     */
    public function __construct(EventTypeRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Return the $eventtype.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return EventTypeResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param EventType $eventtype
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(EventType $eventtype)
    {
        return new EventTypeResource($eventtype);
    }

    
     /**
      * Creates the Resource for eventtype.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateEventType($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new EventTypeResource(EventType::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update eventtype.
         *
         * @param EventType    $eventtype
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, EventType $eventtype)
    {
        $validation = $this->validateEventType($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($eventtype, $request->all());

        $eventtype = EventType::findOrfail($eventtype->id);

        return new EventTypeResource($eventtype);
    }
    
    /**
     * Delete eventtype.
     *
     * @param EventType    $eventtype
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(EventType $eventtype)
    {
        $this->repository->delete($eventtype);

        return $this->respond([
            'message' => _tr('alerts.backend.eventtype.deleted'),
        ]);
    }
    

    /**
     * validate eventtype.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateEventType(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'name' => 'required|max:191',
               ]);

        return $validation;
    }

    /**
     * validate message for validate eventtype.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
