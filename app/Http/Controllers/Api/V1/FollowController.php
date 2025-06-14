<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\FollowResource;
use App\Models\Follows\Follow;
use App\Repositories\Backend\Follows\FollowRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FollowController extends APIController
{
    protected $repository;

    /**
     * __construct.
     *
     * @param $repository
     */
    public function __construct(FollowRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the follow.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ? $request->get('paginate') : 25;
        $orderBy = $request->get('orderBy') ? $request->get('orderBy') : 'ASC';
        $sortBy = $request->get('sortBy') ? $request->get('sortBy') : 'created_at';

        return FollowResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }

    /**
     * Return the specified resource.
     *
     * @param Follow follow
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Follow $follow)
    {
        return new FollowResource($follow);
    }

    /**
     * Creates the Resource for Follow.
     *
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validation = $this->validateFollow($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new FollowResource(Follow::orderBy('created_at', 'desc')->first());
    }

    /**
     * Update follow.
     *
     * @param Follow    $follow
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, Follow $follow)
    {
        $validation = $this->validateFollow($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($follow, $request->all());

        $follow = Follow::findOrfail($follow->id);

        return new FollowResource($follow);
    }

    /**
     * Delete Follow.
     *
     * @param Follow    $follow
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Follow $follow)
    {
        $this->repository->delete($follow);

        return $this->respond([
            'message' => _tr('alerts.backend.follow.deleted'),
        ]);
    }

    /**
     * validate Follow.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateFollow(Request $request, $action = 'insert')
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
     * validate message for validate follow.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [
            'name.required' => 'Please insert Follow Title',
            'name.max'      => 'Follow Title may not be greater than 191 characters.',
        ];
    }
}
