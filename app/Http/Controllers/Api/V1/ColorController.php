<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\ColorResource;
use App\Models\Colors\Color;
use App\Repositories\Backend\Colors\ColorRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ColorController extends APIController
{
    protected $repository;

    /**
     * __construct.
     *
     * @param $repository
     */
    public function __construct(ColorRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the color.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ? $request->get('paginate') : 25;
        $orderBy = $request->get('orderBy') ? $request->get('orderBy') : 'ASC';
        $sortBy = $request->get('sortBy') ? $request->get('sortBy') : 'created_at';

        return ColorResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }

    /**
     * Return the specified resource.
     *
     * @param Color color
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Color $color)
    {
        return new ColorResource($color);
    }

    /**
     * Creates the Resource for Color.
     *
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validation = $this->validateColor($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new ColorResource(Color::orderBy('created_at', 'desc')->first());
    }

    /**
     * Update color.
     *
     * @param Color    $color
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, Color $color)
    {
        $validation = $this->validateColor($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($color, $request->all());

        $color = Color::findOrfail($color->id);

        return new ColorResource($color);
    }

    /**
     * Delete Color.
     *
     * @param Color    $color
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Color $color)
    {
        $this->repository->delete($color);

        return $this->respond([
            'message' => _tr('alerts.backend.color.deleted'),
        ]);
    }

    /**
     * validate Color.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateColor(Request $request, $action = 'insert')
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
     * validate message for validate color.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [
            'name.required' => 'Please insert Color Title',
            'name.max'      => 'Color Title may not be greater than 191 characters.',
        ];
    }
}
