<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Faqs\Faq;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Settings\Setting;
use App\Repositories\Frontend\Pages\PagesRepository;
use App\Models\Sliders\Slider;
use App\Models\Cards\Card;
use App\Models\Projects\Project;
use App\Models\Contacts\Contact;
use App\Models\Members\Member;
use App\Models\Testimonials\Testimonial;
use App\Models\References\Reference;
use App\Models\Subscribes\Subscribe;
use App\Models\Blogs\Blog;

/**
 * Class FrontendController.
 */
class FrontendController extends Controller
{
    /**
     * @return \Illuminate\View\View
     */
    public function index()
    {
//        if (!access()->user()) {
//            return redirect()->route('frontend.auth.login');
//        }else{
//            return redirect()->route('admin.dashboard');
//        }
        $setting = Setting::first();
        $google_analytics = $setting->google_analytics;
        $services = Card::where('status',1)->where('type',0)->get();
        $solutions = Card::where('status',1)->where('type',1)->get();
        $features = Card::where('status',1)->where('type',2)->get();
        $prices = Card::where('status',1)->where('type',3)->get();
        $projects = Project::where('status',1)->get();
        $members = Member::where('status',1)->get();
        $testimonials = Testimonial::all();
        $references = Reference::all();
        $blogs = Blog::limit(3)->get();
        $faqs = Faq::all();

        return view('frontend.index', compact('google_analytics', 'services', 'solutions', 'projects', 'members', 'testimonials', 'references','blogs', 'features','prices', 'faqs'));
    }

    /**
     * show page by $page_slug.
     */
    public function showPage($slug, PagesRepository $pages)
    {
        $result = $pages->findBySlug($slug);
        $pages = $pages->getAll();
        return view('frontend.pages.index',compact('pages'))
            ->withpage($result);
    }

    public function blog()
    {
        $blog = Blog::all();
        return view('frontend.pages.blog',compact('blog'));
    }

    public function showBlog($slug)
    {
        $blog = Blog::whereSlug($slug)->first();
        return view('frontend.pages.show_blog',compact('blog'));
    }


    public function services()
    {
        $services = Card::where('type',0)->orderBy('order_by','ASC')->get();
        return view('frontend.pages.services',compact('services'));
    }
    public function showService($slug)
    {
        $services = Card::where('type',0)->whereNull('parent_id')->orderBy('order_by','ASC')->get();
        $service = Card::where('type',0)->where('slug',$slug)->first();

        if(!empty($service->children) && $service->children->count() > 0){
            $services = $service->children()->where('type',0)->orderBy('order_by','ASC')->get();
            return view('frontend.pages.services',compact('services', 'service'));
        }

        return view('frontend.pages.show_service',compact('service', 'services'));
    }

    public function products()
    {
        $products = Card::where('type',4)->orderBy('order_by','ASC')->get();
        return view('frontend.pages.products',compact('products'));
    }
    public function showProduct($slug)
    {
        $products = Card::where('type',4)->orderBy('order_by','ASC')->get();
        $product = Card::where('type',4)->where('slug',$slug)->first();

        if(!empty($product->children) && $product->children->count() > 0){
            $products = $product->children()->where('type',4)->orderBy('order_by','ASC')->get();
            return view('frontend.pages.products',compact('products', 'product'));
        }

        return view('frontend.pages.show_product',compact('product', 'products'));
    }

    public function projects()
    {
        $projects = Project::all();
        return view('frontend.pages.projects',compact('projects'));
    }
    public function contact()
    {
        return view('frontend.pages.contact');
    }

    public function aboutUs()
    {
        $services = Card::where('type',0)->get();
        $solutions = Card::where('type',1)->get();
        return view('frontend.pages.about_us',compact('services', 'solutions'));
    }

    public function aboutMe()
    {
        return view('frontend.pages.about_me');
    }

    public function aboutTeam()
    {
        return view('frontend.pages.about_team');
    }
    
    public function contactSave(Request $request){
        $messages = [
            'first_name.required'    => 'Lütfen bu alanı doldurunuz*',
            'last_name.required'     => 'Lütfen bu alanı doldurunuz*',
            'email.required'         => 'Lütfen bu alanı doldurunuz*',
            'email.email'            => 'Lütfen email adresinizi giriniz*',
            'subject.required'       => 'Lütfen bu alanı doldurunuz*',
            'message.required'       => 'Lütfen bu alanı doldurunuz*',
        ];

        $validator = Validator::make($request->all(), [
            'first_name'    => 'required',
            'last_name'     => 'required',
            'email'         => 'required|email',
            'subject'       => 'required',
            'message'       => 'required',
        ], $messages);

        if ($validator->fails()) {
            return redirect()
                ->back()
                ->withErrors($validator)
                ->withInput();
        }

        try {
            $contact = new Contact();
            $contact->first_name = $request->first_name??null;
            $contact->last_name = $request->last_name??null;
            $contact->email = $request->email??null;
            $contact->subject = $request->subject??null;
            $contact->message = $request->message??null;
            $contact->save();
            $request->session()->flash('status', 1);
            return response()->json(['status' => 'true', 'response' => 'success', 'message' => 'İletişim bilgileriniz alınmıştır, size en kısa zamanda geri dönüş yapılacaktır', 'responseText' => 'İletişim bilgileriniz alınmıştır, size en kısa zamanda geri dönüş yapılacaktır']);
        }catch (\Exception $exception){
            $request->session()->flash('status', 0);
            return response()->json(['status' => 'false']);
        }

    }

    public function postSubscribe(Request $request)
    {
        $subscribe = [
            'email.required'         => 'Lütfen bu alanı doldurunuz*',
            'email.email'            => 'Lütfen email adresinizi giriniz*',
        ];

        $validator = Validator::make($request->all(), [
            'email'         => 'required|email',
        ], $subscribe);

        if ($validator->fails()) {
            return redirect()
                ->back()
                ->withErrors($validator)
                ->withInput();
        }

        try {
            $subscribe = new Subscribe();
            $subscribe->name = $request->name??null;
            $subscribe->email = $request->email??null;
            $subscribe->phone = $request->phone??null;
            $subscribe->save();

            $request->session()->flash('status', 1);
            return redirect()->back();
        }catch (\Exception $exception){
            $request->session()->flash('status', 0);
            return redirect()->back();
        }
    }
}
