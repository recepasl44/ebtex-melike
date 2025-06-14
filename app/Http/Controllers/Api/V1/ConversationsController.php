<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\ConversationResource;
use App\Models\Conversations\Conversation;
use App\Repositories\Backend\Conversations\ConversationRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * ConversationsController
 */
class ConversationsController extends APIController
{
    /**
     * __construct.
     *
     * @var ConversationRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param ConversationRepository $repository;
     */
    public function __construct(ConversationRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $conversation.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return ConversationResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param Conversation $conversation
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Conversation $conversation)
    {
        return new ConversationResource($conversation);
    }

    
     /**
      * Creates the Resource for conversation.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateConversation($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new ConversationResource(Conversation::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update conversation.
         *
         * @param Conversation    $conversation
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, Conversation $conversation)
    {
        $validation = $this->validateConversation($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($conversation, $request->all());

        $conversation = Conversation::findOrfail($conversation->id);

        return new ConversationResource($conversation);
    }
    
    /**
     * Delete conversation.
     *
     * @param Conversation    $conversation
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Conversation $conversation)
    {
        $this->repository->delete($conversation);

        return $this->respond([
            'message' => _tr('alerts.backend.conversation.deleted'),
        ]);
    }
    

    /**
     * validate conversation.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateConversation(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'user_one_id' => 'required',
               'user_two_id' => 'required',
               ]);

        return $validation;
    }

    /**
     * validate message for validate conversation.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
