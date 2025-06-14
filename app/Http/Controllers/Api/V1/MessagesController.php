<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\MessageResource;
use App\Models\Messages\Message;
use App\Repositories\Backend\Messages\MessageRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * MessagesController
 */
class MessagesController extends APIController
{
    /**
     * __construct.
     *
     * @var MessageRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param MessageRepository $repository;
     */
    public function __construct(MessageRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $message.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return MessageResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param Message $message
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Message $message)
    {
        return new MessageResource($message);
    }

    
     /**
      * Creates the Resource for message.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateMessage($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new MessageResource(Message::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update message.
         *
         * @param Message    $message
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, Message $message)
    {
        $validation = $this->validateMessage($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($message, $request->all());

        $message = Message::findOrfail($message->id);

        return new MessageResource($message);
    }
    
    /**
     * Delete message.
     *
     * @param Message    $message
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Message $message)
    {
        $this->repository->delete($message);

        return $this->respond([
            'message' => _tr('alerts.backend.message.deleted'),
        ]);
    }
    

    /**
     * validate message.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateMessage(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'conversation_id' => 'required',
               'sender_id' => 'required',
               'body' => 'required|max:191',
               'read_at' => 'date',
               ]);

        return $validation;
    }

    /**
     * validate message for validate message.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
