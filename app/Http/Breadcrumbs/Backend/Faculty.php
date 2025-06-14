<?php

Breadcrumbs::register('admin.faculties.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.faculties_management'), route('admin.faculties.index'));
});

Breadcrumbs::register('admin.faculties.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.faculties.index');
    $breadcrumbs->push(_tr('menus.backend.faculties.create'), route('admin.faculties.create'));
});

Breadcrumbs::register('admin.faculties.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.faculties.index');
    $breadcrumbs->push(_tr('menus.backend.faculties.edit'), route('admin.faculties.edit', $id));
});
