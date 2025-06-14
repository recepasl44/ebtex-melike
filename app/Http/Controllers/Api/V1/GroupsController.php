<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\GroupResource;
use App\Models\Groups\Group;
use App\Repositories\Backend\Groups\GroupRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * GroupsController
 */
class GroupsController extends APIController
{
    /**
     * __construct.
     *
     * @var GroupRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param GroupRepository $repository;
     */
    public function __construct(GroupRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $group.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return GroupResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param Group $group
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Group $group)
    {
        return new GroupResource($group);
    }

    
     /**
      * Creates the Resource for group.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateGroup($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new GroupResource(Group::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update group.
         *
         * @param Group    $group
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, Group $group)
    {
        $validation = $this->validateGroup($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($group, $request->all());

        $group = Group::findOrfail($group->id);

        return new GroupResource($group);
    }
    
    /**
     * Delete group.
     *
     * @param Group    $group
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Group $group)
    {
        $this->repository->delete($group);

        return $this->respond([
            'message' => _tr('alerts.backend.group.deleted'),
        ]);
    }
    

    /**
     * validate group.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateGroup(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'name' => 'required|max:191',
               ]);

        return $validation;
    }

    /**
     * validate message for validate group.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
