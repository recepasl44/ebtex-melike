<?php

Breadcrumbs::register('admin.guidanceobservations.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.guidanceobservations.management'), route('admin.guidanceobservations.index'));
});

Breadcrumbs::register('admin.guidanceobservations.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.guidanceobservations.index');
    $breadcrumbs->push(_tr('menus.backend.guidanceobservations.create'), route('admin.guidanceobservations.create'));
});

Breadcrumbs::register('admin.guidanceobservations.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.guidanceobservations.index');
    $breadcrumbs->push(_tr('menus.backend.guidanceobservations.edit'), route('admin.guidanceobservations.edit', $id));
});
