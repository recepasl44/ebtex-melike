<?php

Breadcrumbs::register('admin.bookpackages.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.bookpackages.management'), route('admin.bookpackages.index'));
});

Breadcrumbs::register('admin.bookpackages.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.bookpackages.index');
    $breadcrumbs->push(_tr('menus.backend.bookpackages.create'), route('admin.bookpackages.create'));
});

Breadcrumbs::register('admin.bookpackages.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.bookpackages.index');
    $breadcrumbs->push(_tr('menus.backend.bookpackages.edit'), route('admin.bookpackages.edit', $id));
});
