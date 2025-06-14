<?php

Breadcrumbs::register('admin.sourcetypes.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.sourcetypes.management'), route('admin.sourcetypes.index'));
});

Breadcrumbs::register('admin.sourcetypes.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.sourcetypes.index');
    $breadcrumbs->push(_tr('menus.backend.sourcetypes.create'), route('admin.sourcetypes.create'));
});

Breadcrumbs::register('admin.sourcetypes.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.sourcetypes.index');
    $breadcrumbs->push(_tr('menus.backend.sourcetypes.edit'), route('admin.sourcetypes.edit', $id));
});
