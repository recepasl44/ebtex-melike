<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\UnitResource;
use App\Models\Units\Unit;
use App\Repositories\Backend\Units\UnitRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * UnitsController
 */
class UnitsController extends APIController
{
    /**
     * __construct.
     *
     * @var UnitRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param UnitRepository $repository;
     */
    public function __construct(UnitRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $unit.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return UnitResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param Unit $unit
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Unit $unit)
    {
        return new UnitResource($unit);
    }

    
     /**
      * Creates the Resource for unit.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateUnit($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new UnitResource(Unit::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update unit.
         *
         * @param Unit    $unit
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, Unit $unit)
    {
        $validation = $this->validateUnit($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($unit, $request->all());

        $unit = Unit::findOrfail($unit->id);

        return new UnitResource($unit);
    }
    
    /**
     * Delete unit.
     *
     * @param Unit    $unit
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Unit $unit)
    {
        $this->repository->delete($unit);

        return $this->respond([
            'message' => _tr('alerts.backend.unit.deleted'),
        ]);
    }
    

    /**
     * validate unit.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateUnit(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'name' => 'required|max:191',
               'cover' => 'numeric',
               ]);

        return $validation;
    }

    /**
     * validate message for validate unit.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
