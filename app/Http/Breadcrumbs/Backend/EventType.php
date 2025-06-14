<?php

Breadcrumbs::register('admin.eventtypes.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.eventtypes.management'), route('admin.eventtypes.index'));
});

Breadcrumbs::register('admin.eventtypes.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.eventtypes.index');
    $breadcrumbs->push(_tr('menus.backend.eventtypes.create'), route('admin.eventtypes.create'));
});

Breadcrumbs::register('admin.eventtypes.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.eventtypes.index');
    $breadcrumbs->push(_tr('menus.backend.eventtypes.edit'), route('admin.eventtypes.edit', $id));
});
