<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Database\DisableForeignKeys;
use Database\TruncateTable;

class MenusTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('menus')->delete();
        
        \DB::table('menus')->insert(array (
            0 => 
            array (
                'id' => 1,
                'type' => 'backend',
                'name' => 'Backend Sidebar Menu',
                'items' => '[{"id":11,"name":"Access Management","url":"","url_type":"route","open_in_new_tab":0,"icon":"fa-users","view_permission_id":"view-access-management","content":"Access Management","children":[{"id":12,"name":"User Management","url":"admin.access.user.index","url_type":"route","open_in_new_tab":0,"view_permission_id":"view-user-management","content":"User Management"},{"id":13,"name":"Role Management","url":"admin.access.role.index","url_type":"route","open_in_new_tab":0,"view_permission_id":"view-role-management","content":"Role Management"},{"id":14,"name":"Permission Management","url":"admin.access.permission.index","url_type":"route","open_in_new_tab":0,"view_permission_id":"view-permission-management","content":"Permission Management"}]},{"id":1,"name":"Module","url":"admin.modules.index","url_type":"route","open_in_new_tab":0,"icon":"fa-wrench","view_permission_id":"view-module","content":"Module"},{"id":3,"name":"Menus","url":"admin.menus.index","url_type":"route","open_in_new_tab":0,"icon":"fa-bars","view_permission_id":"view-menu","content":"Menus"},{"id":2,"name":"Pages","url":"admin.pages.index","url_type":"route","open_in_new_tab":0,"icon":"fa-file-text","view_permission_id":"view-page","content":"Pages"},{"id":9,"name":"Settings","url":"admin.settings.edit?setting=1","url_type":"route","open_in_new_tab":0,"icon":"fa-gear","view_permission_id":"edit-settings","content":"Settings"},{"id":15,"name":"Blog Management","url":"","url_type":"route","open_in_new_tab":0,"icon":"fa-commenting","view_permission_id":"view-blog","content":"Blog Management","children":[{"id":16,"name":"Blog Category Management","url":"admin.blogCategories.index","url_type":"route","open_in_new_tab":0,"view_permission_id":"view-blog-category","content":"Blog Category Management"},{"id":17,"name":"Blog Tag Management","url":"admin.blogTags.index","url_type":"route","open_in_new_tab":0,"view_permission_id":"view-blog-tag","content":"Blog Tag Management"},{"id":18,"name":"Blog Management","url":"admin.blogs.index","url_type":"route","open_in_new_tab":0,"view_permission_id":"view-blog","content":"Blog Management"}]},{"id":19,"name":"Faq Management","url":"admin.faqs.index","url_type":"route","open_in_new_tab":0,"icon":"fa-question-circle","view_permission_id":"view-faq","content":"Faq Management"},{"view_permission_id":"view-navbar-permission","open_in_new_tab":0,"url_type":"route","url":"admin.navbars.index","name":"Navbars","id":20,"content":"Navbars"},{"id":21,"name":"Sliders","url":"admin.sliders.index","url_type":"route","open_in_new_tab":0,"view_permission_id":"view-sliders-permission","content":"Sliders"},{"view_permission_id":"view-card-permission","open_in_new_tab":0,"url_type":"route","url":"admin.cards.index","name":"Cards","id":22,"content":"Cards"},{"id":23,"name":"Projects","url":"admin.projects.index","url_type":"route","open_in_new_tab":0,"view_permission_id":"view-project-permission","content":"Projects"},{"view_permission_id":"view-member-permission","open_in_new_tab":0,"url_type":"route","url":"admin.members.index","name":"Members","id":24,"content":"Members"}]',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => '2021-08-30 19:09:09',
                'updated_at' => NULL,
                'deleted_at' => NULL,
                'platform_id' => 2,
            ),
            1 => 
            array (
                'id' => 2,
                'type' => 'backend',
                'name' => 'Backend Sidebar Menu',
                'items' => '[{"view_permission_id":"view-access-management","icon":"la-users","open_in_new_tab":0,"url_type":"route","url":"","name":"Access","id":11,"children":[{"view_permission_id":"view-user-management","open_in_new_tab":0,"url_type":"route","url":"admin.access.user.index","name":"Users","id":12},{"view_permission_id":"view-role-management","open_in_new_tab":0,"url_type":"route","url":"admin.access.role.index","name":"Roles","id":13},{"view_permission_id":"view-permission-management","open_in_new_tab":0,"url_type":"route","url":"admin.access.permission.index","name":"Permissions","id":14}]},{"id":46,"name":"Students","url":"#","url_type":"static","open_in_new_tab":0,"icon":"la-graduation-cap","view_permission_id":"view-student-permission","children":[{"id":74,"name":"PreRegistrations","url":"#","url_type":"static","open_in_new_tab":0,"icon":"la-user","view_permission_id":"view-students","children":[{"id":76,"name":"PreRegistration","url":"admin.students.create","url_type":"route","open_in_new_tab":0,"icon":"","view_permission_id":"create-preregistration"},{"id":47,"name":"PreRegistration List","url":"admin.students.index","url_type":"route","open_in_new_tab":0,"icon":"","view_permission_id":"view-student-permission"},{"view_permission_id":"view-appointment-permission","open_in_new_tab":0,"url_type":"route","url":"admin.appointments.index","name":"Appointments","id":73},{"id":75,"name":"Meetings","url":"admin.meetings.index","url_type":"route","open_in_new_tab":0,"view_permission_id":"view-meeting-permission"},{"view_permission_id":"view-userdiscount-permission","open_in_new_tab":0,"url_type":"route","url":"admin.userdiscounts.index","name":"UserDiscounts","id":77},{"id":78,"name":"Import Students","url":"admin.students.import","url_type":"route","open_in_new_tab":0,"icon":"","view_permission_id":"import-student"}]},{"id":79,"name":"Registrations","url":"#","url_type":"static","open_in_new_tab":0,"icon":"la-users","view_permission_id":"view-registrations","children":[{"id":50,"name":"Final Registration","url":"admin.students.registration","url_type":"route","open_in_new_tab":0,"icon":"","view_permission_id":""},{"view_permission_id":"view-internsl","icon":"","open_in_new_tab":0,"url_type":"route","url":"admin.students.internal.records","name":"Internal Recors","id":80},{"id":51,"name":"Services","url":"admin.services.index","url_type":"route","open_in_new_tab":0,"view_permission_id":"view-services-permission"},{"view_permission_id":"view-discount-permission","open_in_new_tab":0,"url_type":"route","url":"admin.discounts.index","name":"Discounts","id":52}]}]},{"view_permission_id":"","icon":"la-list","open_in_new_tab":0,"url_type":"static","url":"#","name":"Lists","id":81,"children":[{"view_permission_id":"view-students","icon":"","open_in_new_tab":0,"url_type":"route","url":"admin.students.list","name":"Student List","id":82},{"id":83,"name":"ClassRoom List","url":"admin.classrooms.index","url_type":"route","open_in_new_tab":0,"icon":"","view_permission_id":"view-classroom-permission"}]},{"id":56,"name":"Question Pool","url":"#","url_type":"static","open_in_new_tab":0,"icon":"la-file-archive","view_permission_id":"view-questions","children":[{"id":57,"name":"Lessons","url":"admin.lessons.index","url_type":"route","open_in_new_tab":0,"view_permission_id":"view-lesson-permission"},{"id":58,"name":"Units","url":"admin.units.index","url_type":"route","open_in_new_tab":0,"view_permission_id":"view-unit-permission"},{"id":59,"name":"Chapters","url":"admin.chapters.index","url_type":"route","open_in_new_tab":0,"view_permission_id":"view-chapter-permission"},{"id":60,"name":"Topics","url":"admin.topics.index","url_type":"route","open_in_new_tab":0,"view_permission_id":"view-topic-permission"},{"id":61,"name":"Achievements","url":"admin.achievements.index","url_type":"route","open_in_new_tab":0,"view_permission_id":"view-achievement-permission"},{"id":62,"name":"Questions","url":"admin.questions.index","url_type":"route","open_in_new_tab":0,"view_permission_id":"view-question-permission"}]},{"id":63,"name":"Quizzes","url":"#","url_type":"static","open_in_new_tab":0,"icon":"la-file-code","view_permission_id":"view-quiz","children":[{"id":64,"name":"QuizTypes","url":"admin.quiztypes.index","url_type":"route","open_in_new_tab":0,"view_permission_id":"view-quiztype-permission"},{"id":65,"name":"QuizCategories","url":"admin.quizcategories.index","url_type":"route","open_in_new_tab":0,"view_permission_id":"view-quizcategory-permission"},{"id":66,"name":"PointTypes","url":"admin.pointtypes.index","url_type":"route","open_in_new_tab":0,"view_permission_id":"view-pointtype-permission"},{"id":67,"name":"OpticalForms","url":"admin.opticalforms.index","url_type":"route","open_in_new_tab":0,"view_permission_id":"view-opticalform-permission"},{"id":68,"name":"Quizzes","url":"admin.quizzes.index","url_type":"route","open_in_new_tab":0,"view_permission_id":"view-quiz-permission"}]},{"view_permission_id":"","icon":"la-map-signs","open_in_new_tab":0,"url_type":"static","url":"","name":"Addresses","id":69,"children":[{"view_permission_id":"view-country","open_in_new_tab":0,"url_type":"route","url":"admin.countries.index","name":"Countries","id":35},{"id":36,"name":"Cities","url":"admin.cities.index","url_type":"route","open_in_new_tab":0,"view_permission_id":"view-city"},{"id":37,"name":"Counties","url":"admin.counties.index","url_type":"route","open_in_new_tab":0,"view_permission_id":"view-county"},{"view_permission_id":"view-address-permission","open_in_new_tab":0,"url_type":"route","url":"admin.addresses.index","name":"Addresses","id":70},{"view_permission_id":"view-district-permission","open_in_new_tab":0,"url_type":"route","url":"admin.districts.index","name":"Districts","id":38},{"id":39,"name":"Neighborhoods","url":"admin.neighborhoods.index","url_type":"route","open_in_new_tab":0,"view_permission_id":"view-neighborhood-permission"},{"view_permission_id":"view-address-permission","open_in_new_tab":0,"url_type":"route","url":"admin.addresses.index","name":"Addresses","id":72}]},{"id":71,"name":"Education","url":"#","url_type":"static","open_in_new_tab":0,"icon":"la-school","view_permission_id":"","children":[{"view_permission_id":"view-season-permission","open_in_new_tab":0,"url_type":"route","url":"admin.seasons.index","name":"Seasons","id":49},{"id":40,"name":"Programs","url":"admin.programs.index","url_type":"route","open_in_new_tab":0,"view_permission_id":"view-program-permission"},{"view_permission_id":"view-level-permission","open_in_new_tab":0,"url_type":"route","url":"admin.levels.index","name":"Levels","id":41},{"view_permission_id":"view-course-permission","open_in_new_tab":0,"url_type":"route","url":"admin.courses.index","name":"Courses","id":42},{"id":43,"name":"SchoolTypes","url":"admin.schooltypes.index","url_type":"route","open_in_new_tab":0,"view_permission_id":"view-schooltype-permission"},{"id":44,"name":"Schools","url":"admin.schools.index","url_type":"route","open_in_new_tab":0,"view_permission_id":"view-school-permission"},{"view_permission_id":"view-branche-permission","open_in_new_tab":0,"url_type":"route","url":"admin.branches.index","name":"Branches","id":45},{"id":54,"name":"SchoolBuses","url":"admin.schoolbuses.index","url_type":"route","open_in_new_tab":0,"view_permission_id":"view-schoolbus-permission"},{"view_permission_id":"view-drini-permission","icon":"","open_in_new_tab":0,"url_type":"route","url":"admin.drivings.index","name":"Driving","id":55},{"id":53,"name":"Stations","url":"admin.stations.index","url_type":"route","open_in_new_tab":0,"view_permission_id":"view-station-permission"}]},{"id":32,"name":"Settings","url":"#","url_type":"static","open_in_new_tab":0,"icon":"la-cogs","view_permission_id":"","children":[{"view_permission_id":"edit-settings","icon":"la-cog","open_in_new_tab":0,"url_type":"route","url":"admin.settings.edit?setting=1","name":"General Settings","id":9},{"view_permission_id":"","icon":"la-cog","open_in_new_tab":0,"url_type":"static","url":"#","name":"Backend Settings","id":33,"children":[{"view_permission_id":"view-module","icon":"","open_in_new_tab":0,"url_type":"route","url":"admin.modules.index","name":"Modules","id":1},{"view_permission_id":"view-menu","icon":"","open_in_new_tab":0,"url_type":"route","url":"admin.menus.index","name":"Menus","id":3},{"view_permission_id":"view-words","icon":"","open_in_new_tab":0,"url_type":"route","url":"admin.words.index","name":"Words","id":28},{"id":48,"name":"Guardians","url":"admin.guardians.index","url_type":"route","open_in_new_tab":0,"view_permission_id":"view-guardian-permission"}]},{"view_permission_id":"","icon":"la-cog","open_in_new_tab":0,"url_type":"static","url":"","name":"Frontend Settings","id":34,"children":[{"view_permission_id":"view-blog","icon":"la-blog","open_in_new_tab":0,"url_type":"route","url":"","name":"Blogs","id":15,"children":[{"id":16,"name":"Categories","url":"admin.blogCategories.index","url_type":"route","open_in_new_tab":0,"icon":"","view_permission_id":"view-blog-category"},{"id":17,"name":"Tags","url":"admin.blogTags.index","url_type":"route","open_in_new_tab":0,"icon":"","view_permission_id":"view-blog-tag"},{"view_permission_id":"view-blog","open_in_new_tab":0,"url_type":"route","url":"admin.blogs.index","name":"Blog","id":18}]},{"id":2,"name":"Pages","url":"admin.pages.index","url_type":"route","open_in_new_tab":0,"icon":"","view_permission_id":"view-page"},{"view_permission_id":"view-faq","icon":"","open_in_new_tab":0,"url_type":"route","url":"admin.faqs.index","name":"Faqs","id":19},{"view_permission_id":"view-social","icon":"","open_in_new_tab":0,"url_type":"route","url":"admin.socials.index","name":"Socials","id":26},{"view_permission_id":"view-sliders-permission","icon":"","open_in_new_tab":0,"url_type":"route","url":"admin.sliders.index","name":"Sliders","id":21},{"view_permission_id":"view-card-permission","icon":"","open_in_new_tab":0,"url_type":"route","url":"admin.cards.index","name":"Cards","id":22},{"view_permission_id":"view-project-permission","icon":"","open_in_new_tab":0,"url_type":"route","url":"admin.projects.index","name":"Projects","id":23},{"view_permission_id":"view-member-permission","icon":"","open_in_new_tab":0,"url_type":"route","url":"admin.members.index","name":"Members","id":24},{"view_permission_id":"view-testimonial-permission","icon":"","open_in_new_tab":0,"url_type":"route","url":"admin.testimonials.index","name":"Testimonials","id":25},{"view_permission_id":"view-reference","icon":"","open_in_new_tab":0,"url_type":"route","url":"admin.references.index","name":"References","id":27},{"view_permission_id":"view-component","icon":"","open_in_new_tab":0,"url_type":"static","url":"#","name":"Components","id":31,"children":[{"view_permission_id":"view-component-permission","open_in_new_tab":0,"url_type":"route","url":"admin.components.index","name":"Components","id":29},{"id":30,"name":"Values","url":"admin.componentvalues.index","url_type":"route","open_in_new_tab":0,"icon":"","view_permission_id":"view-componentvalue-permission"}]}]}]}]',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => '2021-08-30 19:09:09',
                'updated_at' => '2021-09-04 13:57:35',
                'deleted_at' => NULL,
                'platform_id' => 1,
            ),
            2 => 
            array (
                'id' => 3,
                'type' => 'navbar',
                'name' => 'Navbar Menu',
                'items' => '[{"view_permission_id":"","icon":"","open_in_new_tab":0,"url_type":"route","url":"frontend.index","name":"Home","id":1,"content":"Home"},{"view_permission_id":"","icon":"","open_in_new_tab":0,"url_type":"route","url":"frontend.services","name":"Services","id":3,"content":"Services"},{"view_permission_id":"","icon":"","open_in_new_tab":0,"url_type":"route","url":"frontend.index","name":"About Us","id":2,"content":"About Us"},{"id":4,"name":"Projects","url":"frontend.projects","url_type":"route","open_in_new_tab":0,"icon":"","view_permission_id":"","content":"Projects"},{"view_permission_id":"","icon":"","open_in_new_tab":0,"url_type":"route","url":"frontend.contact","name":"Contact","id":5,"content":"Contact"}]',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => '2021-08-30 19:09:09',
                'updated_at' => NULL,
                'deleted_at' => NULL,
                'platform_id' => 2,
            ),
            3 => 
            array (
                'id' => 4,
                'type' => 'navbar',
                'name' => 'Navbar Menu',
                'items' => '[{"view_permission_id":"","icon":"","open_in_new_tab":0,"url_type":"static","url":"#","name":"Product1","id":1,"content":"Product1"},{"view_permission_id":"","icon":"","open_in_new_tab":0,"url_type":"static","url":"#","name":"Product2","id":3,"content":"Product2"},{"view_permission_id":"","icon":"","open_in_new_tab":0,"url_type":"static","url":"#","name":"Product3","id":2,"content":"Product3"},{"id":4,"name":"Product4","url":"#","url_type":"static","open_in_new_tab":0,"icon":"","view_permission_id":"","content":"Product4"},{"view_permission_id":"","icon":"","open_in_new_tab":0,"url_type":"static","url":"#","name":"Product5","id":5,"content":"Product5"},{"view_permission_id":"","icon":"","open_in_new_tab":0,"url_type":"static","url":"#","name":"Product6","id":6,"content":"Product6"}]',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => '2021-08-30 19:09:09',
                'updated_at' => NULL,
                'deleted_at' => NULL,
                'platform_id' => 1,
            ),
            4 => 
            array (
                'id' => 5,
                'type' => 'sidebar',
                'name' => 'Sidebar Menu',
                'items' => '[{"view_permission_id":"","icon":"","open_in_new_tab":0,"url_type":"static","url":"#","name":"Link1","id":1,"content":"Link1"},{"view_permission_id":"","icon":"","open_in_new_tab":0,"url_type":"static","url":"#","name":"Link2","id":3,"content":"Link2"},{"view_permission_id":"","icon":"","open_in_new_tab":0,"url_type":"static","url":"#","name":"Link3","id":2,"content":"Link3"},{"id":4,"name":"Link4","url":"#","url_type":"static","open_in_new_tab":0,"icon":"","view_permission_id":"","content":"Link4"},{"view_permission_id":"","icon":"","open_in_new_tab":0,"url_type":"static","url":"#","name":"Link5","id":5,"content":"Link5"},{"view_permission_id":"","icon":"","open_in_new_tab":0,"url_type":"static","url":"#","name":"Link6","id":6,"content":"Link6"}]',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => '2021-08-30 19:09:09',
                'updated_at' => NULL,
                'deleted_at' => NULL,
                'platform_id' => 1,
            ),
            5 => 
            array (
                'id' => 6,
                'type' => 'footer',
                'name' => 'Footer Menu',
                'items' => '[{"view_permission_id":"","icon":"","open_in_new_tab":0,"url_type":"static","url":"#","name":"Footer1","id":1,"content":"Footer1"},{"view_permission_id":"","icon":"","open_in_new_tab":0,"url_type":"static","url":"#","name":"Footer2","id":3,"content":"Footer2"},{"view_permission_id":"","icon":"","open_in_new_tab":0,"url_type":"static","url":"#","name":"Footer3","id":2,"content":"Footer3"},{"id":4,"name":"Footer4","url":"#","url_type":"static","open_in_new_tab":0,"icon":"","view_permission_id":"","content":"Footer4"},{"view_permission_id":"","icon":"","open_in_new_tab":0,"url_type":"static","url":"#","name":"Footer5","id":5,"content":"Footer5"},{"view_permission_id":"","icon":"","open_in_new_tab":0,"url_type":"static","url":"#","name":"Footer6","id":6,"content":"Footer6"}]',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => '2021-08-30 19:09:09',
                'updated_at' => NULL,
                'deleted_at' => NULL,
                'platform_id' => 1,
            ),
        ));
        
        
    }
}