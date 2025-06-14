<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\BookletTypeResource;
use App\Models\BookletTypes\BookletType;
use App\Repositories\Backend\BookletTypes\BookletTypeRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * BookletTypesController
 */
class BookletTypesController extends APIController
{
    /**
     * __construct.
     *
     * @var BookletTypeRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param BookletTypeRepository $repository;
     */
    public function __construct(BookletTypeRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $booklettype.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return BookletTypeResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param BookletType $booklettype
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(BookletType $booklettype)
    {
        return new BookletTypeResource($booklettype);
    }

    
     /**
      * Creates the Resource for booklettype.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateBookletType($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new BookletTypeResource(BookletType::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update booklettype.
         *
         * @param BookletType    $booklettype
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, BookletType $booklettype)
    {
        $validation = $this->validateBookletType($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($booklettype, $request->all());

        $booklettype = BookletType::findOrfail($booklettype->id);

        return new BookletTypeResource($booklettype);
    }
    
    /**
     * Delete booklettype.
     *
     * @param BookletType    $booklettype
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(BookletType $booklettype)
    {
        $this->repository->delete($booklettype);

        return $this->respond([
            'message' => _tr('alerts.backend.booklettype.deleted'),
        ]);
    }
    

    /**
     * validate booklettype.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateBookletType(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'name' => 'required|max:191',
               ]);

        return $validation;
    }

    /**
     * validate message for validate booklettype.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
