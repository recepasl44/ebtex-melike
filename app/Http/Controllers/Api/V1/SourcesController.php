<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\SourceResource;
use App\Models\Sources\Source;
use App\Repositories\Backend\Sources\SourceRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * SourcesController
 */
class SourcesController extends APIController
{
    /**
     * __construct.
     *
     * @var SourceRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param SourceRepository $repository;
     */
    public function __construct(SourceRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $source.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return SourceResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param Source $source
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Source $source)
    {
        return new SourceResource($source);
    }

    
     /**
      * Creates the Resource for source.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateSource($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new SourceResource(Source::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update source.
         *
         * @param Source    $source
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, Source $source)
    {
        $validation = $this->validateSource($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($source, $request->all());

        $source = Source::findOrfail($source->id);

        return new SourceResource($source);
    }
    
    /**
     * Delete source.
     *
     * @param Source    $source
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Source $source)
    {
        $this->repository->delete($source);

        return $this->respond([
            'message' => _tr('alerts.backend.source.deleted'),
        ]);
    }
    

    /**
     * validate source.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateSource(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'name' => 'required|max:191',
               ]);

        return $validation;
    }

    /**
     * validate message for validate source.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
