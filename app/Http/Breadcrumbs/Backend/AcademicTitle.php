<?php

Breadcrumbs::register('admin.academictitles.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.academictitles.management'), route('admin.academictitles.index'));
});

Breadcrumbs::register('admin.academictitles.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.academictitles.index');
    $breadcrumbs->push(_tr('menus.backend.academictitles.create'), route('admin.academictitles.create'));
});

Breadcrumbs::register('admin.academictitles.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.academictitles.index');
    $breadcrumbs->push(_tr('menus.backend.academictitles.edit'), route('admin.academictitles.edit', $id));
});
