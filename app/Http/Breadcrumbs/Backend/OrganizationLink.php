<?php

Breadcrumbs::register('admin.organizationlinks.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.organizationlinks_management'), route('admin.organizationlinks.index'));
});

Breadcrumbs::register('admin.organizationlinks.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.organizationlinks.index');
    $breadcrumbs->push(_tr('menus.backend.organizationlinks.create'), route('admin.organizationlinks.create'));
});

Breadcrumbs::register('admin.organizationlinks.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.organizationlinks.index');
    $breadcrumbs->push(_tr('menus.backend.organizationlinks.edit'), route('admin.organizationlinks.edit', $id));
});
