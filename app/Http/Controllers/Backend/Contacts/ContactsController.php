<?php

namespace App\Http\Controllers\Backend\Contacts;

use App\Models\Contacts\Contact;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\Contacts\CreateResponse;
use App\Http\Responses\Backend\Contacts\EditResponse;
use App\Repositories\Backend\Contacts\ContactRepository;
use App\Http\Requests\Backend\Contacts\ManageContactRequest;
use App\Http\Requests\Backend\Contacts\CreateContactRequest;
use App\Http\Requests\Backend\Contacts\StoreContactRequest;
use App\Http\Requests\Backend\Contacts\EditContactRequest;
use App\Http\Requests\Backend\Contacts\UpdateContactRequest;
use App\Http\Requests\Backend\Contacts\DeleteContactRequest;

/**
 * ContactsController
 */
class ContactsController extends Controller
{
    /**
     * variable to store the repository object
     * @var ContactRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param ContactRepository $repository;
     */
    public function __construct(ContactRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\Contacts\ManageContactRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageContactRequest $request)
    {
        return new ViewResponse('backend.contacts.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateContactRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Contacts\CreateResponse
     */
    public function create(CreateContactRequest $request)
    {
        return new CreateResponse('backend.contacts.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreContactRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreContactRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Create the model using repository create method
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.contacts.index'), ['flash_success' => _tr('alerts.backend.contacts.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\Contacts\Contact  $contact
     * @param  EditContactRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Contacts\EditResponse
     */
    public function edit(Contact $contact, EditContactRequest $request)
    {
        return new EditResponse($contact);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateContactRequestNamespace  $request
     * @param  App\Models\Contacts\Contact  $contact
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateContactRequest $request, Contact $contact)
    {
        //Input received from the request
        $input = $request->except(['_token']);
        //Update the model using repository update method
        $this->repository->update( $contact, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.contacts.index'), ['flash_success' => _tr('alerts.backend.contacts.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteContactRequestNamespace  $request
     * @param  App\Models\Contacts\Contact  $contact
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(Contact $contact, DeleteContactRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($contact);
        //returning with successfull message
        return new RedirectResponse(route('admin.contacts.index'), ['flash_success' => _tr('alerts.backend.contacts.deleted')]);
    }
    
}
