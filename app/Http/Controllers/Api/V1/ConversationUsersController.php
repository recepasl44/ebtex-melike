<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\ConversationUserResource;
use App\Models\ConversationUsers\ConversationUser;
use App\Repositories\Backend\ConversationUsers\ConversationUserRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * ConversationUsersController
 */
class ConversationUsersController extends APIController
{
    /**
     * __construct.
     *
     * @var ConversationUserRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param ConversationUserRepository $repository;
     */
    public function __construct(ConversationUserRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $conversationuser.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return ConversationUserResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param ConversationUser $conversationuser
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(ConversationUser $conversationuser)
    {
        return new ConversationUserResource($conversationuser);
    }

    
     /**
      * Creates the Resource for conversationuser.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateConversationUser($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new ConversationUserResource(ConversationUser::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update conversationuser.
         *
         * @param ConversationUser    $conversationuser
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, ConversationUser $conversationuser)
    {
        $validation = $this->validateConversationUser($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($conversationuser, $request->all());

        $conversationuser = ConversationUser::findOrfail($conversationuser->id);

        return new ConversationUserResource($conversationuser);
    }
    
    /**
     * Delete conversationuser.
     *
     * @param ConversationUser    $conversationuser
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(ConversationUser $conversationuser)
    {
        $this->repository->delete($conversationuser);

        return $this->respond([
            'message' => _tr('alerts.backend.conversationuser.deleted'),
        ]);
    }
    

    /**
     * validate conversationuser.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateConversationUser(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'conversation_id' => 'required',
               'user_id' => 'required',
               ]);

        return $validation;
    }

    /**
     * validate message for validate conversationuser.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
