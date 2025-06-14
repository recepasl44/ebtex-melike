<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\PagePositionResource;
use App\Models\PagePositions\PagePosition;
use App\Repositories\Backend\PagePositions\PagePositionRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * PagePositionsController
 */
class PagePositionsController extends APIController
{
    /**
     * __construct.
     *
     * @var PagePositionRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param PagePositionRepository $repository;
     */
    public function __construct(PagePositionRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $pageposition.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return PagePositionResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param PagePosition $pageposition
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(PagePosition $pageposition)
    {
        return new PagePositionResource($pageposition);
    }

    
     /**
      * Creates the Resource for pageposition.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validatePagePosition($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new PagePositionResource(PagePosition::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update pageposition.
         *
         * @param PagePosition    $pageposition
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, PagePosition $pageposition)
    {
        $validation = $this->validatePagePosition($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($pageposition, $request->all());

        $pageposition = PagePosition::findOrfail($pageposition->id);

        return new PagePositionResource($pageposition);
    }
    
    /**
     * Delete pageposition.
     *
     * @param PagePosition    $pageposition
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(PagePosition $pageposition)
    {
        $this->repository->delete($pageposition);

        return $this->respond([
            'message' => _tr('alerts.backend.pageposition.deleted'),
        ]);
    }
    

    /**
     * validate pageposition.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validatePagePosition(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'name' => 'required|max:191',
               ]);

        return $validation;
    }

    /**
     * validate message for validate pageposition.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
