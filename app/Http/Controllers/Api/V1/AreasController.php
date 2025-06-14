<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\AreaResource;
use App\Models\Areas\Area;
use App\Repositories\Backend\Areas\AreaRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * AreasController
 */
class AreasController extends APIController
{
    /**
     * __construct.
     *
     * @var AreaRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param AreaRepository $repository;
     */
    public function __construct(AreaRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $area.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return AreaResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param Area $area
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Area $area)
    {
        return new AreaResource($area);
    }

    
     /**
      * Creates the Resource for area.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateArea($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new AreaResource(Area::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update area.
         *
         * @param Area    $area
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, Area $area)
    {
        $validation = $this->validateArea($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($area, $request->all());

        $area = Area::findOrfail($area->id);

        return new AreaResource($area);
    }
    
    /**
     * Delete area.
     *
     * @param Area    $area
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Area $area)
    {
        $this->repository->delete($area);

        return $this->respond([
            'message' => _tr('alerts.backend.area.deleted'),
        ]);
    }
    

    /**
     * validate area.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateArea(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'name' => 'required|max:191',
               ]);

        return $validation;
    }

    /**
     * validate message for validate area.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
