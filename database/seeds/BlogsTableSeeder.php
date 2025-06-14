<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Database\DisableForeignKeys;
use Database\TruncateTable;

class BlogsTableSeeder extends Seeder
{

    use DisableForeignKeys, TruncateTable;
    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('blogs')->delete();
        
        \DB::table('blogs')->insert(array (
            0 => 
            array (
                'id' => 1,
                'name' => 'Six Ways to Make Smarter Decisions',
                'publish_datetime' => '2021-09-10 00:00:00',
                'featured_image' => '1631216392img4.jpg',
                'content' => 'Quuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quia non numquam eius modi tempora incidunt ut labore et dolore magnam dolor sit amet, consectetur adipisicing.

Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.',
                'meta_title' => NULL,
                'cannonical_link' => NULL,
                'slug' => 'six-ways-to-make-smarter-decisions',
                'meta_description' => NULL,
                'meta_keywords' => NULL,
                'status' => 'Published',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => '2021-09-09 19:39:52',
                'updated_at' => '2021-09-09 19:39:52',
                'deleted_at' => NULL,
                'platform_id' => 1,
            ),
            1 => 
            array (
                'id' => 2,
                'name' => 'Six Ways to Make Smarter Decisions',
                'publish_datetime' => '2021-09-10 00:00:00',
                'featured_image' => '1631216392img4.jpg',
                'content' => 'Quuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quia non numquam eius modi tempora incidunt ut labore et dolore magnam dolor sit amet, consectetur adipisicing.

Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.',
                'meta_title' => NULL,
                'cannonical_link' => NULL,
                'slug' => 'six-ways-to-make-smarter-decisions',
                'meta_description' => NULL,
                'meta_keywords' => NULL,
                'status' => 'Published',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => '2021-09-09 19:39:52',
                'updated_at' => '2021-09-09 19:39:52',
                'deleted_at' => NULL,
                'platform_id' => 1,
            ),
            2 => 
            array (
                'id' => 3,
                'name' => 'Six Ways to Make Smarter Decisions',
                'publish_datetime' => '2021-09-10 00:00:00',
                'featured_image' => '1631216392img4.jpg',
                'content' => 'Quuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quia non numquam eius modi tempora incidunt ut labore et dolore magnam dolor sit amet, consectetur adipisicing.

Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.',
                'meta_title' => NULL,
                'cannonical_link' => NULL,
                'slug' => 'six-ways-to-make-smarter-decisions',
                'meta_description' => NULL,
                'meta_keywords' => NULL,
                'status' => 'Published',
                'created_by' => 1,
                'updated_by' => NULL,
                'created_at' => '2021-09-09 19:39:52',
                'updated_at' => '2021-09-09 19:39:52',
                'deleted_at' => NULL,
                'platform_id' => 1,
            ),
        ));
        
        
    }
}