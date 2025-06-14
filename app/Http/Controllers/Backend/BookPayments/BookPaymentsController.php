<?php

namespace App\Http\Controllers\Backend\BookPayments;

use App\Models\BookPayments\BookPayment;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\BookPayments\CreateResponse;
use App\Http\Responses\Backend\BookPayments\EditResponse;
use App\Repositories\Backend\BookPayments\BookPaymentRepository;
use App\Http\Requests\Backend\BookPayments\ManageBookPaymentRequest;

/**
 * BookPaymentsController
 */
class BookPaymentsController extends Controller
{
    /**
     * variable to store the repository object
     * @var BookPaymentRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param BookPaymentRepository $repository;
     */
    public function __construct(BookPaymentRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\BookPayments\ManageBookPaymentRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageBookPaymentRequest $request)
    {
        return new ViewResponse('backend.bookpayments.index');
    }
    
}
