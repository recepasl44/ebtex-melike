<?php

Breadcrumbs::register('admin.students.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.students.management'), route('admin.students.index'));
});

Breadcrumbs::register('admin.students.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.students.index');
    $breadcrumbs->push(_tr('menus.backend.students.create'), route('admin.students.create'));
});

Breadcrumbs::register('admin.students.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.students.index');
    $breadcrumbs->push(_tr('menus.backend.students.edit'), route('admin.students.edit', $id));
});
