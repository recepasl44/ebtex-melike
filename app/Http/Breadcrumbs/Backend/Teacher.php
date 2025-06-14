<?php

Breadcrumbs::register('admin.teachers.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.teachers_management'), route('admin.teachers.index'));
});

Breadcrumbs::register('admin.teachers.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.teachers.index');
    $breadcrumbs->push(_tr('menus.backend.teachers.create'), route('admin.teachers.create'));
});

Breadcrumbs::register('admin.teachers.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.teachers.index');
    $breadcrumbs->push(_tr('menus.backend.teachers.edit'), route('admin.teachers.edit', $id));
});
