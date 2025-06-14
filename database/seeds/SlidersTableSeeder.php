<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Database\DisableForeignKeys;
use Database\TruncateTable;

class SlidersTableSeeder extends Seeder
{
    use DisableForeignKeys, TruncateTable;

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        $this->disableForeignKeys();
        $this->truncate(config('module.sliders.table'));
        
        \DB::table('sliders')->insert(array (
            0 =>
            array (
                'id' => 1,
                'cover' => 'img/sliders/InkodLhCglcpvs6EZBcyRaEQ5pDrJcP2lhoISE44.webp',
                'subtitle' => 'RECENT LAUNCH',
            'title' => 'DOUBLE ASTEROID REDIRECTION TEST (DART) MISSION',
                'description' => NULL,
                'button1' => 'RE-WATCH',
                'button1_link' => '#about-us',
                'button2' => NULL,
                'button2_link' => NULL,
                'status' => 1,
                'created_at' => '2021-08-22 09:12:42',
                'updated_at' => '2021-12-01 06:58:35',
                'platform_id' => 1,
            ),
            1 =>
            array (
                'id' => 2,
                'cover' => 'img/sliders/iVOrPSBQC8Q94EZsdJQG5TvGs3WPH7ZiZPWB4gEe.webp',
                'subtitle' => 'CURRENT MISSION',
                'title' => 'CREW-3 DOCKS TO THE INTERNATIONAL SPACE STATION',
                'description' => NULL,
                'button1' => 'RE-WATCH',
                'button1_link' => '#',
                'button2' => NULL,
                'button2_link' => NULL,
                'status' => 1,
                'created_at' => '2021-08-22 09:22:28',
                'updated_at' => '2021-12-01 06:59:53',
                'platform_id' => 1,
            ),
            2 =>
            array (
                'id' => 3,
                'cover' => 'img/sliders/nZZRSAP2Y4NhY0i7Np0RAYENON6M7F7hib4Eka7U.webp',
                'subtitle' => 'COMPLETED MISSION',
                'title' => 'CREW-2 RETURNS TO EARTH',
                'description' => NULL,
                'button1' => 'RE-WATCH',
                'button1_link' => '#',
                'button2' => NULL,
                'button2_link' => NULL,
                'status' => 1,
                'created_at' => '2021-12-01 07:00:43',
                'updated_at' => '2021-12-01 07:11:36',
                'platform_id' => 1,
            ),
            3 =>
            array (
                'id' => 4,
                'cover' => 'img/sliders/K0rOApVC7ZLLUjIhNzn7Hijs4qKnClgpkvLf4jGS.webp',
                'subtitle' => 'RECENT LAUNCH',
                'title' => 'STARLINK MISSION',
                'description' => NULL,
                'button1' => 'RE-WATCH',
                'button1_link' => '#',
                'button2' => NULL,
                'button2_link' => NULL,
                'status' => 1,
                'created_at' => '2021-12-01 07:01:44',
                'updated_at' => '2021-12-01 07:01:44',
                'platform_id' => 1,
            ),
            4 =>
            array (
                'id' => 5,
                'cover' => 'img/sliders/dRyU4sahc5tEw6q0DptgoRMdjD1wpnSrW8D0jWWg.webp',
                'subtitle' => NULL,
                'title' => 'STARSHIP TO LAND NASA ASTRONAUTS ON THE MOON',
                'description' => NULL,
                'button1' => 'LEARN MORE',
                'button1_link' => '#',
                'button2' => NULL,
                'button2_link' => NULL,
                'status' => 1,
                'created_at' => '2021-12-01 07:02:29',
                'updated_at' => '2021-12-01 07:11:49',
                'platform_id' => 1,
            ),
        ));

        $this->enableForeignKeys();
        
    }
}