<?php

Breadcrumbs::register('admin.pagepositions.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.pagepositions.management'), route('admin.pagepositions.index'));
});

Breadcrumbs::register('admin.pagepositions.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.pagepositions.index');
    $breadcrumbs->push(_tr('menus.backend.pagepositions.create'), route('admin.pagepositions.create'));
});

Breadcrumbs::register('admin.pagepositions.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.pagepositions.index');
    $breadcrumbs->push(_tr('menus.backend.pagepositions.edit'), route('admin.pagepositions.edit', $id));
});
