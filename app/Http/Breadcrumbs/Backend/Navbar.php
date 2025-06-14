<?php

Breadcrumbs::register('admin.navbars.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.navbars_management'), route('admin.navbars.index'));
});

Breadcrumbs::register('admin.navbars.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.navbars.index');
    $breadcrumbs->push(_tr('menus.backend.navbars.create'), route('admin.navbars.create'));
});

Breadcrumbs::register('admin.navbars.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.navbars.index');
    $breadcrumbs->push(_tr('menus.backend.navbars.edit'), route('admin.navbars.edit', $id));
});
