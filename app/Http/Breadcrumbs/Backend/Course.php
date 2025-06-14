<?php

Breadcrumbs::register('admin.courses.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.courses.management'), route('admin.courses.index'));
});

Breadcrumbs::register('admin.courses.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.courses.index');
    $breadcrumbs->push(_tr('menus.backend.courses.create'), route('admin.courses.create'));
});

Breadcrumbs::register('admin.courses.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.courses.index');
    $breadcrumbs->push(_tr('menus.backend.courses.edit'), route('admin.courses.edit', $id));
});
