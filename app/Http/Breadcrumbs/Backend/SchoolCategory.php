<?php

Breadcrumbs::register('admin.schoolcategories.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.schoolcategories.management'), route('admin.schoolcategories.index'));
});

Breadcrumbs::register('admin.schoolcategories.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.schoolcategories.index');
    $breadcrumbs->push(_tr('menus.backend.schoolcategories.create'), route('admin.schoolcategories.create'));
});

Breadcrumbs::register('admin.schoolcategories.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.schoolcategories.index');
    $breadcrumbs->push(_tr('menus.backend.schoolcategories.edit'), route('admin.schoolcategories.edit', $id));
});
