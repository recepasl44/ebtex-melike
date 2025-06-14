<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\BookPackageResource;
use App\Models\BookPackages\BookPackage;
use App\Repositories\Backend\BookPackages\BookPackageRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * BookPackagesController
 */
class BookPackagesController extends APIController
{
    /**
     * __construct.
     *
     * @var BookPackageRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param BookPackageRepository $repository;
     */
    public function __construct(BookPackageRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $bookpackage.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return BookPackageResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param BookPackage $bookpackage
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(BookPackage $bookpackage)
    {
        return new BookPackageResource($bookpackage);
    }

    
     /**
      * Creates the Resource for bookpackage.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateBookPackage($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new BookPackageResource(BookPackage::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update bookpackage.
         *
         * @param BookPackage    $bookpackage
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, BookPackage $bookpackage)
    {
        $validation = $this->validateBookPackage($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($bookpackage, $request->all());

        $bookpackage = BookPackage::findOrfail($bookpackage->id);

        return new BookPackageResource($bookpackage);
    }
    
    /**
     * Delete bookpackage.
     *
     * @param BookPackage    $bookpackage
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(BookPackage $bookpackage)
    {
        $this->repository->delete($bookpackage);

        return $this->respond([
            'message' => _tr('alerts.backend.bookpackage.deleted'),
        ]);
    }
    

    /**
     * validate bookpackage.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateBookPackage(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'name' => 'required|max:191',
               ]);

        return $validation;
    }

    /**
     * validate message for validate bookpackage.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
