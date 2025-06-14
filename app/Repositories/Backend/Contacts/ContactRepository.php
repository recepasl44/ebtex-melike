<?php

namespace App\Repositories\Backend\Contacts;

use DB;
use App\Supports\Carbon;
use App\Models\Contacts\Contact;
use App\Exceptions\GeneralException;
use App\Repositories\BaseRepository;
use Illuminate\Database\Eloquent\Model;

/**
 * Class ContactRepository.
 */
class ContactRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = Contact::class;

    /**
     * This method is used by Table Controller
     * For getting the table data to show in
     * the grid
     * @return mixed
     */
    public function getForDataTable()
    {
        return $this->query()
            ->select([
                config('module.contacts.table').'.id',
                config('module.contacts.table').'.first_name',
                config('module.contacts.table').'.last_name',
                config('module.contacts.table').'.email',
                config('module.contacts.table').'.subject',
                config('module.contacts.table').'.message',
                config('module.contacts.table').'.created_at',
                config('module.contacts.table').'.updated_at',
            ]);
    }

    /**
     * For Creating the respective model in storage
     *
     * @param array $input
     * @throws GeneralException
     * @return bool
     */
    public function create(array $input)
    {
        if (Contact::create($input)) {
            return true;
        }
        throw new GeneralException(_tr('exceptions.backend.contacts.create_error'));
    }

    /**
     * For updating the respective Model in storage
     *
     * @param Contact $contact
     * @param  $input
     * @throws GeneralException
     * return bool
     */
    public function update(Contact $contact, array $input)
    {
    	if ($contact->update($input))
            return true;

        throw new GeneralException(_tr('exceptions.backend.contacts.update_error'));
    }

    /**
     * For deleting the respective model from storage
     *
     * @param Contact $contact
     * @throws GeneralException
     * @return bool
     */
    public function delete(Contact $contact)
    {
        if ($contact->delete()) {
            return true;
        }

        throw new GeneralException(_tr('exceptions.backend.contacts.delete_error'));
    }
}
