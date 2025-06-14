<?php

Breadcrumbs::register('admin.conversationusers.index', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.dashboard');
    $breadcrumbs->push(_tr('menus.backend.conversationusers.management'), route('admin.conversationusers.index'));
});

Breadcrumbs::register('admin.conversationusers.create', function ($breadcrumbs) {
    $breadcrumbs->parent('admin.conversationusers.index');
    $breadcrumbs->push(_tr('menus.backend.conversationusers.create'), route('admin.conversationusers.create'));
});

Breadcrumbs::register('admin.conversationusers.edit', function ($breadcrumbs, $id) {
    $breadcrumbs->parent('admin.conversationusers.index');
    $breadcrumbs->push(_tr('menus.backend.conversationusers.edit'), route('admin.conversationusers.edit', $id));
});
