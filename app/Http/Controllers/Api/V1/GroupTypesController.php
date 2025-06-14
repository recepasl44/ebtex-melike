<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\GroupTypeResource;
use App\Models\GroupTypes\GroupType;
use App\Repositories\Backend\GroupTypes\GroupTypeRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * GroupTypesController
 */
class GroupTypesController extends APIController
{
    /**
     * __construct.
     *
     * @var GroupTypeRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param GroupTypeRepository $repository;
     */
    public function __construct(GroupTypeRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $grouptype.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return GroupTypeResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param GroupType $grouptype
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(GroupType $grouptype)
    {
        return new GroupTypeResource($grouptype);
    }

    
     /**
      * Creates the Resource for grouptype.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateGroupType($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new GroupTypeResource(GroupType::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update grouptype.
         *
         * @param GroupType    $grouptype
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, GroupType $grouptype)
    {
        $validation = $this->validateGroupType($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($grouptype, $request->all());

        $grouptype = GroupType::findOrfail($grouptype->id);

        return new GroupTypeResource($grouptype);
    }
    
    /**
     * Delete grouptype.
     *
     * @param GroupType    $grouptype
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(GroupType $grouptype)
    {
        $this->repository->delete($grouptype);

        return $this->respond([
            'message' => _tr('alerts.backend.grouptype.deleted'),
        ]);
    }
    

    /**
     * validate grouptype.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateGroupType(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'name' => 'required|max:191',
               ]);

        return $validation;
    }

    /**
     * validate message for validate grouptype.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
