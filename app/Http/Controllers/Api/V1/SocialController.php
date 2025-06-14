<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\SocialResource;
use App\Models\Socials\Social;
use App\Repositories\Backend\Socials\SocialRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SocialController extends APIController
{
    protected $repository;

    /**
     * __construct.
     *
     * @param $repository
     */
    public function __construct(SocialRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the social.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ? $request->get('paginate') : 25;
        $orderBy = $request->get('orderBy') ? $request->get('orderBy') : 'ASC';
        $sortBy = $request->get('sortBy') ? $request->get('sortBy') : 'created_at';

        return SocialResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }

    /**
     * Return the specified resource.
     *
     * @param Social social
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Social $social)
    {
        return new SocialResource($social);
    }

    /**
     * Creates the Resource for Social.
     *
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validation = $this->validateSocial($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new SocialResource(Social::orderBy('created_at', 'desc')->first());
    }

    /**
     * Update social.
     *
     * @param Social    $social
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, Social $social)
    {
        $validation = $this->validateSocial($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($social, $request->all());

        $social = Social::findOrfail($social->id);

        return new SocialResource($social);
    }

    /**
     * Delete Social.
     *
     * @param Social    $social
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Social $social)
    {
        $this->repository->delete($social);

        return $this->respond([
            'message' => _tr('alerts.backend.social.deleted'),
        ]);
    }

    /**
     * validate Social.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateSocial(Request $request, $action = 'insert')
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
     * validate message for validate social.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [
            'name.required' => 'Please insert Social Title',
            'name.max'      => 'Social Title may not be greater than 191 characters.',
        ];
    }
}
