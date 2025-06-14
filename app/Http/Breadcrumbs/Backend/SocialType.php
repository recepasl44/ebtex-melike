<?php

Breadcrumbs::register('admin.socialtypes.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.socialtypes.management'), route('admin.socialtypes.index'));
});

Breadcrumbs::register('admin.socialtypes.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.socialtypes.index');
    $breadcrumbs->push(_tr('menus.backend.socialtypes.create'), route('admin.socialtypes.create'));
});

Breadcrumbs::register('admin.socialtypes.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.socialtypes.index');
    $breadcrumbs->push(_tr('menus.backend.socialtypes.edit'), route('admin.socialtypes.edit', $id));
});
