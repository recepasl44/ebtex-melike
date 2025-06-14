<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\BrancheResource;
use App\Models\Branches\Branche;
use App\Repositories\Backend\Branches\BrancheRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * BranchesController
 */
class BranchesController extends APIController
{
    /**
     * __construct.
     *
     * @var BrancheRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param BrancheRepository $repository;
     */
    public function __construct(BrancheRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $branche.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return BrancheResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param Branche $branche
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Branche $branche)
    {
        return new BrancheResource($branche);
    }

    
     /**
      * Creates the Resource for branche.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateBranche($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new BrancheResource(Branche::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update branche.
         *
         * @param Branche    $branche
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, Branche $branche)
    {
        $validation = $this->validateBranche($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($branche, $request->all());

        $branche = Branche::findOrfail($branche->id);

        return new BrancheResource($branche);
    }
    
    /**
     * Delete branche.
     *
     * @param Branche    $branche
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Branche $branche)
    {
        $this->repository->delete($branche);

        return $this->respond([
            'message' => _tr('alerts.backend.branche.deleted'),
        ]);
    }
    

    /**
     * validate branche.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateBranche(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'name' => 'required|max:191',
               ]);

        return $validation;
    }

    /**
     * validate message for validate branche.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
