<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\LevelResource;
use App\Models\Levels\Level;
use App\Repositories\Backend\Levels\LevelRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * LevelsController
 */
class LevelsController extends APIController
{
    /**
     * __construct.
     *
     * @var LevelRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param LevelRepository $repository;
     */
    public function __construct(LevelRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $level.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return LevelResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param Level $level
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Level $level)
    {
        return new LevelResource($level);
    }

    
     /**
      * Creates the Resource for level.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateLevel($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new LevelResource(Level::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update level.
         *
         * @param Level    $level
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, Level $level)
    {
        $validation = $this->validateLevel($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($level, $request->all());

        $level = Level::findOrfail($level->id);

        return new LevelResource($level);
    }
    
    /**
     * Delete level.
     *
     * @param Level    $level
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Level $level)
    {
        $this->repository->delete($level);

        return $this->respond([
            'message' => _tr('alerts.backend.level.deleted'),
        ]);
    }
    

    /**
     * validate level.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateLevel(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'program_id' => 'required',
               'name' => 'required|max:191',
               ]);

        return $validation;
    }

    /**
     * validate message for validate level.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
