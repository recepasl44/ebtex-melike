<?php

namespace App\Repositories\Frontend\Pages;

use App\Exceptions\GeneralException;
use App\Models\Page\Page;
use App\Repositories\BaseRepository;

/**
 * Class PagesRepository.
 */
class PagesRepository extends BaseRepository
{
    /**
     * Associated Repository Model.
     */
    const MODEL = Page::class;

    /*
    * Find page by page_slug
    */
    public function findBySlug($page_slug)
    {
        if (!is_null($this->query()->wherePage_slug($page_slug)->firstOrFail())) {
            return $this->query()->wherePage_slug($page_slug)->firstOrFail();
        }

        throw new GeneralException(_tr('exceptions.backend.access.pages.not_found'));
    }
    public function getAll()
    {
        if (!is_null($this->query()->get())) {
            return $this->query()->get();
        }

        throw new GeneralException(_tr('exceptions.backend.access.pages.not_found'));
    }
}
