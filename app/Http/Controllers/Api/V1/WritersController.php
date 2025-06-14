<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\WriterResource;
use App\Models\Writers\Writer;
use App\Repositories\Backend\Writers\WriterRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * WritersController
 */
class WritersController extends APIController
{
    /**
     * __construct.
     *
     * @var WriterRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param WriterRepository $repository;
     */
    public function __construct(WriterRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $writer.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return WriterResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param Writer $writer
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Writer $writer)
    {
        return new WriterResource($writer);
    }

    
     /**
      * Creates the Resource for writer.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateWriter($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new WriterResource(Writer::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update writer.
         *
         * @param Writer    $writer
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, Writer $writer)
    {
        $validation = $this->validateWriter($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($writer, $request->all());

        $writer = Writer::findOrfail($writer->id);

        return new WriterResource($writer);
    }
    
    /**
     * Delete writer.
     *
     * @param Writer    $writer
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Writer $writer)
    {
        $this->repository->delete($writer);

        return $this->respond([
            'message' => _tr('alerts.backend.writer.deleted'),
        ]);
    }
    

    /**
     * validate writer.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateWriter(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'full_name' => 'required|max:191',
               ]);

        return $validation;
    }

    /**
     * validate message for validate writer.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
