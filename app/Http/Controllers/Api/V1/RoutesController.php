<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\RouteResource;
use App\Models\Routes\Route;
use App\Repositories\Backend\Routes\RouteRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * RoutesController
 */
class RoutesController extends APIController
{
    /**
     * __construct.
     *
     * @var RouteRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param RouteRepository $repository;
     */
    public function __construct(RouteRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $route.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return RouteResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param Route $route
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Route $route)
    {
        return new RouteResource($route);
    }

    
     /**
      * Creates the Resource for route.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateRoute($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new RouteResource(Route::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update route.
         *
         * @param Route    $route
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, Route $route)
    {
        $validation = $this->validateRoute($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($route, $request->all());

        $route = Route::findOrfail($route->id);

        return new RouteResource($route);
    }
    
    /**
     * Delete route.
     *
     * @param Route    $route
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Route $route)
    {
        $this->repository->delete($route);

        return $this->respond([
            'message' => _tr('alerts.backend.route.deleted'),
        ]);
    }
    

    /**
     * validate route.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateRoute(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'name' => 'required|max:191',
               ]);

        return $validation;
    }

    /**
     * validate message for validate route.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
