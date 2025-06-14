<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\OrganizationSocialResource;
use App\Models\OrganizationSocials\OrganizationSocial;
use App\Repositories\Backend\OrganizationSocials\OrganizationSocialRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class OrganizationSocialController extends APIController
{
    protected $repository;

    /**
     * __construct.
     *
     * @param $repository
     */
    public function __construct(OrganizationSocialRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the organizationSocial.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        
        $limit = $request->get('paginate') ? $request->get('paginate') : 25;
        $orderBy = $request->get('orderBy') ? $request->get('orderBy') : 'ASC';
        $sortBy = $request->get('sortBy') ? $request->get('sortBy') : 'created_at';

        return OrganizationSocialResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }

    /**
     * Return the specified resource.
     *
     * @param OrganizationSocial organizationSocial
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(OrganizationSocial $organizationSocial, Request $request)
    {
        
        return new OrganizationSocialResource($organizationSocial);
    }

    /**
     * Creates the Resource for OrganizationSocial.
     *
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validation = $this->validateOrganizationSocial($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new OrganizationSocialResource(OrganizationSocial::orderBy('created_at', 'desc')->first());
    }

    /**
     * Update organizationSocial.
     *
     * @param OrganizationSocial    $organizationSocial
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, OrganizationSocial $organizationSocial)
    {
        $validation = $this->validateOrganizationSocial($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($organizationSocial, $request->all());

        $organizationSocial = OrganizationSocial::findOrfail($organizationSocial->id);

        return new OrganizationSocialResource($organizationSocial);
    }

    /**
     * Delete OrganizationSocial.
     *
     * @param OrganizationSocial    $organizationSocial
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(OrganizationSocial $organizationSocial, Request $request)
    {
        $this->repository->delete($organizationSocial);

        return $this->respond([
            'message' => _tr('alerts.backend.organizationSocial.deleted'),
        ]);
    }

    /**
     * validate OrganizationSocial.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateOrganizationSocial(Request $request, $action = 'insert')
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
     * validate message for validate organizationSocial.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [
            'name.required' => 'Please insert OrganizationSocial Title',
            'name.max'      => 'OrganizationSocial Title may not be greater than 191 characters.',
        ];
    }
}
