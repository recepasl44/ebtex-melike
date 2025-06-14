<?php

Breadcrumbs::register('admin.organizationsocials.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.organizationsocials_management'), route('admin.organizationsocials.index'));
});

Breadcrumbs::register('admin.organizationsocials.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.organizationsocials.index');
    $breadcrumbs->push(_tr('menus.backend.organizationsocials.create'), route('admin.organizationsocials.create'));
});

Breadcrumbs::register('admin.organizationsocials.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.organizationsocials.index');
    $breadcrumbs->push(_tr('menus.backend.organizationsocials.edit'), route('admin.organizationsocials.edit', $id));
});
