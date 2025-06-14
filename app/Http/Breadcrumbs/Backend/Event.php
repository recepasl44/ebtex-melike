<?php

Breadcrumbs::register('admin.events.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.events.management'), route('admin.events.index'));
});

Breadcrumbs::register('admin.events.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.events.index');
    $breadcrumbs->push(_tr('menus.backend.events.create'), route('admin.events.create'));
});

Breadcrumbs::register('admin.events.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.events.index');
    $breadcrumbs->push(_tr('menus.backend.events.edit'), route('admin.events.edit', $id));
});
