<?php

Breadcrumbs::register('admin.members.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.members_management'), route('admin.members.index'));
});

Breadcrumbs::register('admin.members.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.members.index');
    $breadcrumbs->push(_tr('menus.backend.members.create'), route('admin.members.create'));
});

Breadcrumbs::register('admin.members.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.members.index');
    $breadcrumbs->push(_tr('menus.backend.members.edit'), route('admin.members.edit', $id));
});
