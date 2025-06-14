<?php

Breadcrumbs::register('admin.institutiontypes.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.institutiontypes.management'), route('admin.institutiontypes.index'));
});

Breadcrumbs::register('admin.institutiontypes.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.institutiontypes.index');
    $breadcrumbs->push(_tr('menus.backend.institutiontypes.create'), route('admin.institutiontypes.create'));
});

Breadcrumbs::register('admin.institutiontypes.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.institutiontypes.index');
    $breadcrumbs->push(_tr('menus.backend.institutiontypes.edit'), route('admin.institutiontypes.edit', $id));
});
