<?php

Breadcrumbs::register('admin.opticalattributes.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.opticalattributes.management'), route('admin.opticalattributes.index'));
});

Breadcrumbs::register('admin.opticalattributes.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.opticalattributes.index');
    $breadcrumbs->push(_tr('menus.backend.opticalattributes.create'), route('admin.opticalattributes.create'));
});

Breadcrumbs::register('admin.opticalattributes.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.opticalattributes.index');
    $breadcrumbs->push(_tr('menus.backend.opticalattributes.edit'), route('admin.opticalattributes.edit', $id));
});
