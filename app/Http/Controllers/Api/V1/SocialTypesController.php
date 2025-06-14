<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\SocialTypeResource;
use App\Models\SocialTypes\SocialType;
use App\Repositories\Backend\SocialTypes\SocialTypeRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * SocialTypesController
 */
class SocialTypesController extends APIController
{
    /**
     * __construct.
     *
     * @var SocialTypeRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param SocialTypeRepository $repository;
     */
    public function __construct(SocialTypeRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $socialtype.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return SocialTypeResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param SocialType $socialtype
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(SocialType $socialtype)
    {
        return new SocialTypeResource($socialtype);
    }

    
     /**
      * Creates the Resource for socialtype.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateSocialType($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new SocialTypeResource(SocialType::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update socialtype.
         *
         * @param SocialType    $socialtype
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, SocialType $socialtype)
    {
        $validation = $this->validateSocialType($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($socialtype, $request->all());

        $socialtype = SocialType::findOrfail($socialtype->id);

        return new SocialTypeResource($socialtype);
    }
    
    /**
     * Delete socialtype.
     *
     * @param SocialType    $socialtype
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(SocialType $socialtype)
    {
        $this->repository->delete($socialtype);

        return $this->respond([
            'message' => _tr('alerts.backend.socialtype.deleted'),
        ]);
    }
    

    /**
     * validate socialtype.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateSocialType(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'name' => 'required|max:191',
               ]);

        return $validation;
    }

    /**
     * validate message for validate socialtype.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
