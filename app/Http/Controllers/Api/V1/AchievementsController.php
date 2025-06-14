<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\AchievementResource;
use App\Models\Achievements\Achievement;
use App\Repositories\Backend\Achievements\AchievementRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * AchievementsController
 */
class AchievementsController extends APIController
{
    /**
     * __construct.
     *
     * @var AchievementRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param AchievementRepository $repository;
     */
    public function __construct(AchievementRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $achievement.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return AchievementResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param Achievement $achievement
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Achievement $achievement)
    {
        return new AchievementResource($achievement);
    }

    
     /**
      * Creates the Resource for achievement.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateAchievement($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new AchievementResource(Achievement::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update achievement.
         *
         * @param Achievement    $achievement
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, Achievement $achievement)
    {
        $validation = $this->validateAchievement($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($achievement, $request->all());

        $achievement = Achievement::findOrfail($achievement->id);

        return new AchievementResource($achievement);
    }
    
    /**
     * Delete achievement.
     *
     * @param Achievement    $achievement
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Achievement $achievement)
    {
        $this->repository->delete($achievement);

        return $this->respond([
            'message' => _tr('alerts.backend.achievement.deleted'),
        ]);
    }
    

    /**
     * validate achievement.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateAchievement(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'name' => 'required|max:191',
               'cover' => 'numeric',
               ]);

        return $validation;
    }

    /**
     * validate message for validate achievement.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
