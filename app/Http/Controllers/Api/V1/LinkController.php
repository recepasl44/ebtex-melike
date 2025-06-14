<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\LinkResource;
use App\Models\Links\Link;
use App\Repositories\Backend\Links\LinkRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class LinkController extends APIController
{
    protected $repository;

    /**
     * __construct.
     *
     * @param $repository
     */
    public function __construct(LinkRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the link.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ? $request->get('paginate') : 25;
        $orderBy = $request->get('orderBy') ? $request->get('orderBy') : 'ASC';
        $sortBy = $request->get('sortBy') ? $request->get('sortBy') : 'created_at';

        return LinkResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }

    /**
     * Return the specified resource.
     *
     * @param Link link
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Link $link)
    {
        return new LinkResource($link);
    }

    /**
     * Creates the Resource for Link.
     *
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validation = $this->validateLink($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new LinkResource(Link::orderBy('created_at', 'desc')->first());
    }

    /**
     * Update link.
     *
     * @param Link    $link
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, Link $link)
    {
        $validation = $this->validateLink($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($link, $request->all());

        $link = Link::findOrfail($link->id);

        return new LinkResource($link);
    }

    /**
     * Delete Link.
     *
     * @param Link    $link
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Link $link)
    {
        $this->repository->delete($link);

        return $this->respond([
            'message' => _tr('alerts.backend.link.deleted'),
        ]);
    }

    /**
     * validate Link.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateLink(Request $request, $action = 'insert')
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
     * validate message for validate link.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [
            'name.required' => 'Please insert Link Title',
            'name.max'      => 'Link Title may not be greater than 191 characters.',
        ];
    }
}
