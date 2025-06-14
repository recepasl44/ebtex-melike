<?php

namespace App\Http\Controllers\Backend\Cards;

use App\Models\Cards\Card;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\Cards\CreateResponse;
use App\Http\Responses\Backend\Cards\EditResponse;
use App\Repositories\Backend\Cards\CardRepository;
use App\Http\Requests\Backend\Cards\ManageCardRequest;
use App\Http\Requests\Backend\Cards\CreateCardRequest;
use App\Http\Requests\Backend\Cards\StoreCardRequest;
use App\Http\Requests\Backend\Cards\EditCardRequest;
use App\Http\Requests\Backend\Cards\UpdateCardRequest;
use App\Http\Requests\Backend\Cards\DeleteCardRequest;

/**
 * CardsController
 */
class CardsController extends Controller
{
    /**
     * variable to store the repository object
     * @var CardRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param CardRepository $repository;
     */
    public function __construct(CardRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\Cards\ManageCardRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageCardRequest $request)
    {
        return new ViewResponse('backend.cards.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateCardRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Cards\CreateResponse
     */
    public function create(CreateCardRequest $request)
    {
        return new CreateResponse('backend.cards.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreCardRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreCardRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token','remove_file']);
        //Create the model using repository create method
        if($request->hasFile('icon')){
            $input['icon']=$request->icon->store('img/cards','public');
        }
        if($request->hasFile('cover')){
            $input['cover']=$request->cover->store('img/cards','public');
        }
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.cards.index'), ['flash_success' => _tr('alerts.backend.cards.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\Cards\Card  $card
     * @param  EditCardRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Cards\EditResponse
     */
    public function edit($id, EditCardRequest $request)
    {
		$card = $this->repository->find($id);
        return new EditResponse($card);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateCardRequestNamespace  $request
     * @param  App\Models\Cards\Card  $card
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateCardRequest $request, $id)
    {
		$card = $this->repository->find($id);
        //Input received from the request
        $input = $request->except(['_token','remove_file']);
         //Update the model using repository update method
        if($request->hasFile('icon')){
            $input['icon']=$request->icon->store('img/cards','public');
        }
        if($request->remove_file){
            $input['icon'] = NULL;
        }
        if($request->hasFile('cover')){
            $input['cover']=$request->cover->store('img/cards','public');
        }
        if($request->remove_file){
            $input['cover'] = NULL;
        }
        $this->repository->update( $card, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.cards.index'), ['flash_success' => _tr('alerts.backend.cards.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteCardRequestNamespace  $request
     * @param  App\Models\Cards\Card  $card
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy($id, DeleteCardRequest $request)
    {
        $card = $this->repository->find($id);
        //Calling the delete method on repository
        $this->repository->delete($card);
        //returning with successfull message
        return new RedirectResponse(route('admin.cards.index'), ['flash_success' => _tr('alerts.backend.cards.deleted')]);
    }
    
}
