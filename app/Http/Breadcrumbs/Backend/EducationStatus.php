<?php

Breadcrumbs::register('admin.educationstatuses.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.educationstatuses.management'), route('admin.educationstatuses.index'));
});

Breadcrumbs::register('admin.educationstatuses.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.educationstatuses.index');
    $breadcrumbs->push(_tr('menus.backend.educationstatuses.create'), route('admin.educationstatuses.create'));
});

Breadcrumbs::register('admin.educationstatuses.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.educationstatuses.index');
    $breadcrumbs->push(_tr('menus.backend.educationstatuses.edit'), route('admin.educationstatuses.edit', $id));
});
