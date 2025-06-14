<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\OrganizationTypeResource;
use App\Models\OrganizationTypes\OrganizationType;
use App\Repositories\Backend\OrganizationTypes\OrganizationTypeRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class OrganizationTypeController extends APIController
{
    protected $repository;

    /**
     * __construct.
     *
     * @param $repository
     */
    public function __construct(OrganizationTypeRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the organizationType.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        
        $limit = $request->get('paginate') ? $request->get('paginate') : 25;
        $orderBy = $request->get('orderBy') ? $request->get('orderBy') : 'ASC';
        $sortBy = $request->get('sortBy') ? $request->get('sortBy') : 'created_at';

        return OrganizationTypeResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }

    /**
     * Return the specified resource.
     *
     * @param OrganizationType organizationType
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(OrganizationType $organizationType, Request $request)
    {
        
        return new OrganizationTypeResource($organizationType);
    }

    /**
     * Creates the Resource for OrganizationType.
     *
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validation = $this->validateOrganizationType($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new OrganizationTypeResource(OrganizationType::orderBy('created_at', 'desc')->first());
    }

    /**
     * Update organizationType.
     *
     * @param OrganizationType    $organizationType
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, OrganizationType $organizationType)
    {
        $validation = $this->validateOrganizationType($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($organizationType, $request->all());

        $organizationType = OrganizationType::findOrfail($organizationType->id);

        return new OrganizationTypeResource($organizationType);
    }

    /**
     * Delete OrganizationType.
     *
     * @param OrganizationType    $organizationType
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(OrganizationType $organizationType, Request $request)
    {
        $this->repository->delete($organizationType);

        return $this->respond([
            'message' => _tr('alerts.backend.organizationType.deleted'),
        ]);
    }

    /**
     * validate OrganizationType.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateOrganizationType(Request $request, $action = 'insert')
    {
        $featured_image = ($action == 'insert') ? 'required' : '';

        $publish_datetime = $request->publish_datetime !== '' ? 'required|date' : 'required';

        $validation = Validator::make($request->all(), [
            'name'              => 'required|max:191',
            'featured_image'    => $featured_image,
            'publish_datetime'  => $publish_datetime,
            'content'           => 'required',
            'categories'        => 'required',
            'tags'              => 'required',
        ]);

        return $validation;
    }

    /**
     * validate message for validate organizationType.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [
            'name.required' => 'Please insert OrganizationType Title',
            'name.max'      => 'OrganizationType Title may not be greater than 191 characters.',
        ];
    }
}
