<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\BookletResource;
use App\Models\Booklets\Booklet;
use App\Repositories\Backend\Booklets\BookletRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * BookletsController
 */
class BookletsController extends APIController
{
    /**
     * __construct.
     *
     * @var BookletRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param BookletRepository $repository;
     */
    public function __construct(BookletRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $booklet.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return BookletResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param Booklet $booklet
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Booklet $booklet)
    {
        return new BookletResource($booklet);
    }

    
     /**
      * Creates the Resource for booklet.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateBooklet($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new BookletResource(Booklet::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update booklet.
         *
         * @param Booklet    $booklet
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, Booklet $booklet)
    {
        $validation = $this->validateBooklet($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($booklet, $request->all());

        $booklet = Booklet::findOrfail($booklet->id);

        return new BookletResource($booklet);
    }
    
    /**
     * Delete booklet.
     *
     * @param Booklet    $booklet
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Booklet $booklet)
    {
        $this->repository->delete($booklet);

        return $this->respond([
            'message' => _tr('alerts.backend.booklet.deleted'),
        ]);
    }
    

    /**
     * validate booklet.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateBooklet(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'name' => 'required|max:191',
               'booklet_type_id' => 'required',
               ]);

        return $validation;
    }

    /**
     * validate message for validate booklet.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
