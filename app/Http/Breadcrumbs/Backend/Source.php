<?php

Breadcrumbs::register('admin.sources.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.sources.management'), route('admin.sources.index'));
});

Breadcrumbs::register('admin.sources.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.sources.index');
    $breadcrumbs->push(_tr('menus.backend.sources.create'), route('admin.sources.create'));
});

Breadcrumbs::register('admin.sources.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.sources.index');
    $breadcrumbs->push(_tr('menus.backend.sources.edit'), route('admin.sources.edit', $id));
});
