<?php

Breadcrumbs::register('admin.userdiscounts.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.userdiscounts.management'), route('admin.userdiscounts.index'));
});

Breadcrumbs::register('admin.userdiscounts.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.userdiscounts.index');
    $breadcrumbs->push(_tr('menus.backend.userdiscounts.create'), route('admin.userdiscounts.create'));
});

Breadcrumbs::register('admin.userdiscounts.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.userdiscounts.index');
    $breadcrumbs->push(_tr('menus.backend.userdiscounts.edit'), route('admin.userdiscounts.edit', $id));
});
