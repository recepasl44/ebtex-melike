<?php

Breadcrumbs::register('admin.messages.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.messages.management'), route('admin.messages.index'));
});

Breadcrumbs::register('admin.messages.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.messages.index');
    $breadcrumbs->push(_tr('menus.backend.messages.create'), route('admin.messages.create'));
});

Breadcrumbs::register('admin.messages.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.messages.index');
    $breadcrumbs->push(_tr('menus.backend.messages.edit'), route('admin.messages.edit', $id));
});
