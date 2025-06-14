<?php

Breadcrumbs::register('admin.producttypes.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.producttypes_management'), route('admin.producttypes.index'));
});

Breadcrumbs::register('admin.producttypes.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.producttypes.index');
    $breadcrumbs->push(_tr('menus.backend.producttypes.create'), route('admin.producttypes.create'));
});

Breadcrumbs::register('admin.producttypes.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.producttypes.index');
    $breadcrumbs->push(_tr('menus.backend.producttypes.edit'), route('admin.producttypes.edit', $id));
});
