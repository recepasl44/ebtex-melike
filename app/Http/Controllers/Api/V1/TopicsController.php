<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\TopicResource;
use App\Models\Topics\Topic;
use App\Repositories\Backend\Topics\TopicRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * TopicsController
 */
class TopicsController extends APIController
{
    /**
     * __construct.
     *
     * @var TopicRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param TopicRepository $repository;
     */
    public function __construct(TopicRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $topic.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return TopicResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param Topic $topic
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Topic $topic)
    {
        return new TopicResource($topic);
    }

    
     /**
      * Creates the Resource for topic.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateTopic($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new TopicResource(Topic::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update topic.
         *
         * @param Topic    $topic
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, Topic $topic)
    {
        $validation = $this->validateTopic($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($topic, $request->all());

        $topic = Topic::findOrfail($topic->id);

        return new TopicResource($topic);
    }
    
    /**
     * Delete topic.
     *
     * @param Topic    $topic
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Topic $topic)
    {
        $this->repository->delete($topic);

        return $this->respond([
            'message' => _tr('alerts.backend.topic.deleted'),
        ]);
    }
    

    /**
     * validate topic.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateTopic(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'name' => 'required|max:191',
               'cover' => 'numeric',
               ]);

        return $validation;
    }

    /**
     * validate message for validate topic.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
