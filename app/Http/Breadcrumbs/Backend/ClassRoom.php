<?php

Breadcrumbs::register('admin.classrooms.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.classrooms.management'), route('admin.classrooms.index'));
});

Breadcrumbs::register('admin.classrooms.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.classrooms.index');
    $breadcrumbs->push(_tr('menus.backend.classrooms.create'), route('admin.classrooms.create'));
});

Breadcrumbs::register('admin.classrooms.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.classrooms.index');
    $breadcrumbs->push(_tr('menus.backend.classrooms.edit'), route('admin.classrooms.edit', $id));
});
