<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\FeatureResource;
use App\Models\Features\Feature;
use App\Repositories\Backend\Features\FeatureRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Validator;

class FeatureController extends APIController
{
    protected $repository;

    /**
     * __construct.
     *
     * @param $repository
     */
    public function __construct(FeatureRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the feature.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ? $request->get('paginate') : 25;
        $orderBy = $request->get('orderBy') ? $request->get('orderBy') : 'ASC';
        $sortBy = $request->get('sortBy') ? $request->get('sortBy') : 'created_at';



        $currentPath= explode('/', Route::getFacadeRoot()->current()->uri());
        $type = end($currentPath);
        $types = [
            'skills' => 1,
            'interests' => 2,
            'availabilities' => 3,
            'goals' => 4,
            'agreements' => 5,
            'team-titles' => 6
        ];
        $type_id = $types[$type] ?? 0;

        return FeatureResource::collection(
            $this->repository->getForDataTable()->where('type_id', $type_id)->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }

    /**
     * Return the specified resource.
     *
     * @param Feature feature
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($feature_id)
    {
        $currentPath= explode('/', Route::getFacadeRoot()->current()->uri());
        $type = end($currentPath);
        $types = [
            'skills' => 1,
            'interests' => 2,
            'availabilities' => 3,
            'goals' => 4,
            'agreements' => 5,
            'team-titles' => 6
        ];
        $type_id = $types[$type] ?? 0;

        $feature = Feature::find($feature_id);

        return new FeatureResource($feature ?? null);
    }

    /**
     * Creates the Resource for Feature.
     *
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validation = $this->validateFeature($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new FeatureResource(Feature::orderBy('created_at', 'desc')->first());
    }

    /**
     * Update feature.
     *
     * @param Feature    $feature
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, Feature $feature)
    {
        $validation = $this->validateFeature($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($feature, $request->all());

        $feature = Feature::findOrfail($feature->id);

        return new FeatureResource($feature);
    }

    /**
     * Delete Feature.
     *
     * @param Feature    $feature
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Feature $feature)
    {
        $this->repository->delete($feature);

        return $this->respond([
            'message' => _tr('alerts.backend.feature.deleted'),
        ]);
    }

    /**
     * validate Feature.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateFeature(Request $request, $action = 'insert')
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
     * validate message for validate feature.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [
            'name.required' => 'Please insert Feature Title',
            'name.max'      => 'Feature Title may not be greater than 191 characters.',
        ];
    }
}
