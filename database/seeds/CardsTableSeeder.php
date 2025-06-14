<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Database\DisableForeignKeys;
use Database\TruncateTable;

class CardsTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('cards')->delete();
        
        \DB::table('cards')->insert(array (
            0 => 
            array (
                'id' => 1,
                'title' => 'Data Analytics',
                'icon' => 'img/cards/jgUK9BBXyAIj0frDPFRRquFU4UVtjWvExeXW8RfA.png',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
                'link' => '/service-1',
                'type' => 0,
                'status' => 1,
                'created_at' => '2021-08-23 16:38:29',
                'updated_at' => '2021-08-23 16:38:29',
                'platform_id' => 1,
            ),
            1 => 
            array (
                'id' => 2,
                'title' => 'AI & ML Development',
                'icon' => 'img/cards/jgUK9BBXyAIj0frDPFRRquFU4UVtjWvExeXW8RfA.png',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
                'link' => '/service-2',
                'type' => 0,
                'status' => 1,
                'created_at' => '2021-08-23 16:38:29',
                'updated_at' => '2021-08-23 16:38:29',
                'platform_id' => 1,
            ),
            2 => 
            array (
                'id' => 3,
                'title' => 'Data Science',
                'icon' => 'img/cards/jgUK9BBXyAIj0frDPFRRquFU4UVtjWvExeXW8RfA.png',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
                'link' => '/service-3',
                'type' => 0,
                'status' => 1,
                'created_at' => '2021-08-23 16:38:29',
                'updated_at' => '2021-08-23 16:38:29',
                'platform_id' => 1,
            ),
            3 => 
            array (
                'id' => 4,
                'title' => 'Predictive Analytics',
                'icon' => 'img/cards/jgUK9BBXyAIj0frDPFRRquFU4UVtjWvExeXW8RfA.png',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
                'link' => '/service-4',
                'type' => 0,
                'status' => 0,
                'created_at' => '2021-08-23 16:38:29',
                'updated_at' => '2021-08-23 16:38:29',
                'platform_id' => 1,
            ),
            4 => 
            array (
                'id' => 5,
                'title' => 'Software Development',
                'icon' => 'img/cards/jgUK9BBXyAIj0frDPFRRquFU4UVtjWvExeXW8RfA.png',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
                'link' => '/service-5',
                'type' => 0,
                'status' => 0,
                'created_at' => '2021-08-23 16:38:29',
                'updated_at' => '2021-08-23 16:38:29',
                'platform_id' => 1,
            ),
            5 => 
            array (
                'id' => 6,
                'title' => 'Elastic Solutions',
                'icon' => 'img/cards/jgUK9BBXyAIj0frDPFRRquFU4UVtjWvExeXW8RfA.png',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
                'link' => '/service-6',
                'type' => 0,
                'status' => 0,
                'created_at' => '2021-08-23 16:38:29',
                'updated_at' => '2021-08-23 16:38:29',
                'platform_id' => 1,
            ),
            6 => 
            array (
                'id' => 7,
                'title' => 'Startup Applications',
                'icon' => 'img/cards/jgUK9BBXyAIj0frDPFRRquFU4UVtjWvExeXW8RfA.png',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
                'link' => '/solutions-1',
                'type' => 1,
                'status' => 1,
                'created_at' => '2021-08-23 16:38:29',
                'updated_at' => '2021-08-23 16:38:29',
                'platform_id' => 1,
            ),
            7 => 
            array (
                'id' => 8,
                'title' => 'SaaS Solutions',
                'icon' => 'img/cards/jgUK9BBXyAIj0frDPFRRquFU4UVtjWvExeXW8RfA.png',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
                'link' => '/solutions-2',
                'type' => 1,
                'status' => 1,
                'created_at' => '2021-08-23 16:38:29',
                'updated_at' => '2021-08-23 16:38:29',
                'platform_id' => 1,
            ),
            8 => 
            array (
                'id' => 9,
                'title' => 'E-Commerce Platforms',
                'icon' => 'img/cards/jgUK9BBXyAIj0frDPFRRquFU4UVtjWvExeXW8RfA.png',
                'description' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.',
                'link' => '/solutions-3',
                'type' => 1,
                'status' => 1,
                'created_at' => '2021-08-23 16:38:29',
                'updated_at' => '2021-08-23 16:38:29',
                'platform_id' => 1,
            ),
        ));
        
        
    }
}