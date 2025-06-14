<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\NeighborhoodResource;
use App\Models\Neighborhoods\Neighborhood;
use App\Repositories\Backend\Neighborhoods\NeighborhoodRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * NeighborhoodsController
 */
class NeighborhoodsController extends APIController
{
    /**
     * __construct.
     *
     * @var NeighborhoodRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param NeighborhoodRepository $repository;
     */
    public function __construct(NeighborhoodRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $neighborhood.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return NeighborhoodResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param Neighborhood $neighborhood
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Neighborhood $neighborhood)
    {
        return new NeighborhoodResource($neighborhood);
    }

    
     /**
      * Creates the Resource for neighborhood.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateNeighborhood($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new NeighborhoodResource(Neighborhood::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update neighborhood.
         *
         * @param Neighborhood    $neighborhood
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, Neighborhood $neighborhood)
    {
        $validation = $this->validateNeighborhood($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($neighborhood, $request->all());

        $neighborhood = Neighborhood::findOrfail($neighborhood->id);

        return new NeighborhoodResource($neighborhood);
    }
    
    /**
     * Delete neighborhood.
     *
     * @param Neighborhood    $neighborhood
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Neighborhood $neighborhood)
    {
        $this->repository->delete($neighborhood);

        return $this->respond([
            'message' => _tr('alerts.backend.neighborhood.deleted'),
        ]);
    }
    

    /**
     * validate neighborhood.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateNeighborhood(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'district_id' => 'required',
               'name' => 'required|max:191',
               'zip_code' => 'max:191',
               ]);

        return $validation;
    }

    /**
     * validate message for validate neighborhood.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
