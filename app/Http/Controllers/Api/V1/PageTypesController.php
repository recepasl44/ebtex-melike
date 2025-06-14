<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\PageTypeResource;
use App\Models\PageTypes\PageType;
use App\Repositories\Backend\PageTypes\PageTypeRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * PageTypesController
 */
class PageTypesController extends APIController
{
    /**
     * __construct.
     *
     * @var PageTypeRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param PageTypeRepository $repository;
     */
    public function __construct(PageTypeRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $pagetype.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return PageTypeResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param PageType $pagetype
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(PageType $pagetype)
    {
        return new PageTypeResource($pagetype);
    }

    
     /**
      * Creates the Resource for pagetype.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validatePageType($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new PageTypeResource(PageType::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update pagetype.
         *
         * @param PageType    $pagetype
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, PageType $pagetype)
    {
        $validation = $this->validatePageType($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($pagetype, $request->all());

        $pagetype = PageType::findOrfail($pagetype->id);

        return new PageTypeResource($pagetype);
    }
    
    /**
     * Delete pagetype.
     *
     * @param PageType    $pagetype
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(PageType $pagetype)
    {
        $this->repository->delete($pagetype);

        return $this->respond([
            'message' => _tr('alerts.backend.pagetype.deleted'),
        ]);
    }
    

    /**
     * validate pagetype.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validatePageType(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'name' => 'required|max:191',
               ]);

        return $validation;
    }

    /**
     * validate message for validate pagetype.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
