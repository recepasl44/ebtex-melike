<?php

Breadcrumbs::register('admin.foreignservices.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.foreignservices.management'), route('admin.foreignservices.index'));
});

Breadcrumbs::register('admin.foreignservices.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.foreignservices.index');
    $breadcrumbs->push(_tr('menus.backend.foreignservices.create'), route('admin.foreignservices.create'));
});

Breadcrumbs::register('admin.foreignservices.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.foreignservices.index');
    $breadcrumbs->push(_tr('menus.backend.foreignservices.edit'), route('admin.foreignservices.edit', $id));
});
