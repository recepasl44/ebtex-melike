<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Database\DisableForeignKeys;
use Database\TruncateTable;

class MembersTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('members')->delete();
        
        \DB::table('members')->insert(array (
            0 => 
            array (
                'id' => 1,
                'name' => 'Merv Adrian',
                'title' => 'Data Management',
                'cover' => 'img/sliders/zYUpkAOl3UHezjCPCMCi3byqmcqvv35H1LCS3mNP.jpg',
                'facebook' => 'facebook',
                'twitter' => NULL,
                'instagram' => 'instagram',
                'linkedin' => 'linkedin',
                'status' => 1,
                'created_at' => '2021-08-27 16:23:35',
                'updated_at' => '2021-08-27 17:02:04',
                'platform_id' => 1,
            ),
            1 => 
            array (
                'id' => 2,
                'name' => 'Kirk Borne',
                'title' => 'Data Scientist',
                'cover' => 'img/sliders/qBF4C2ADpuadOpOR1p9O07ayqxgCG98iczJo2oCI.jpg',
                'facebook' => NULL,
                'twitter' => 'twitter',
                'instagram' => 'instagram',
                'linkedin' => NULL,
                'status' => 1,
                'created_at' => '2021-08-27 17:01:57',
                'updated_at' => '2021-08-27 17:02:26',
                'platform_id' => 1,
            ),
            2 => 
            array (
                'id' => 3,
                'name' => 'Carla Gentry',
                'title' => 'Analytical Solutions',
                'cover' => 'img/members/c1O5QtRxyXYl9a9x6y25rqH7rWtZDLfvgj2fiif0.jpg',
                'facebook' => NULL,
                'twitter' => NULL,
                'instagram' => NULL,
                'linkedin' => 'linkedin',
                'status' => 1,
                'created_at' => '2021-08-27 17:03:11',
                'updated_at' => '2021-08-27 17:03:11',
                'platform_id' => 1,
            ),
            3 => 
            array (
                'id' => 4,
                'name' => 'Marie Curie',
                'title' => 'Data Scientist',
                'cover' => 'img/sliders/RZl5ZeQzWyzuLW7LrtHwDDG3CDmW1cTWSeaDWaGg.jpg',
                'facebook' => NULL,
                'twitter' => NULL,
                'instagram' => 'instagram',
                'linkedin' => 'linkedin',
                'status' => 1,
                'created_at' => '2021-08-27 17:03:47',
                'updated_at' => '2021-08-27 17:04:16',
                'platform_id' => 1,
            ),
        ));
        
        
    }
}