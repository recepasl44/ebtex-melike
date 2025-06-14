<?php

Breadcrumbs::register('admin.organizations.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.organizations_management'), route('admin.organizations.index'));
});

Breadcrumbs::register('admin.organizations.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.organizations.index');
    $breadcrumbs->push(_tr('menus.backend.organizations.create'), route('admin.organizations.create'));
});

Breadcrumbs::register('admin.organizations.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.organizations.index');
    $breadcrumbs->push(_tr('menus.backend.organizations.edit'), route('admin.organizations.edit', $id));
});
