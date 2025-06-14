<?php

Breadcrumbs::register('admin.points.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.points.management'), route('admin.points.index'));
});

Breadcrumbs::register('admin.points.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.points.index');
    $breadcrumbs->push(_tr('menus.backend.points.create'), route('admin.points.create'));
});

Breadcrumbs::register('admin.points.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.points.index');
    $breadcrumbs->push(_tr('menus.backend.points.edit'), route('admin.points.edit', $id));
});
