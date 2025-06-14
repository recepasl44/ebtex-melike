<?php

Breadcrumbs::register('admin.guardianmeetings.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.guardianmeetings.management'), route('admin.guardianmeetings.index'));
});

Breadcrumbs::register('admin.guardianmeetings.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.guardianmeetings.index');
    $breadcrumbs->push(_tr('menus.backend.guardianmeetings.create'), route('admin.guardianmeetings.create'));
});

Breadcrumbs::register('admin.guardianmeetings.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.guardianmeetings.index');
    $breadcrumbs->push(_tr('menus.backend.guardianmeetings.edit'), route('admin.guardianmeetings.edit', $id));
});
