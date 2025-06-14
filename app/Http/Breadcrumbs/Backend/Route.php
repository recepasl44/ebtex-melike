<?php

Breadcrumbs::register('admin.routes.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.routes.management'), route('admin.routes.index'));
});

Breadcrumbs::register('admin.routes.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.routes.index');
    $breadcrumbs->push(_tr('menus.backend.routes.create'), route('admin.routes.create'));
});

Breadcrumbs::register('admin.routes.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.routes.index');
    $breadcrumbs->push(_tr('menus.backend.routes.edit'), route('admin.routes.edit', $id));
});
