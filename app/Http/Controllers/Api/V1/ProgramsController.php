<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\ProgramResource;
use App\Models\Programs\Program;
use App\Repositories\Backend\Programs\ProgramRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

/**
 * ProgramsController
 */
class ProgramsController extends APIController
{
    /**
     * __construct.
     *
     * @var ProgramRepository
     * @param $repository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param ProgramRepository $repository;
     */
    public function __construct(ProgramRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the $program.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ?? 25;
        $orderBy = $request->get('orderBy') ?? 'ASC';
        $sortBy = $request->get('sortBy') ?? 'created_at';
        return ProgramResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }
    /**
     * Return the specified resource.
     *
     * @param Program $program
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Program $program)
    {
        return new ProgramResource($program);
    }

    
     /**
      * Creates the Resource for program.
      *
      * @param Request $request
      *
      * @return \Illuminate\Http\JsonResponse
      */
    public function store(Request $request)
    {
        $validation = $this->validateProgram($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new ProgramResource(Program::orderBy('created_at', 'desc')->first());

    }
    /**
         * Update program.
         *
         * @param Program    $program
         * @param Request $request
         *
         * @return \Illuminate\Http\JsonResponse
         */
    public function update(Request $request, Program $program)
    {
        $validation = $this->validateProgram($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($program, $request->all());

        $program = Program::findOrfail($program->id);

        return new ProgramResource($program);
    }
    
    /**
     * Delete program.
     *
     * @param Program    $program
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Program $program)
    {
        $this->repository->delete($program);

        return $this->respond([
            'message' => _tr('alerts.backend.program.deleted'),
        ]);
    }
    

    /**
     * validate program.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateProgram(Request $request, $action = 'insert')
    {
        $validation = Validator::make($request->all(), [
               'name' => 'required|max:191',
               ]);

        return $validation;
    }

    /**
     * validate message for validate program.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [

        ];
    }
}
