<?php

Breadcrumbs::register('admin.conversations.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.conversations.management'), route('admin.conversations.index'));
});

Breadcrumbs::register('admin.conversations.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.conversations.index');
    $breadcrumbs->push(_tr('menus.backend.conversations.create'), route('admin.conversations.create'));
});

Breadcrumbs::register('admin.conversations.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.conversations.index');
    $breadcrumbs->push(_tr('menus.backend.conversations.edit'), route('admin.conversations.edit', $id));
});
