<?php

Breadcrumbs::register('admin.attendanceteachers.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.attendanceteachers.management'), route('admin.attendanceteachers.index'));
});

Breadcrumbs::register('admin.attendanceteachers.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.attendanceteachers.index');
    $breadcrumbs->push(_tr('menus.backend.attendanceteachers.create'), route('admin.attendanceteachers.create'));
});

Breadcrumbs::register('admin.attendanceteachers.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.attendanceteachers.index');
    $breadcrumbs->push(_tr('menus.backend.attendanceteachers.edit'), route('admin.attendanceteachers.edit', $id));
});
