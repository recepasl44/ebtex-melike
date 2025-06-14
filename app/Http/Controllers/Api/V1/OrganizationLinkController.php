<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\OrganizationLinkResource;
use App\Models\OrganizationLinks\OrganizationLink;
use App\Repositories\Backend\OrganizationLinks\OrganizationLinkRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class OrganizationLinkController extends APIController
{
    protected $repository;

    /**
     * __construct.
     *
     * @param $repository
     */
    public function __construct(OrganizationLinkRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the organizationLink.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ? $request->get('paginate') : 25;
        $orderBy = $request->get('orderBy') ? $request->get('orderBy') : 'ASC';
        $sortBy = $request->get('sortBy') ? $request->get('sortBy') : 'created_at';

        return OrganizationLinkResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }

    /**
     * Return the specified resource.
     *
     * @param OrganizationLink organizationLink
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(OrganizationLink $organizationLink, Request $request)
    {
        
        return new OrganizationLinkResource($organizationLink);
    }

    /**
     * Creates the Resource for OrganizationLink.
     *
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validation = $this->validateOrganizationLink($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new OrganizationLinkResource(OrganizationLink::orderBy('created_at', 'desc')->first());
    }

    /**
     * Update organizationLink.
     *
     * @param OrganizationLink    $organizationLink
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, OrganizationLink $organizationLink)
    {
        $validation = $this->validateOrganizationLink($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($organizationLink, $request->all());

        $organizationLink = OrganizationLink::findOrfail($organizationLink->id);

        return new OrganizationLinkResource($organizationLink);
    }

    /**
     * Delete OrganizationLink.
     *
     * @param OrganizationLink    $organizationLink
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(OrganizationLink $organizationLink, Request $request)
    {
        $this->repository->delete($organizationLink);

        return $this->respond([
            'message' => _tr('alerts.backend.organizationLink.deleted'),
        ]);
    }

    /**
     * validate OrganizationLink.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateOrganizationLink(Request $request, $action = 'insert')
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
     * validate message for validate organizationLink.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [
            'name.required' => 'Please insert OrganizationLink Title',
            'name.max'      => 'OrganizationLink Title may not be greater than 191 characters.',
        ];
    }
}
