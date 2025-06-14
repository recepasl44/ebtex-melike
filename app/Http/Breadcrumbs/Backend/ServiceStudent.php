<?php

Breadcrumbs::register('admin.servicestudents.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.servicestudents.management'), route('admin.servicestudents.index'));
});

Breadcrumbs::register('admin.servicestudents.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.servicestudents.index');
    $breadcrumbs->push(_tr('menus.backend.servicestudents.create'), route('admin.servicestudents.create'));
});

Breadcrumbs::register('admin.servicestudents.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.servicestudents.index');
    $breadcrumbs->push(_tr('menus.backend.servicestudents.edit'), route('admin.servicestudents.edit', $id));
});
