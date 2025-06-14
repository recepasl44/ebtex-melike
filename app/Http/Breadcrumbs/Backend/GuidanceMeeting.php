<?php

Breadcrumbs::register('admin.guidancemeetings.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.guidancemeetings.management'), route('admin.guidancemeetings.index'));
});

Breadcrumbs::register('admin.guidancemeetings.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.guidancemeetings.index');
    $breadcrumbs->push(_tr('menus.backend.guidancemeetings.create'), route('admin.guidancemeetings.create'));
});

Breadcrumbs::register('admin.guidancemeetings.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.guidancemeetings.index');
    $breadcrumbs->push(_tr('menus.backend.guidancemeetings.edit'), route('admin.guidancemeetings.edit', $id));
});
