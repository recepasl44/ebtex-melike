<?php

Breadcrumbs::register('admin.producttasks.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.producttasks.management'), route('admin.producttasks.index'));
});

Breadcrumbs::register('admin.producttasks.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.producttasks.index');
    $breadcrumbs->push(_tr('menus.backend.producttasks.create'), route('admin.producttasks.create'));
});

Breadcrumbs::register('admin.producttasks.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.producttasks.index');
    $breadcrumbs->push(_tr('menus.backend.producttasks.edit'), route('admin.producttasks.edit', $id));
});
