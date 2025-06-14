<?php

namespace App\Http\Controllers\Backend\ClassRooms;

use App\Models\ClassRooms\ClassRoom;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\ClassRooms\CreateResponse;
use App\Http\Responses\Backend\ClassRooms\EditResponse;
use App\Repositories\Backend\ClassRooms\ClassRoomRepository;
use App\Http\Requests\Backend\ClassRooms\ManageClassRoomRequest;
use App\Http\Requests\Backend\ClassRooms\CreateClassRoomRequest;
use App\Http\Requests\Backend\ClassRooms\StoreClassRoomRequest;
use App\Http\Requests\Backend\ClassRooms\EditClassRoomRequest;
use App\Http\Requests\Backend\ClassRooms\UpdateClassRoomRequest;
use App\Http\Requests\Backend\ClassRooms\DeleteClassRoomRequest;

/**
 * ClassRoomsController
 */
class ClassRoomsController extends Controller
{
    /**
     * variable to store the repository object
     * @var ClassRoomRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param ClassRoomRepository $repository;
     */
    public function __construct(ClassRoomRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\ClassRooms\ManageClassRoomRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageClassRoomRequest $request)
    {
        return new ViewResponse('backend.classrooms.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateClassRoomRequestNamespace  $request
     * @return \App\Http\Responses\Backend\ClassRooms\CreateResponse
     */
    public function create(CreateClassRoomRequest $request)
    {
        return new CreateResponse('backend.classrooms.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreClassRoomRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreClassRoomRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.classrooms.index'), ['flash_success' => _tr('alerts.backend.classrooms.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\ClassRooms\ClassRoom  $classroom
     * @param  EditClassRoomRequestNamespace  $request
     * @return \App\Http\Responses\Backend\ClassRooms\EditResponse
     */
    public function edit(ClassRoom $classroom, EditClassRoomRequest $request)
    {
        return new EditResponse($classroom);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateClassRoomRequestNamespace  $request
     * @param  App\Models\ClassRooms\ClassRoom  $classroom
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateClassRoomRequest $request, ClassRoom $classroom)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $classroom, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.classrooms.index'), ['flash_success' => _tr('alerts.backend.classrooms.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteClassRoomRequestNamespace  $request
     * @param  App\Models\ClassRooms\ClassRoom  $classroom
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(ClassRoom $classroom, DeleteClassRoomRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($classroom);
        //returning with successfull message
        return new RedirectResponse(route('admin.classrooms.index'), ['flash_success' => _tr('alerts.backend.classrooms.deleted')]);
    }
    
}
