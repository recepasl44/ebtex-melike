<?php

Breadcrumbs::register('admin.scholarshipsettings.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.scholarshipsettings.management'), route('admin.scholarshipsettings.index'));
});

Breadcrumbs::register('admin.scholarshipsettings.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.scholarshipsettings.index');
    $breadcrumbs->push(_tr('menus.backend.scholarshipsettings.create'), route('admin.scholarshipsettings.create'));
});

Breadcrumbs::register('admin.scholarshipsettings.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.scholarshipsettings.index');
    $breadcrumbs->push(_tr('menus.backend.scholarshipsettings.edit'), route('admin.scholarshipsettings.edit', $id));
});
