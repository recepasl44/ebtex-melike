<?php

namespace App\Http\Controllers\Backend\BookProductions;

use App\Models\BookProductions\BookProduction;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\BookProductions\CreateResponse;
use App\Http\Responses\Backend\BookProductions\EditResponse;
use App\Repositories\Backend\BookProductions\BookProductionRepository;
use App\Http\Requests\Backend\BookProductions\ManageBookProductionRequest;

/**
 * BookProductionsController
 */
class BookProductionsController extends Controller
{
    /**
     * variable to store the repository object
     * @var BookProductionRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param BookProductionRepository $repository;
     */
    public function __construct(BookProductionRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\BookProductions\ManageBookProductionRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageBookProductionRequest $request)
    {
        return new ViewResponse('backend.bookproductions.index');
    }
    
}
