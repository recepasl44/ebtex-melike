<?php

Breadcrumbs::register('admin.servicestops.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.servicestops.management'), route('admin.servicestops.index'));
});

Breadcrumbs::register('admin.servicestops.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.servicestops.index');
    $breadcrumbs->push(_tr('menus.backend.servicestops.create'), route('admin.servicestops.create'));
});

Breadcrumbs::register('admin.servicestops.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.servicestops.index');
    $breadcrumbs->push(_tr('menus.backend.servicestops.edit'), route('admin.servicestops.edit', $id));
});
