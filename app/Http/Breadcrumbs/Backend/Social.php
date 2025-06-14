<?php

Breadcrumbs::register('admin.socials.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.socials_management'), route('admin.socials.index'));
});

Breadcrumbs::register('admin.socials.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.socials.index');
    $breadcrumbs->push(_tr('menus.backend.socials.create'), route('admin.socials.create'));
});

Breadcrumbs::register('admin.socials.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.socials.index');
    $breadcrumbs->push(_tr('menus.backend.socials.edit'), route('admin.socials.edit', $id));
});
