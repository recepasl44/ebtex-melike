<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\SeasonResource;
use App\Models\Seasons\Season;
use App\Repositories\Backend\Seasons\SeasonRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * SeasonsController
 */
class SeasonsController extends APIController
{
    /**
     * __construct.
     *
     * @var SeasonRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param SeasonRepository $repository;
     */
    public function __construct(SeasonRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $season.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return SeasonResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param Season $season
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Season $season)
    {
        return new SeasonResource($season);
    }

    
     /**
      * Creates the Resource for season.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateSeason($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new SeasonResource(Season::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update season.
         *
         * @param Season    $season
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, Season $season)
    {
        $validation = $this->validateSeason($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($season, $request->all());

        $season = Season::findOrfail($season->id);

        return new SeasonResource($season);
    }
    
    /**
     * Delete season.
     *
     * @param Season    $season
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Season $season)
    {
        $this->repository->delete($season);

        return $this->respond([
            'message' => _tr('alerts.backend.season.deleted'),
        ]);
    }
    

    /**
     * validate season.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateSeason(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'name' => 'required|max:191',
               ]);

        return $validation;
    }

    /**
     * validate message for validate season.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
