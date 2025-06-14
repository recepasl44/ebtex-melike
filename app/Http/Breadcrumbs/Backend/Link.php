<?php

Breadcrumbs::register('admin.links.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.links_management'), route('admin.links.index'));
});

Breadcrumbs::register('admin.links.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.links.index');
    $breadcrumbs->push(_tr('menus.backend.links.create'), route('admin.links.create'));
});

Breadcrumbs::register('admin.links.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.links.index');
    $breadcrumbs->push(_tr('menus.backend.links.edit'), route('admin.links.edit', $id));
});
