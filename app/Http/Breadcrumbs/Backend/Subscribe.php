<?php

Breadcrumbs::register('admin.subscribes.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.subscribes_management'), route('admin.subscribes.index'));
});

Breadcrumbs::register('admin.subscribes.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.subscribes.index');
    $breadcrumbs->push(_tr('menus.backend.subscribes.create'), route('admin.subscribes.create'));
});

Breadcrumbs::register('admin.subscribes.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.subscribes.index');
    $breadcrumbs->push(_tr('menus.backend.subscribes.edit'), route('admin.subscribes.edit', $id));
});
