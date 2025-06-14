<?php

Breadcrumbs::register('admin.bookproductions.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.bookproductions.management'), route('admin.bookproductions.index'));
});

Breadcrumbs::register('admin.bookproductions.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.bookproductions.index');
    $breadcrumbs->push(_tr('menus.backend.bookproductions.create'), route('admin.bookproductions.create'));
});

Breadcrumbs::register('admin.bookproductions.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.bookproductions.index');
    $breadcrumbs->push(_tr('menus.backend.bookproductions.edit'), route('admin.bookproductions.edit', $id));
});
