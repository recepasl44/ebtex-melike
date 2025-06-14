<?php

Breadcrumbs::register('admin.seasons.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.seasons.management'), route('admin.seasons.index'));
});

Breadcrumbs::register('admin.seasons.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.seasons.index');
    $breadcrumbs->push(_tr('menus.backend.seasons.create'), route('admin.seasons.create'));
});

Breadcrumbs::register('admin.seasons.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.seasons.index');
    $breadcrumbs->push(_tr('menus.backend.seasons.edit'), route('admin.seasons.edit', $id));
});
