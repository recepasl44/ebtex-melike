<?php

Breadcrumbs::register('admin.servicetypes.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.servicetypes.management'), route('admin.servicetypes.index'));
});

Breadcrumbs::register('admin.servicetypes.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.servicetypes.index');
    $breadcrumbs->push(_tr('menus.backend.servicetypes.create'), route('admin.servicetypes.create'));
});

Breadcrumbs::register('admin.servicetypes.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.servicetypes.index');
    $breadcrumbs->push(_tr('menus.backend.servicetypes.edit'), route('admin.servicetypes.edit', $id));
});
