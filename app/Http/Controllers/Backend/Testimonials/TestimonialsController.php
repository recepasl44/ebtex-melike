<?php

namespace App\Http\Controllers\Backend\Testimonials;

use App\Models\Testimonials\Testimonial;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Responses\RedirectResponse;
use App\Http\Responses\ViewResponse;
use App\Http\Responses\Backend\Testimonials\CreateResponse;
use App\Http\Responses\Backend\Testimonials\EditResponse;
use App\Repositories\Backend\Testimonials\TestimonialRepository;
use App\Http\Requests\Backend\Testimonials\ManageTestimonialRequest;
use App\Http\Requests\Backend\Testimonials\CreateTestimonialRequest;
use App\Http\Requests\Backend\Testimonials\StoreTestimonialRequest;
use App\Http\Requests\Backend\Testimonials\EditTestimonialRequest;
use App\Http\Requests\Backend\Testimonials\UpdateTestimonialRequest;
use App\Http\Requests\Backend\Testimonials\DeleteTestimonialRequest;

/**
 * TestimonialsController
 */
class TestimonialsController extends Controller
{
    /**
     * variable to store the repository object
     * @var TestimonialRepository
     */
    protected $repository;

    /**
     * contructor to initialize repository object
     * @param TestimonialRepository $repository;
     */
    public function __construct(TestimonialRepository $repository)
    {
        parent::__construct();
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  App\Http\Requests\Backend\Testimonials\ManageTestimonialRequest  $request
     * @return \App\Http\Responses\ViewResponse
     */
    public function index(ManageTestimonialRequest $request)
    {
        return new ViewResponse('backend.testimonials.index');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @param  CreateTestimonialRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Testimonials\CreateResponse
     */
    public function create(CreateTestimonialRequest $request)
    {
        return new CreateResponse('backend.testimonials.create');
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreTestimonialRequestNamespace  $request
     * @return \App\Http\Responses\RedirectResponse
     */
    public function store(StoreTestimonialRequest $request)
    {
        //Input received from the request
        $input = $request->except(['_token','remove_file']);
        //Create the model using repository create method
        if($request->hasFile('cover')){
            $input['cover']=$request->cover->store('img/testimonials','public');
        }
        $this->repository->create($input);
        //return with successfull message
        return new RedirectResponse(route('admin.testimonials.index'), ['flash_success' => _tr('alerts.backend.testimonials.created')]);
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  App\Models\Testimonials\Testimonial  $testimonial
     * @param  EditTestimonialRequestNamespace  $request
     * @return \App\Http\Responses\Backend\Testimonials\EditResponse
     */
    public function edit(Testimonial $testimonial, EditTestimonialRequest $request)
    {
        return new EditResponse($testimonial);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateTestimonialRequestNamespace  $request
     * @param  App\Models\Testimonials\Testimonial  $testimonial
     * @return \App\Http\Responses\RedirectResponse
     */
    public function update(UpdateTestimonialRequest $request, Testimonial $testimonial)
    {
        
        //Input received from the request
        $input = $request->except(['_token','remove_file']);
        //Update the model using repository update method
        if($request->hasFile('cover')){
            $input['cover']=$request->cover->store('img/testimonials','public');
        }
        if($request->remove_file){
            $input['cover'] = NULL;
        }
        $this->repository->update( $testimonial, $input );
        //return with successfull message
        return new RedirectResponse(route('admin.testimonials.index'), ['flash_success' => _tr('alerts.backend.testimonials.updated')]);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  DeleteTestimonialRequestNamespace  $request
     * @param  App\Models\Testimonials\Testimonial  $testimonial
     * @return \App\Http\Responses\RedirectResponse
     */
    public function destroy(Testimonial $testimonial, DeleteTestimonialRequest $request)
    {
        //Calling the delete method on repository
        $this->repository->delete($testimonial);
        //returning with successfull message
        return new RedirectResponse(route('admin.testimonials.index'), ['flash_success' => _tr('alerts.backend.testimonials.deleted')]);
    }
    
}
