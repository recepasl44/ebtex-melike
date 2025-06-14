<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\MenuResource;
use App\Models\Menu\Menu;
use App\Repositories\Backend\Menu\MenuRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MenusController extends APIController
{
    protected $repository;

    /**
     * __construct.
     *
     * @param $repository
     */
    public function __construct(MenuRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Return the menu.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $limit = $request->get('paginate') ? $request->get('paginate') : 25;
        $orderBy = $request->get('orderBy') ? $request->get('orderBy') : 'ASC';
        $sortBy = $request->get('sortBy') ? $request->get('sortBy') : 'created_at';

        return MenuResource::collection(
            $this->repository->getForDataTable()->orderBy($sortBy, $orderBy)->paginate($limit)->appends(request()->query())
        );
    }

    /**
     * Return the specified resource.
     *
     * @param Menu menu
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Menu $menu)
    {
        return new MenuResource($menu);
    }

    /**
     * Creates the Resource for Menu.
     *
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validation = $this->validateMenu($request);

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->create($request->all());

        return new MenuResource(Menu::orderBy('created_at', 'desc')->first());
    }

    /**
     * Update menu.
     *
     * @param Menu    $menu
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, Menu $menu)
    {
        $validation = $this->validateMenu($request, 'update');

        if ($validation->fails()) {
            return $this->throwValidation($validation->messages()->first());
        }

        $this->repository->update($menu, $request->all());

        $menu = Menu::findOrfail($menu->id);

        return new MenuResource($menu);
    }

    /**
     * Delete Menu.
     *
     * @param Menu    $menu
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Menu $menu)
    {
        $this->repository->delete($menu);

        return $this->respond([
            'message' => _tr('alerts.backend.menu.deleted'),
        ]);
    }

    /**
     * validate Menu.
     *
     * @param $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function validateMenu(Request $request, $action = 'insert')
    {
        $featured_image = ($action == 'insert') ? 'required' : '';

        $publish_datetime = $request->publish_datetime !== '' ? 'required|date' : 'required';

        $validation = Validator::make($request->all(), [
            'name'              => 'required|max:191',
        ]);

        return $validation;
    }

    /**
     * validate message for validate menu.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function messages()
    {
        return [
            'name.required' => 'Please insert Menu Title',
            'name.max'      => 'Menu Title may not be greater than 191 characters.',
        ];
    }
}
