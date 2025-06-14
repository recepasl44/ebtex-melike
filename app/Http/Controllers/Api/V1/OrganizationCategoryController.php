<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\OrganizationCategoryResource;
use App\Models\OrganizationCategories\OrganizationCategory;
use App\Repositories\Backend\OrganizationCategories\OrganizationCategoryRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class OrganizationCategoryController extends APIController
{
    protected $repository;

    /**
     * __construct.
     *
     * @param $repository
     */
    public function __construct(OrganizationCategoryRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the organizationCategory.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        
        $limit = $request->get('paginate') ? $request->get('paginate') : 25;
        $orderBy = $request->get('orderBy') ? $request->get('orderBy') : 'ASC';
        $sortBy = $request->get('sortBy') ? $request->get('sortBy') : 'created_at';

        return OrganizationCategoryResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }

    /**
     * Return the specified resource.
     *
     * @param OrganizationCategory organizationCategory
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(OrganizationCategory $organizationCategory, Request $request)
    {
        
        return new OrganizationCategoryResource($organizationCategory);
    }

    /**
     * Creates the Resource for OrganizationCategory.
     *
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validation = $this->validateOrganizationCategory($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new OrganizationCategoryResource(OrganizationCategory::orderBy('created_at', 'desc')->first());
    }

    /**
     * Update organizationCategory.
     *
     * @param OrganizationCategory    $organizationCategory
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, OrganizationCategory $organizationCategory)
    {
        $validation = $this->validateOrganizationCategory($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($organizationCategory, $request->all());

        $organizationCategory = OrganizationCategory::findOrfail($organizationCategory->id);

        return new OrganizationCategoryResource($organizationCategory);
    }

    /**
     * Delete OrganizationCategory.
     *
     * @param OrganizationCategory    $organizationCategory
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(OrganizationCategory $organizationCategory, Request $request)
    {
        $this->repository->delete($organizationCategory);

        return $this->respond([
            'message' => _tr('alerts.backend.organizationCategory.deleted'),
        ]);
    }

    /**
     * validate OrganizationCategory.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateOrganizationCategory(Request $request, $action = 'insert')
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
     * validate message for validate organizationCategory.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [
            'name.required' => 'Please insert OrganizationCategory Title',
            'name.max'      => 'OrganizationCategory Title may not be greater than 191 characters.',
        ];
    }
}
