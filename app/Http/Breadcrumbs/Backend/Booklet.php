<?php

Breadcrumbs::register('admin.booklets.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.booklets.management'), route('admin.booklets.index'));
});

Breadcrumbs::register('admin.booklets.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.booklets.index');
    $breadcrumbs->push(_tr('menus.backend.booklets.create'), route('admin.booklets.create'));
});

Breadcrumbs::register('admin.booklets.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.booklets.index');
    $breadcrumbs->push(_tr('menus.backend.booklets.edit'), route('admin.booklets.edit', $id));
});
