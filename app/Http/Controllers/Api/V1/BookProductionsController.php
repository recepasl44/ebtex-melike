<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\BookProductionResource;
use App\Models\BookProductions\BookProduction;
use App\Repositories\Backend\BookProductions\BookProductionRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * BookProductionsController
 */
class BookProductionsController extends APIController
{
    /**
     * __construct.
     *
     * @var BookProductionRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param BookProductionRepository $repository;
     */
    public function __construct(BookProductionRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $bookproduction.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return BookProductionResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param BookProduction $bookproduction
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(BookProduction $bookproduction)
    {
        return new BookProductionResource($bookproduction);
    }

     /**
      * Creates the Resource for bookproduction.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateBookProduction($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new BookProductionResource(BookProduction::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update bookproduction.
         *
         * @param BookProduction    $bookproduction
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, BookProduction $bookproduction)
    {
        $validation = $this->validateBookProduction($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($bookproduction, $request->all());

        $bookproduction = BookProduction::findOrfail($bookproduction->id);

        return new BookProductionResource($bookproduction);
    }

    /**
     * validate bookproduction.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateBookProduction(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'cargo_tracking_number' => 'max:191',
               ]);

        return $validation;
    }

    /**
     * validate message for validate bookproduction.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
