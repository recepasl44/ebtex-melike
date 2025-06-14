<?php

Breadcrumbs::register('admin.attendancedays.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.attendancedays.management'), route('admin.attendancedays.index'));
});

Breadcrumbs::register('admin.attendancedays.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.attendancedays.index');
    $breadcrumbs->push(_tr('menus.backend.attendancedays.create'), route('admin.attendancedays.create'));
});

Breadcrumbs::register('admin.attendancedays.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.attendancedays.index');
    $breadcrumbs->push(_tr('menus.backend.attendancedays.edit'), route('admin.attendancedays.edit', $id));
});
