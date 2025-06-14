<?php

Breadcrumbs::register('admin.guidances.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.guidances.management'), route('admin.guidances.index'));
});

Breadcrumbs::register('admin.guidances.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.guidances.index');
    $breadcrumbs->push(_tr('menus.backend.guidances.create'), route('admin.guidances.create'));
});

Breadcrumbs::register('admin.guidances.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.guidances.index');
    $breadcrumbs->push(_tr('menus.backend.guidances.edit'), route('admin.guidances.edit', $id));
});
