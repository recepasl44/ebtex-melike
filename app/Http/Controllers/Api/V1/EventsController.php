<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\EventResource;
use App\Models\Events\Event;
use App\Repositories\Backend\Events\EventRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * EventsController
 */
class EventsController extends APIController
{
    /**
     * __construct.
     *
     * @var EventRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param EventRepository $repository;
     */
    public function __construct(EventRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Return the $event.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return EventResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param Event $event
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Event $event)
    {
        return new EventResource($event);
    }

    
     /**
      * Creates the Resource for event.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateEvent($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new EventResource(Event::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update event.
         *
         * @param Event    $event
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, Event $event)
    {
        $validation = $this->validateEvent($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($event, $request->all());

        $event = Event::findOrfail($event->id);

        return new EventResource($event);
    }
    
    /**
     * Delete event.
     *
     * @param Event    $event
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Event $event)
    {
        $this->repository->delete($event);

        return $this->respond([
            'message' => _tr('alerts.backend.event.deleted'),
        ]);
    }
    

    /**
     * validate event.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateEvent(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'name' => 'required|max:191',
               'program_id' => 'required',
               'level_id' => 'required',
               'used_area_id' => 'required',
               'start_date' => 'required|date',
               'end_date' => 'date',
               'estimated_time' => 'date',
               ]);

        return $validation;
    }

    /**
     * validate message for validate event.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
