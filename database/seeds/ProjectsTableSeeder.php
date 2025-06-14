<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Database\DisableForeignKeys;
use Database\TruncateTable;

class ProjectsTableSeeder extends Seeder
{
    use DisableForeignKeys, TruncateTable;
    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('projects')->delete();
        
        \DB::table('projects')->insert(array (
            0 => 
            array (
                'id' => 1,
                'title' => 'Movie Recommendation',
                'subtitle' => 'System Project',
                'cover' => 'img/projects/gweaYLwB3WyxrQe233uFSSCEisekfY6j2ld5BC06.jpg',
                'link' => '/project-1',
                'status' => 1,
                'created_at' => '2021-08-25 16:30:18',
                'updated_at' => '2021-08-25 16:30:18',
                'platform_id' => 1,
            ),
            1 => 
            array (
                'id' => 2,
                'title' => 'Customer Segmentation',
                'subtitle' => 'Machine Learning',
                'cover' => 'img/projects/gweaYLwB3WyxrQe233uFSSCEisekfY6j2ld5BC06.jpg',
                'link' => '/project-1',
                'status' => 1,
                'created_at' => '2021-08-25 16:30:18',
                'updated_at' => '2021-08-25 16:30:18',
                'platform_id' => 1,
            ),
            2 => 
            array (
                'id' => 3,
                'title' => 'Data Analysis',
                'subtitle' => 'Web Project',
                'cover' => 'img/projects/gweaYLwB3WyxrQe233uFSSCEisekfY6j2ld5BC06.jpg',
                'link' => '/project-1',
                'status' => 1,
                'created_at' => '2021-08-25 16:30:18',
                'updated_at' => '2021-08-25 16:30:18',
                'platform_id' => 1,
            ),
            3 => 
            array (
                'id' => 4,
                'title' => 'Movie Recommendation',
                'subtitle' => 'System Project',
                'cover' => 'img/projects/gweaYLwB3WyxrQe233uFSSCEisekfY6j2ld5BC06.jpg',
                'link' => '/project-1',
                'status' => 1,
                'created_at' => '2021-08-25 16:30:18',
                'updated_at' => '2021-08-25 16:30:18',
                'platform_id' => 1,
            ),
            4 => 
            array (
                'id' => 5,
                'title' => 'Customer Segmentation',
                'subtitle' => 'Machine Learning',
                'cover' => 'img/projects/gweaYLwB3WyxrQe233uFSSCEisekfY6j2ld5BC06.jpg',
                'link' => '/project-1',
                'status' => 1,
                'created_at' => '2021-08-25 16:30:18',
                'updated_at' => '2021-08-25 16:30:18',
                'platform_id' => 1,
            ),
            5 => 
            array (
                'id' => 6,
                'title' => 'Data Analysis',
                'subtitle' => 'Web Project',
                'cover' => 'img/projects/gweaYLwB3WyxrQe233uFSSCEisekfY6j2ld5BC06.jpg',
                'link' => '/project-1',
                'status' => 1,
                'created_at' => '2021-08-25 16:30:18',
                'updated_at' => '2021-08-25 16:30:18',
                'platform_id' => 1,
            ),
        ));
        
        
    }
}