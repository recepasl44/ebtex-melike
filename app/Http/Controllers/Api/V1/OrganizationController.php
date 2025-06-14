<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\OrganizationResource;
use App\Models\Organizations\Organization;
use App\Repositories\Backend\Organizations\OrganizationRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class OrganizationController extends APIController
{
    protected $repository;

    /**
     * __construct.
     *
     * @param $repository
     */
    public function __construct(OrganizationRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the organization.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ? $request->get('paginate') : 25;
        $orderBy = $request->get('orderBy') ? $request->get('orderBy') : 'ASC';
        $sortBy = $request->get('sortBy') ? $request->get('sortBy') : 'created_at';

        return OrganizationResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }

    /**
     * Return the specified resource.
     *
     * @param Organization organization
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Organization $organization)
    {
        return new OrganizationResource($organization);
    }

    /**
     * Creates the Resource for Organization.
     *
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validation = $this->validateOrganization($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new OrganizationResource(Organization::orderBy('created_at', 'desc')->first());
    }

    /**
     * Update organization.
     *
     * @param Organization    $organization
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, Organization $organization)
    {
        $validation = $this->validateOrganization($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($organization, $request->all());

        $organization = Organization::findOrfail($organization->id);

        return new OrganizationResource($organization);
    }

    /**
     * Delete Organization.
     *
     * @param Organization    $organization
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Organization $organization, Request $request)
    {
        $this->repository->delete($organization);

        return $this->respond([
            'message' => _tr('alerts.backend.organization.deleted'),
        ]);
    }

    /**
     * validate Organization.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateOrganization(Request $request, $action = 'insert')
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
     * validate message for validate organization.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [
            'name.required' => 'Please insert Organization Title',
            'name.max'      => 'Organization Title may not be greater than 191 characters.',
        ];
    }
}
