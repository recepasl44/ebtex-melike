<?php

Breadcrumbs::register('admin.assignmentstudents.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.assignmentstudents.management'), route('admin.assignmentstudents.index'));
});

Breadcrumbs::register('admin.assignmentstudents.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.assignmentstudents.index');
    $breadcrumbs->push(_tr('menus.backend.assignmentstudents.create'), route('admin.assignmentstudents.create'));
});

Breadcrumbs::register('admin.assignmentstudents.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.assignmentstudents.index');
    $breadcrumbs->push(_tr('menus.backend.assignmentstudents.edit'), route('admin.assignmentstudents.edit', $id));
});
