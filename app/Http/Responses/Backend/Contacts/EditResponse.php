<?php

namespace App\Http\Responses\Backend\Contacts;

use Illuminate\Contracts\Support\Responsable;

class EditResponse implements Responsable
{
    /**
     * @var App\Models\Contacts\Contact
     */
    protected $contacts;

    /**
     * @param App\Models\Contacts\Contact $contacts
     */
    public function __construct($contacts)
    {
        $this->contacts = $contacts;
    }

    /**
     * To Response
     *
     * @param \App\Http\Requests\Request $request
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function toResponse($request)
    {
        return view('backend.contacts.edit')->with([
            'contacts' => $this->contacts
        ]);
    }
}